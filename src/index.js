const express = require('express');
const { configHbs } = require('./config/hbsConfig');
const { configExpress } = require('./config/expressConfig');
const { router, configRoutes } = require('./config/routes');
const { configDatabase } = require('./config/database');

const PORT =  3000;
async function start(){
    const app = express();
    await configDatabase();
    configHbs(app);
    
    configExpress(app);
    configRoutes(app);
    
    app.listen(PORT,()=>{
        console.log(`Application running on port ${PORT}`);
    });
}

start();
