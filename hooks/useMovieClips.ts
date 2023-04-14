import { movieRequest } from "@/lib/request";
import useData from "./useData";

export interface MovieClips {
  name: string;
  key: string;
}
const useMovieClips = (movieId: number) =>
  useData(movieRequest.getMovieWithVideo(movieId));

export default useMovieClips;
