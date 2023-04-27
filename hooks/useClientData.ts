import axios, { AxiosError } from "axios";
import useSWR, { KeyedMutator } from "swr";
const fetcher = async (url: string) => {
  return await axios.get(url).then((res) => res.data);
};

export const useClientData = <T>(url: string) => {
  const {
    data,
    error,
    isLoading,
    mutate,
  }: {
    data: T;
    error: AxiosError | null | undefined;
    isLoading: boolean;
    mutate: KeyedMutator<T>;
  } = useSWR(url, fetcher);
  return { data, error, isLoading, mutate };
};
