export const movieRequest = {
  getMoviesWithTopRates: `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.MOVIE_API_KEY}&language=en-US&page=1`,
  getMoviesWithPopular: `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.MOVIE_API_KEY}&language=en-US&page=1`,
  getMovieWithVideo: (movieId: number) => {
    return `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=2cfad9bcc22f6631af78368984500ca4&language=en-US`;
  },
};
