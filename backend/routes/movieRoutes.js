const express = require('express');
const { getTrendingMovies } = require('../controllers/movieController');
const verifyToken = require('../middleware/auth');

const router = express.Router();

router.get('/trending', verifyToken, getTrendingMovies);

module.exports = router;
