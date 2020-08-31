const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const favoriteSchema = new mongoose.Schema(
  {
    movieId: {
      type: String,
      required: [true, 'Please add a movie.'],
    },
    poster: {
      type: String,
    },
  },
  {
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  }
);

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;
