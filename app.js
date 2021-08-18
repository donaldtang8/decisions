const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const enforce = require('express-sslify');
const hpp = require('hpp');
const app = express();

const yelpRouter = require('./routes/yelpRoutes');

/* GLOBAL MIDDLEWARES */
// serving static files
// app.use(express.static(path.join(__dirname, 'client/build')));

// set security HTTP headers
app.use(helmet());

// body parser - reading data from body into req.body
app.use(express.json({
  limit: '10kb'
}));

// cors - cross origin request, checks that no exterior front end is trying to access our server
app.use(cors());

// prevent porameter population - if url contains ?sort=duration&sort-price , hpp() will set it such that it will sort by the last parameter
app.use(
  hpp({
    // whitelist is an array of parameters that we allow duplicates of
    whitelist: [],
  })
);

// if application is in production mode
if (process.env.NODE_ENV === 'production') {
  app.use(enforce.HTTPS({
    trustProtoHeader: true
  }));
//   app.use(express.static(path.join(__dirname, 'client/build')));
}

/* ROUTES */
app.use('/api/yelp', yelpRouter);

// for any routes that we have not caught
app.all('*', (req, res, next) => {
  // use error middleware to handle error
  // if next function receives an error argument, express will automatically know it has received an error
  // it will then skip all other middlewares in the stack and go straight to the error middleware
  console.log(req);
  next(new Error(`Can't find route!`));
});

module.exports = app;