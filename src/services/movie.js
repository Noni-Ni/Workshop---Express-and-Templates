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
    return movie;
}

async function createMovie(movieData, authorId) {

    const movie = new Movie({

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

async function attachCastToMovie(movieId, castId, userId) {
    let movie = await Movie.findById(movieId);
    if (!movie) {
        throw new error(`Movie ${movieId} not found!`)
    }
    if (movie.author.toString() != userId) {
        throw new Error('Access denied');
    }

    movie.cast.push(castId);
    await movie.save();
    console.log(movie)
    return movie;
}

/*function uuid(){
    return 'xxxx-xxxx'.replace(/x/g,() => (Math.random()*16|0).toString(16));
}*/

async function updateMovie(movieId, userId, movieData) {
    let movie = await Movie.findById(movieId);
    if (!movie) {
        throw new error(`Movie ${movieId} not found!`)
    }

    if (movie.author.toString() != userId) {
        throw new Error('Access denied');
    }
    movie.title = movieData.title;
    movie.genre = movieData.genre;
    movie.director = movieData.director;
    movie.year = Number(movieData.year);
    movie.rating = Number(movieData.rating);
    movie.description = movieData.description;
    movie.imageURL = movieData.imageURL;

    await movie.save();
    return movie;
}

async function deleteMovie(movieId, userId){
    let movie = await Movie.findById(movieId);
    if (!movie) {
        throw new error(`Movie ${movieId} not found!`)
    }

    if (movie.author.toString() != userId) {
        throw new Error('Access denied');
    }

    await Movie.deleteOne({ title: movie.title });;
}

async function searchFor(title, genre, year){
    let query = {};
 
    
    if(title){
        query.title = new RegExp(title, 'i');
    }

    if(genre){
        query.genre = new RegExp(genre, 'i');
    }

    if(year){
        query.year = year;
    }

    

    return Movie.find(query).lean();
}


module.exports = {
    getAllMovies,
    getMovieById,
    createMovie,
    attachCastToMovie,
    updateMovie,
    deleteMovie,
    searchFor
}