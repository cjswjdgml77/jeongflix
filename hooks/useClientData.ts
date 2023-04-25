import useSWR from "swr";
import axios from "axios";
const fetcher = async (url: string) => {
  return await axios.get(url).then((res) => res.data);
};

export const useClientData = (url: string) => useSWR(url, fetcher);
