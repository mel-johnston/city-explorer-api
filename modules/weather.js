'use strict';

const axios = require('axios');

async function getWeather(request, response, next) {
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
};

class Forecast {
  constructor(day) {
    this.dateTime = day.datetime;
    this.description = day.weather.description;
    this.highTemp = day.high_temp;
    this.lowTemp = day.low_temp;
  }
}

module.exports = getWeather;
