const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema(
  {
    movieId: {
      type: String,
      required: [true, 'Please add a movie id.'],
    },
    movieTitle: {
      type: String,
      required: [true, 'Please add a movie title'],
    },
    imageCover: {
      type: String,
    },
    overview: {
      type: String,
      required: [true, 'Please add a movie overview'],
    },
    releaseDate: {
      type: Date,
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

favoriteSchema.virtual('ratings', {
  ref: 'Rating',
  foreignField: 'favorite',
  localField: '_id',
});

favoriteSchema.pre('save', function (next) {
  this.imageCover = `https://image.tmdb.org/t/p/w500${this.imageCover}`;
  this.movieId = `https://api.themoviedb.org/3/movie/${this.movieId}?api_key=${process.env.MOVIESDB_API}&language=en-US`;
  next();
});

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;
