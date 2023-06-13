import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3/";
const API_KEY = "54ca32600b8d3533c486c2b7fe8c8efb";

export async function fetchGenres() {
  const response = await axios.get(
    `${BASE_URL}genre/movie/list?api_key=${API_KEY}`
  );

  // console.log('genres:', response.data);

  return response.data;
}

export async function fetchPopularMoviesForDay() {
  const response = await axios.get(
    `${BASE_URL}trending/movie/day?api_key=${API_KEY}`
  );

  //   console.log('responce-popular:', response.data);

  return response.data;
}

export async function fetchPopularMoviesForWeek() {
  const response = await axios.get(
    `${BASE_URL}trending/movie/week?api_key=${API_KEY}`
  );

  //   console.log('responce-popular:', response.data);

  return response.data;
}

export async function fetchTopRatedMovies(page) {
  const response = await axios.get(
    `${BASE_URL}movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`
  );

  //  console.log('responce-popular:', response.data);

  return response.data;
}

export async function fetchPopularTVForWeek() {
  const response = await axios.get(
    `${BASE_URL}trending/tv/week?api_key=${API_KEY}`
  );

  //   console.log('responce-popular:', response.data);

  return response.data;
}

export async function fetchMovieByGenre(genreId) {
  const response = await axios.get(
    `${BASE_URL}discover/movie?api_key=${API_KEY}&with_genres=${genreId}`
  );

//   console.log("responce-byGenre:", response.data);

  return response.data;
}

export async function fetchSerchedMovies(query, page) {
  const response = await axios.get(
    `${BASE_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=${page}&include_adult=false`
  );
  //  console.log('responce-serched:', response.data.results);

  return response.data.results;
}

export async function fetchMovieDetails(id) {
  const response = await axios.get(
    `${BASE_URL}movie/${id}?api_key=${API_KEY}&language=en-US`
  );
  //   console.log("responce-details:", response.data);

  return response.data;
}

export async function fetchMovieVideo(id) {
  const response = await axios.get(
    `${BASE_URL}movie/${id}/videos?api_key=${API_KEY}&language=en-US`
  );
  //   console.log("responce-video:", response.data);

  return response.data;
}

export async function fetchMovieCast(id) {
  const response = await axios.get(
    `${BASE_URL}movie/${id}/credits?api_key=${API_KEY}&language=en-US`
  );
  //   console.log('responce-cast:', response.data.cast);

  return response.data.cast;
}

export async function fetchMovieReviews(id, page) {
  const response = await axios.get(
    `${BASE_URL}movie/${id}/reviews?api_key=${API_KEY}&language=en-US&page=${page}`
  );
  //   console.log('responce-reviews:', response.data.results);

  return response.data.results;
}
