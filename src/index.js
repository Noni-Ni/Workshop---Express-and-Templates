const express = require('express');
const { configHbs } = require('./config/hbsConfig');
const { configExpress } = require('./config/expressConfig');
const { router } = require('./config/routes');

const PORT = 3000;
const app = express();

configHbs(app);

configExpress(app);
app.use( router);

app.listen(PORT);