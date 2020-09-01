const express = require('express');
const router = express.Router();

const favoriteController = require('../controllers/favoriteController');
const authController = require('../controllers/authController');

const ratingRouter = require('./ratingRoutes');

// Allow redirect to ratingRoutes
router.use('/:favoriteId/ratings', ratingRouter);

// FAVORITE
router
  .route('/')
  .get(favoriteController.getAllFavorites)
  .post(favoriteController.createFavorite);
router
  .route('/:id')
  .get(favoriteController.getFavorite)
  .patch(favoriteController.updateFavorite)
  .delete(favoriteController.deleteFavorite);

module.exports = router;
