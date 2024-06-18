const { Router } = require('express');
const { isGuest } = require('../middlewares/guards');
const { body, validationResult } = require('express-validator')
const { createToken } = require("../services/token");
const { register, login } = require("../services/user");
const { Error } = require('mongoose');
const { parseErrors } = require('../util');

const userRouter = Router();

userRouter.get('/register', isGuest(), (req, res) => {
    res.render('register');
});
userRouter.post(
    '/register',
    isGuest(),
    body('email').trim().isEmail().withMessage('Please enter a valid email'),
    body('password').trim().isAlphanumeric().isLength({min: 6}).withMessage('Password must be at least 6 characters long and may content only latin letters and numbers'),
    body('repass').trim().custom((value, { req }) => value == req.body.password).withMessage('Passwords don\'t match'),
    async (req, res) => {
        const { email, password, repass } = req.body;
        try {
            const result = validationResult(req);
            if(result.errors.length){
               throw result.errors;
            }
           /* if(errors.length){
                throw new Error(errors.map(e => e.msg).join('\n'));
            }*/
           /* if (!email || !password) {
                throw new Error('All fields are required');
            }
            if (password != repass) {
                throw new Error('Passwords don\'t match');
            }*/

            const user = await register(email, password);
            const token = createToken(user);
            res.cookie('token', token, { httpOnly: true });
            res.redirect('/');

        } catch (err) {
            res.render('register', { data: { email }, errors: parseErrors(err).errors });
            return;
            return;
        }

    });
userRouter.get('/login', isGuest(), (req, res) => {
    res.render('login');
});
userRouter.post('/login', isGuest(), async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            throw new Error('All fields are required');
        }


        const user = await login(email, password);
        const token = createToken(user);
        res.cookie('token', token, { httpOnly: true });
        res.redirect('/');

    } catch (err) {
        res.render('login', { data: { email }, error: err.message });
        return;
    }

});
userRouter.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});

module.exports = {
    userRouter
}