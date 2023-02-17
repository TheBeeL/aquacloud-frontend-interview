export * from "./utils/pagination";
export { Joke } from "./models/Joke";

import axios, { AxiosError } from "axios";
import { Joke } from "./models/Joke";
import { Result } from "./utils/result";

export interface SearchResponse {
  total: number;
  result: Joke[];
}

export const searchJokes = (query: string) => {
  return Result.fromPromise(
    () =>
      axios.get<SearchResponse>("https://api.chucknorris.io/jokes/search", {
        params: { query },
      }),
    AxiosError.from
  );
};
