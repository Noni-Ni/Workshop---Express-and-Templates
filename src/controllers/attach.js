const { getMovieById, attachCastToMovie } = require("../services/movie");
const {getAllCast} = require("../services/cast");

module.exports = {
    attachGet: async(req,res) =>{
        const id = req.params.id;
        const movie = await getMovieById(id);
        
        if (!movie) {
            res.render('404');
            return;
        }

       const allCast =  await getAllCast();
       const castInMovie = movie.cast.map(id => id.toString());

        res.render('cast-attach', { movie, allCast: allCast.filter(c => !castInMovie.find(castId => castId == c._id.toString())) });
        
    },

    attachPost: async(req,res) =>{
        const movieId = req.params.id;
        const castId = req.body.cast;
        console.log(movieId , castId)
        if(!movieId || !castId){
            res.status(400).end();
            return;
        }
        
        if(castId == 'none'){
            const movie = await getMovieById(movieId);
            console.log(movie)
            const allCast = await getAllCast();
            console.log(allCast)
            res.render('cast-attach',{movie, allCast , error: true});
            return;
        }
        try{
            await attachCastToMovie(movieId, castId);
        }catch{
            res.status(400).end();
            return;
        }
        
        console.log(req.body);

        res.redirect('/details/' + movieId);
    }
}