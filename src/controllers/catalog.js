const { getAllMovies, getMovieById } = require("../services/movie");




module.exports = {
    homeController: async (req, res) => {
      
        const movies = await getAllMovies();
        res.render('home', { movies });
    },

    detailsController: async (req, res) => {
        const id = req.params.id;
        const movie = await getMovieById(id);
        
        if (!movie) {
            res.render('404');
            return;
        }
        movie.starRating = '&#x2605'.repeat(movie.rating);
        res.render('details', { movie });
    },

    search: async (req, res) => {

        let search = req.query.search;
        let genre = req.query.genre;
        let year = req.query.year;

        let movies = await getAllMovies();
        if (search || genre || year) {
            
            if (search) {
                 movies = movies.filter((el) => el.title.toLowerCase().includes(search.toLowerCase()));
                
                if(genre){
                   movies =  movies.filter((el) => el.genre.toLowerCase().includes(genre.toLowerCase()));
                    if(year){
                       movies =  movies.filter((el) => Number(el.year) === Number(year));
                    }
                    
                }else if(year){
                    movies =  movies.filter((el) => Number(el.year) === Number(year));
                }
                
            }else if(genre){
                 movies = movies.filter((el) => el.genre.toLowerCase() === (genre.toLowerCase()));
                if(year){
                    movies = movies.filter((el) => Number(el.year) === Number(year));
                }
                
            }else if(year){
               movies = movies.filter((el) => Number(el.year) === Number(year));
                
            }
            
            
        }
        console.log(movies);
        res.render('search', {movies});
    }
}