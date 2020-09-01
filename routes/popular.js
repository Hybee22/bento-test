const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const router = express.Router();
const catchAsync = require('../utils/libs/catchAsync');
const authController = require('../controllers/authController');

// USERS ROUTES
router.get(
  '/:type',
  catchAsync(async (req, res, next) => {
    let { page } = req.query;
    let { type } = req.params;

    page ? page : 1;

    if (page > 10) {
      return res.status(200).json({
        status: 'success',
        message: 'You can only fetch 200 movies for this test',
      });
    }

    const url = `http://api.themoviedb.org/3/movie/${type}?api_key=${process.env.MOVIESDB_API}&page=${page}`;
    const query = await axios.get(url);
    const {
      data: { results },
    } = query;

    return res.status(200).json({
      status: 'success',
      count: results.length,
      data: {
        data: results,
      },
    });
  })
);

module.exports = router;
