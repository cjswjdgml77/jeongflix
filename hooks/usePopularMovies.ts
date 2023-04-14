import useData, { FetchResponse } from "./useData";
import { movieRequest } from "@/lib/request";
export interface PopularMovies {
  id: number;
  title: string;
  backdrop_path: string;
}

const usePopularMovies = () => useData(movieRequest.getMoviesWithPopular);

export default usePopularMovies;
