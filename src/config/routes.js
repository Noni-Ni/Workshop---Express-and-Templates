const { Router} = require('express');
const {homeController, detailsController, search} = require('../controllers/catalog');
const { about } = require('../controllers/about');
const { createGet, createPost } = require('../controllers/movie');
const { notFound } = require('../controllers/404');
const {  createCastGet, createCastPost } = require('../controllers/cast');

const router = Router();

router.get('/', homeController);
router.get('/about', about);
router.get('/create/movie' , createGet);
router.post('/create/movie', createPost);
router.get('/create/cast' , createCastGet);
router.post('/create/cast', createCastPost);
router.get('/details/:id' , detailsController);
router.get('/search' , search);

router.get('*', notFound);

module.exports = { router};