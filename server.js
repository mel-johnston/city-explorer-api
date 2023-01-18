'use strict';

// ***** REQUIRES *****
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const axios = require('axios');

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

app.get('/weather', async (request, response, next) => {
  try {

    let lat = request.query.lat;
    let lon = request.query.lon;
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.REACT_APP_WEATHERBIT_API_KEY}&days=5&units=I`;

    let weatherAxios = await axios.get(url);
    let weatherData = weatherAxios.data.data.map(day => new Forecast(day));
    console.log(weatherData);
    response.status(200).send(weatherData);

  } catch (error) {
    next(error);
  }
});

app.get('/movie', async (request, response, next) => {
  try {

    let city = request.query.city_name;

    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MDB_API_KEY}&query=${city}&page=1`

    let movieAxios = await axios.get(url);
    // console.log(movieAxios.data)
    let movieData = movieAxios.data.map(movie => new Movies(movie));
    console.log(movieData);

    response.status(200).send(movieData);

  } catch (error) {
    next(error);
  }

});


// ***** CLASS TO GROOM BULKY DATA ****

class Forecast {
  constructor(day) {
    this.dateTime = day.datetime;
    this.description = day.weather.description;
    this.highTemp = day.high_temp;
    this.lowTemp = day.low_temp;
  }
}

class Movies {
  constructor(movie) {
    this.title = movie.title;
    this.overview = movie.overview;
  }
}

// ***** ERRORS ****

app.get('*', (request, response) => {
  response.status(404).send('This page does not exist');
});


app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});


// ***** SEVER START *****
app.listen(PORT, () => console.log(`We are running on port: ${PORT}`));
