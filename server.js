'use strict';

// ***** REQUIRES *****
const express = require('express');
require('dotenv').config();
const cors = require('cors');

let data = require('./data/weather.json');

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

app.get('/weather', (request, response, next) => {
  try {

    let lat = request.query.lat;
    let lon = request.query.lon;
    let searchQuery = request.query.city_name;

    let dataToGroom = data.find(city => city.city_name === searchQuery);
    let dataToSend = new Forecast(dataToGroom, lat, lon);
    console.log(dataToSend);
    response.status(200).send(dataToSend);

  } catch (error) {
    next(error);
  }
});

// ***** CLASS TO GROOM BULKY DATA ****

class Forecast {
  constructor(cityObj, lat, lon) {
    this.dateTimeOne = cityObj.data[0].datetime;
    this.descriptionOne = cityObj.data[0].weather.description;
    this.dateTimeTwo = cityObj.data[1].datetime;
    this.descriptionTwo = cityObj.data[1].weather.description;
    this.dateTimeThree = cityObj.data[2].datetime;
    this.descriptionThree = cityObj.data[2].weather.description;
    this.lat = lat;
    this.lon = lon;
  }
}




app.get('*', (request, response) => {
  response.status(404).send('This page does not exist');
});


app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});


// ***** SEVER START *****
app.listen(PORT, () => console.log(`We are running on port: ${PORT}`));
