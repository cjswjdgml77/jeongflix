export const movieRequest = {
  getMoviesWithTopRates: `https://api.themoviedb.org/3/movie/top_rated?api_key=2cfad9bcc22f6631af78368984500ca4&language=en-US&page=1`,
  getMoviesWithPopular: `https://api.themoviedb.org/3/movie/popular?api_key=2cfad9bcc22f6631af78368984500ca4&language=en-US&page=1`,
  getTrendingWithDay: `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.MOVIE_API_KEY}`,
  getMoviesWithNowPlaying: `https://api.themoviedb.org/3/movie/now_playing?api_key=2cfad9bcc22f6631af78368984500ca4&language=en-US&page=1`,
  getMoviesWithUpcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=2cfad9bcc22f6631af78368984500ca4&language=en-US&page=1`,
  getMoviesWithRecommendations: (movieId: number) =>
    `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=2cfad9bcc22f6631af78368984500ca4`,
  getMoviesWithSimilar: (movieId: number) =>
    `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=2cfad9bcc22f6631af78368984500ca4`,
  getMovieWithVideo: (movieId: number) => {
    return `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=2cfad9bcc22f6631af78368984500ca4&language=en-US`;
  },
  getMovieDetails: (movieId: number) =>
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=2cfad9bcc22f6631af78368984500ca4&language=en-US`,
};
