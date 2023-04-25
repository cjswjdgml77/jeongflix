import { movieRequest } from "@/lib/request";
import useData from "./useData";

export interface MovieClips {
  id: number;
  name: string;
  key: string;
  type: string;
}
const useMovieClips = (movieId: number) =>
  useData(movieRequest.getMovieWithVideo(movieId));

export default useMovieClips;
