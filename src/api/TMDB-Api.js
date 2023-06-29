import axios from "axios";

/* API CALLS FROM TheMovieDatabase API - https://www.themoviedb.org */

/* 
  TMDB base url and bearer access token. BEARER and API_KEY stored
  in .env file.
*/
const BASE_URL = "https://api.themoviedb.org/3";
// const BEARER = process.env.REACT_APP_BEARER_TOKEN;
// const API_KEY = process.env.REACT_APP_API_KEY

// Fetch movies based on user entered searchTerm. Return all page results.
export const FetchMovies = async (searchTerm) => {
  const results = [];
  let currentPage = 1;
  let totalPages = 1;

  while (currentPage <= totalPages) {
    const response = await axios.get(`${BASE_URL}/search/movie?`, {
      headers: {
        Authorization: process.env.REACT_APP_BEARER_TOKEN,
      },
      params: {
        api_key: process.env.REACT_APP_API_KEY,
        query: searchTerm,
        page: currentPage,
      },
    });

    results.push(...response.data.results);
    totalPages = response.data.total_pages;
    currentPage++;
  }

  // Sort the results by release date in descending order.
  const sortedResults = results.sort((a, b) => {
    return new Date(b.release_date) - new Date(a.release_date);
  });
  return sortedResults;
};

// Fetch details about movies using movie ID (movieId)
export const FetchMovieDetails = async (movieId) => {
  const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
    headers: {
      Authorization: process.env.REACT_APP_BEARER_TOKEN,
    },
    params: {
      api_key: process.env.REACT_APP_API_KEY,
    },
  });
  return response.data;
};

// Fetch YouTube video data using movie ID (movieId)
export const FetchMovieVideos = async (movieId) => {
  const response = await axios.get(`${BASE_URL}/movie/${movieId}/videos`, {
    headers: {
      Authorization: process.env.REACT_APP_BEARER_TOKEN,
    },
    params: {
      api_key: process.env.REACT_APP_API_KEY,
    },
  });
  return response.data;
};

// Fetch details about the movie cast based on movie ID (movieId)
export const FetchMovieCast = async (movieId) => {
  const response = await axios.get(`${BASE_URL}/movie/${movieId}/credits`, {
    headers: {
      Authorization: process.env.REACT_APP_BEARER_TOKEN,
    },
    params: {
      api_key: process.env.REACT_APP_API_KEY,
    },
  });
  return response.data;
};

/* 
  Fetch data about most popular movies. Returns data about current page 
  of results. Pages handled in "../components/Pages/MostPopular.js"
*/
export const FetchMostPopular = async (page) => {
  const response = await axios.get(`${BASE_URL}/movie/popular`, {
    headers: {
      Authorization: process.env.REACT_APP_BEARER_TOKEN,
    },
    params: {
      api_key: process.env.REACT_APP_API_KEY,
      page: page,
    },
  });
  if (page > response.data.total_pages) {
    return [];
  }
  return response.data;
};

/* 
  Fetch data about most popular movies. Returns data about current page 
  of results. Pages handled in "../components/Pages/Upcoming.js"
*/
export const FetchUpcoming = async (page) => {
  const response = await axios.get(`${BASE_URL}/movie/upcoming`, {
    headers: {
      Authorization: process.env.REACT_APP_BEARER_TOKEN,
    },
    params: {
      api_key: process.env.REACT_APP_API_KEY,
      page: page,
    },
  });
  if (page > response.data.total_pages) {
    return [];
  }
  return response.data;
};

/* 
  Fetch data about most popular movies. Returns data about current page 
  of results. Pages handled in "../components/Pages/TopRated.js"
*/
export const FetchTopRated = async (page) => {
  const response = await axios.get(`${BASE_URL}/movie/top_rated`, {
    headers: {
      Authorization: process.env.REACT_APP_BEARER_TOKEN,
    },
    params: {
      api_key: process.env.REACT_APP_API_KEY,
      page: page,
    },
  });
  if (page > response.data.total_pages) {
    return [];
  }
  return response.data;
};

// export const FetchGenres = async () => {
//   const response = await axios.get(`${BASE_URL}/genre/movie/list`, {
//     headers: {
//       Authorization: BEARER,
//     },
//     params: {
//       api_key: "7534bb698f8871b143ebc3bcb434388c",
//     },
//   });
//   console.log(response.data);
//   return response.data;
// };