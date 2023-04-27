import { useClientData } from "./useClientData";

export interface FetchedData<T> {
  page: number;
  results: T[];
}
export interface BasicDatas {
  id: number;
  title: string;
  backdrop_path: string;
  poster_path: string;
  name: string;
  unique?: string;
}

export const useMovieLists = (url: string) =>
  useClientData<FetchedData<BasicDatas>>(url);
