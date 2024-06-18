
const { isUser } = require('../middlewares/guards');

const { homeController, detailsController, search } = require('../controllers/catalog');
const { about } = require('../controllers/about');
const { movieRouter } = require('../controllers/movie');
const { notFound } = require('../controllers/404');
const { createCastGet, createCastPost } = require('../controllers/cast');
const { attachGet, attachPost } = require('../controllers/attach');
const { userRouter } = require('../controllers/user');



function configRoutes(app) {


    app.get('/', homeController);
    app.get('/about', about);
    app.get('/search', search);
    app.get('/details/:id', detailsController);

    app.get('/attach/:id', isUser(), attachGet);
    app.post('/attach/:id', isUser(), attachPost);
    app.get('/create/cast', isUser(), createCastGet);
    app.post('/create/cast', isUser(), createCastPost);

    app.use(userRouter);
    app.use(movieRouter);


    app.get('*', notFound);
}



module.exports = { configRoutes};