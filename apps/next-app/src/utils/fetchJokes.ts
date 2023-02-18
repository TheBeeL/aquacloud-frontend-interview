import { Joke, Page } from "@aquacloud/internal";

/**
 * Fetch a Page of jokes from `api/jokes`
 *
 * @param page - Index of the page to return
 * @returns The Page of Jokes request
 */
export const fetchJokes = async (page: number = 1) => {
  const params = new URLSearchParams({
    page: page.toString(),
  });

  return (await (await fetch(`/api/jokes?${params}`)).json()) as Page<Joke>;
};
