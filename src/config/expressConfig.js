const express = require('express');

function configExpress(app){
    app.use(express.urlencoded({ extended: true}));
    app.use('/static', express.static('static'));
}

module.exports = { configExpress };