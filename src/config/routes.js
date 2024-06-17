const { Router} = require('express');

const {isGuest, isUser} = require('../middlewares/guards');

const {homeController, detailsController, search} = require('../controllers/catalog');
const { about } = require('../controllers/about');
const { createGet, createPost, editGet, editPost, deleteGet, deletePost } = require('../controllers/movie');
const { notFound } = require('../controllers/404');
const {  createCastGet, createCastPost } = require('../controllers/cast');
const { attachGet, attachPost } = require('../controllers/attach');
const { registerGet, registerPost , loginGet , loginPost, logout} = require('../controllers/user');

const router = Router();

router.get('/', homeController);
router.get('/about', about);
router.get('/search' , search);


router.get('/edit/:id',isUser(), editGet);
router.post('/edit/:id', isUser(),editPost);
router.get('/details/:id' , detailsController);
router.get('/attach/:id', isUser(), attachGet);
router.post('/attach/:id',isUser(), attachPost);
router.get('/delete/:id',isUser(), deleteGet);
router.post('/delete/:id', isUser(),deletePost);


router.get('/create/movie' ,isUser(), createGet);
router.post('/create/movie',isUser(), createPost);
router.get('/create/cast' ,isUser(), createCastGet);
router.post('/create/cast', isUser(),createCastPost);


router.get('/register', isGuest(), registerGet);
router.post('/register', isGuest(), registerPost);
router.get('/login', isGuest(),loginGet);
router.post('/login', isGuest(),loginPost);
router.get('/logout', logout);

router.get('*', notFound);

module.exports = { router};