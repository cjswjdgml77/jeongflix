import { useClientData } from "./useClientData";
export interface MyList {
  id: string;
  key: string;
  title: string;
  posterPath: string;
  backdropPath: string;
}
interface FecthApiData {
  mylist: MyList[];
}
export const useMyList = (url: string) => useClientData<FecthApiData>(url);
