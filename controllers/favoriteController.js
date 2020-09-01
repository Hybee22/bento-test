const Favorite = require('../models/favoriteModel');
const factory = require('../utils/libs/handlerFactory');

// Route Handlers
exports.getAllFavorites = factory.getAll(Favorite);
exports.getFavorite = factory.getOne(Favorite, { path: 'ratings' });
exports.createFavorite = factory.createOne(Favorite);
exports.updateFavorite = factory.updateOne(Favorite);
exports.deleteFavorite = factory.deleteOne(Favorite);
