import { useClientData } from "./useClientData";
export interface Favorites {
  id: string;
  key: string;
  title: string;
  posterPath: string;
  backdropPath: string;
}
interface FecthApiData {
  favorites: Favorites[];
}
export const useFavorites = (url: string) => useClientData<FecthApiData>(url);
