'use strict';

const axios = require('axios');

let cache = {};

async function getMovies(request, response, next) {
  try {
    let city = request.query.city_name;
    let key = `${city}Movie`;

    if (cache[key] && (Date.now() - cache[key].timeStamp) < 10000) {
      console.log('Cache was hit');
      response.status(200).send(cache[key].data);

    } else {
      console.log('cache missed');
      let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MDB_API_KEY}&query=${city}&page=1`
      let movieAxios = await axios.get(url);
      const topFive = movieAxios.data.results.splice(0, 5);
      let movieData = topFive.map(movie => new Movies(movie));


      cache[key] = {
        data: movieData,
        timeStamp: Date.now()
      };

      response.status(200).send(movieData);
    }
  } catch (error) {
    next(error);
  }
}


class Movies {
  constructor(movie) {
    this.title = movie.title;
    this.overview = movie.overview;
  }
}

module.exports = getMovies;
