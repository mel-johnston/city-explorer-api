'use strict';

// ***** REQUIRES *****
const express = require('express');
require('dotenv').config();
const cors = require('cors');

const getWeather = require('./modules/myweather.js');
const getMovies = require('./modules/movies.js');

// ***** APP === SERVER *****
const app = express();

// ***** MIDDLEWARE *****
app.use(cors());

// ***** PORT FOR SERVER TO RUN *****
const PORT = process.env.PORT || 3002;

// ***** ENDPOINTS *****
app.get('/', (request, response) => {
  response.status(200).send('Welcome to my server');
});

app.get('/weather', getWeather);
app.get('/movie', getMovies);

// ***** ERRORS ****
app.get('*', (request, response) => {
  response.status(404).send('This page does not exist');
});

app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

// ***** SERVER START *****
app.listen(PORT, () => console.log(`We are running on port: ${PORT}`));
