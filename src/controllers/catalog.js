const { getAllMovies, getMovieById, searchFor } = require("../services/movie");




module.exports = {
    homeController: async (req, res) => {

        const movies = await getAllMovies();
        for (let movie of movies) {
            movie.isAuthor = req.user && req.user._id == movie.author.toString();
        }
        res.render('home', { movies });
    },

    detailsController: async (req, res) => {
        const id = req.params.id;
        const movie = await getMovieById(id);

        if (!movie) {
            res.render('404');
            return;
        }

        movie.isAuthor = req.user && req.user._id == movie.author.toString();

        movie.starRating = '&#x2605'.repeat(movie.rating);
        res.render('details', { movie });
    },

    search: async (req, res) => {

        let title = req.query.title;
        let genre = req.query.genre;
        let year = req.query.year;

        let movies = [];
        if (title || genre || year) {

            movies = await searchFor(title, genre, year);
        } else {
            movies = await getAllMovies();
        }

        res.render('search', { movies });


    }
        
        
}


