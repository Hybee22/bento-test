const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
// const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const key = require('./utils/libs/gen-key');

const AppError = require('./utils/libs/appError');
const globalErrorHandler = require('./controllers/errorController');

dotenv.config();
process.env.BENTO_TEST_ACCESS_TOKEN_SECRET = key(64);
process.env.BENTO_TEST_COOKIE_SECRET = key(64);

const app = express();

// Set Security HTTP Headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit Request from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP, please try again in an hour!',
});

app.use('/api', limiter);

app.use(cors());

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Cookie Parser
app.use(cookieParser());

// Data sanitize against NoSQL Query Injection
app.use(mongoSanitize()); // Checks the request headers, query strings, params for malicious codes

// Data sanitize against XSS
app.use(xss()); // Cleans user input from malicious HTML codes

const userRouter = require('./routes/userRoutes');

//   Routes Middleware
app.use('/api/v1/users', userRouter);
// app.use('/api/v1/reviews', reviewRouter);

// Unhandles Routes
app.all('*', (req, res, next) => {
  if (req.originalUrl === '/bundle.js.map') return next();
  next(
    new AppError(`Can't find resource ${req.originalUrl} on this server`, 404)
  );
});

// Global Error Handler
app.use(globalErrorHandler);

module.exports = app;
