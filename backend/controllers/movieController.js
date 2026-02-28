const axios = require('axios');

const getTrendingMovies = async (req, res) => {
    try {
        const tmdbApiKey = process.env.TMDB_API_KEY;
        if (!tmdbApiKey) {
            return res.status(500).json({ message: 'Server configuration error: TMDB API key is missing' });
        }

        const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${tmdbApiKey}`);

        // Return only necessary movie fields
        const movies = response.data.results.map(movie => ({
            id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            overview: movie.overview,
            vote_average: movie.vote_average
        }));

        res.json({ results: movies });
    } catch (error) {
        console.error('TMDB API Error:', error.message);
        res.status(500).json({ message: 'Error fetching movies from TMDB' });
    }
};

module.exports = {
    getTrendingMovies
};
