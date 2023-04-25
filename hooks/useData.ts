import axios from "axios";
export interface FetchResponse<T> {
  results: T[];
}
const useData = async (url: string) => {
  try {
    const { data } = await axios.get(url);
    return data.results;
  } catch (e) {
    return e;
  }
};

export default useData;
