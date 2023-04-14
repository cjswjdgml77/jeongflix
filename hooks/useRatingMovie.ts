import { movieRequest } from "@/lib/request";
import useData, { FetchResponse } from "./useData";
export interface RatingMovies {
  id: number;
  title: string;
  backdrop_path: string;
}
//{data: FetchResponse<RatingMovies[]>,error:any}
const useRatingMovie = () => useData(movieRequest.getMoviesWithTopRates);

export default useRatingMovie;
