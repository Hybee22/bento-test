const Rating = require('../models/ratingModel');
const factory = require('../utils/libs/handlerFactory');

exports.getAllRatings = factory.getAll(Rating);
exports.getRating = factory.getOne(Rating);
exports.createRating = factory.createOne(Rating);
exports.updateRating = factory.updateOne(Rating);
exports.deleteRating = factory.deleteOne(Rating);
