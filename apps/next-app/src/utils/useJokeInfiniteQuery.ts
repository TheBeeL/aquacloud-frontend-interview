import { useInfiniteQuery } from "@tanstack/react-query";
import { Joke, Page } from "@aquacloud/internal";

/**
 * Fetch a Page of jokes from `api/jokes`
 *
 * @param term - Search term to query
 * @param page - Index of the page to return
 * @returns The Page of Jokes request
 */
export const fetchJokes = async (term: string, page: number = 1) => {
  const params = new URLSearchParams({
    page: page.toString(),
  });
  if (term !== "") {
    params.append("query", term.toLowerCase());
  }

  return (await (await fetch(`/api/jokes?${params}`)).json()) as Page<Joke>;
};

/**
 * useInfiniteQuery hook for getting data from `/api/jokes`
 * @param term - Search term to query
 * @returns an instance of useInfiniteQuery
 */
const usePaginatedJokesQuery = (term: string) => {
  return useInfiniteQuery({
    queryKey: ["jokes", term],
    queryFn: ({ pageParam }) => fetchJokes(term, pageParam),
    getNextPageParam: (lastpage) => lastpage.next,
    refetchOnWindowFocus: false,
  });
};

export default usePaginatedJokesQuery;
