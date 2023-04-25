import useData, { FetchResponse } from "./useData";
import { movieRequest } from "@/lib/request";
export interface PopularMovie {
  id: number;
  title: string;
  backdrop_path: string;
  poster_path: string;
  name: string;
}

const usePopularMovies = () => useData(movieRequest.getMoviesWithPopular);

export default usePopularMovies;
