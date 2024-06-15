const mongoose = require('mongoose');
//const {Movie} = require('../models/Movie');
require('../models/Movie');
require('../models/Cast');
//const {User} = require('../models/User');
require('../models/User');

const connectionString = 'mongodb://localhost:27017/movie-magic';

async function configDatabase(){

    await mongoose.connect(connectionString);
    //await migrateMovies();
    console.log('Database connected');
}
/*async function migrateMovies(){
    const firstUser = await User.findOne();
    await Movie.updateMany({}, {$set: {author: firstUser._id}});
}*/

module.exports = {configDatabase};