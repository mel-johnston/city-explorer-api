'use strict';

const axios = require('axios');

async function getMovies(request, response, next) {
  try {
    let city = request.query.city_name;
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MDB_API_KEY}&query=${city}&page=1`
    let movieAxios = await axios.get(url);
    const topFive = movieAxios.data.results.splice(0,5);
    let movieData = topFive.map(movie => new Movies(movie));
    console.log(movieData);
    response.status(200).send(movieData);
  } catch (error) {
    next(error);
  }
};

class Movies {
  constructor(movie) {
    this.title = movie.title;
    this.overview = movie.overview;
  }
}

module.exports = getMovies;
