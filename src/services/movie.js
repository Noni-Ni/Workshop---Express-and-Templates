const fs = require('fs/promises');
const { Movie } = require('../models/Movie');
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
    
    const movie = await Movie.findById(id).lean();
    return movie ;
}

async function createMovie(movieData){
    
    const movie = new Movie ({
        
        title: movieData.title,
        genre: movieData.genre,
        director: movieData.director,
        year: Number(movieData.year),
        rating: Number(movieData.rating),
        description: movieData.description,
        imageURL: movieData.imageURL,
       
        
    });
    await movie.save();
    return movie;
}

/*function uuid(){
    return 'xxxx-xxxx'.replace(/x/g,() => (Math.random()*16|0).toString(16));
}*/

module.exports = {
    getAllMovies,
    getMovieById,
    createMovie
}