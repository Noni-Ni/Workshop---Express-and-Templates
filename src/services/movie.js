const fs = require('fs/promises');
const { Movie } = require('../models/Movie');
const { error } = require('console');
//const filePath = './data/database.json';

//async function readFile() {
 //   const data = await fs.readFile(filePath);
//
//    return JSON.parse(data.toString());
//}

//async function writeFile(data) {
 //   await fs.writeFile(filePath, JSON.stringify(data));
//}

/*function toMovieModel(data) {
    const movie = new Movie();
    movie.id = data.id;
    movie.title = data.title;
    movie.genre = data.genre;
    movie.director = data.director;
    movie.year = data.year;
    movie.imageURL = data.imageURL;
    movie.rating = data.rating;
    movie.description = data.description;
    return movie;
}*/

async function getAllMovies() {
    const movies = await Movie.find().lean();
    return movies;
}

async function getMovieById(id) {
    
    const movie = await Movie.findById(id).lean().populate('cast');
    return movie ;
}

async function createMovie(movieData, authorId){
    
    const movie = new Movie ({
        
        title: movieData.title,
        genre: movieData.genre,
        director: movieData.director,
        year: Number(movieData.year),
        rating: Number(movieData.rating),
        description: movieData.description,
        imageURL: movieData.imageURL,
        author: authorId
       
        
    });
    await movie.save();
    return movie;
}

async function attachCastToMovie(movieId, castId){
    let movie = await Movie.findById(movieId);
    if(!movie ){
        throw new error(`Movie ${movieId} not found!`)
    }
    movie.cast.push(castId);
    await movie.save();
    console.log(movie)
    return movie;
}

/*function uuid(){
    return 'xxxx-xxxx'.replace(/x/g,() => (Math.random()*16|0).toString(16));
}*/

module.exports = {
    getAllMovies,
    getMovieById,
    createMovie,
    attachCastToMovie
}