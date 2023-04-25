import { movieRequest } from "@/lib/request";
import useData from "./useData";
export interface TrendingMovie {
  id: number;
  backdrop_path: string;
  original_title: string;
  overview: string;
  title: string;
  name: string;
  vote_average: number;
}
const useTrendingMovies = () => useData(movieRequest.getTrendingWithDay);

export default useTrendingMovies;
