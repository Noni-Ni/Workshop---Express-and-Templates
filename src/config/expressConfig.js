const express = require('express');
const cookieParser = require('cookie-parser');

const secret = 'what a secret';

function configExpress(app){
    app.use(cookieParser(secret));
    app.use(express.urlencoded({ extended: true}));
    app.use('/static', express.static('static'));
}

module.exports = { configExpress };