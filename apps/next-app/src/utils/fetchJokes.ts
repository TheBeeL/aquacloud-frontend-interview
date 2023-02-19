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
    params.append("query", term);
  }

  return (await (await fetch(`/api/jokes?${params}`)).json()) as Page<Joke>;
};
