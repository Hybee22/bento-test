const express = require('express');
const router = express.Router({ mergeParams: true });

const ratingController = require('../controllers/ratingController');
const authController = require('../controllers/authController');

// Ratings
router
  .route('/')
  .get(ratingController.getAllRatings)
  .post(ratingController.createRating);

router
  .route('/:id')
  .get(ratingController.getRating)
  .patch(ratingController.updateRating)
  .delete(ratingController.deleteRating);

module.exports = router;
