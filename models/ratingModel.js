const mongoose = require('mongoose');

const ratingSchema = mongoose.Schema(
  {
    rating: {
      type: Number,
      min: [1, 'Ratings must be above 1.0'],
      max: [5, 'Ratings must not exceed 5.0'],
      set: (val) => Math.round(val * 10) / 10,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    favorite: {
      type: mongoose.Schema.ObjectId,
      ref: 'Favorite',
      required: [true, 'Review must belong to a favorite movie.'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

ratingSchema.index({ favorite: 1, user: 1 }, { unique: true });

// QUERY MIDDLEWARE
ratingSchema.pre(/^find/, function (next) {
  this.populate({
    //Populates just the movie document
    path: 'favorite',
    select: '-__v',
  });
  this.populate({
    //Populates just the user document
    path: 'user',
    select: 'username',
  });
  next();
});

const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;
