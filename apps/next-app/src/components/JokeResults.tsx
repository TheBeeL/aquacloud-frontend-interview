import { fetchJokes } from "@/utils/fetchJokes";
import { List, Alert } from "@aquacloud/ui";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

interface JokeResultsProps {
  term: string;
}

const JokeResults = ({ term }: JokeResultsProps) => {
  const {
    data,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isError,
  } = useInfiniteQuery({
    queryKey: ["jokes", term],
    queryFn: ({ pageParam = 1 }) => fetchJokes(term, pageParam),
    getNextPageParam: (lastpage) => lastpage.next,
    refetchOnWindowFocus: false,
  });

  const { ref } = useInView({
    threshold: 1,
    onChange: (inView) => {
      if (inView) {
        fetchNextPage();
      }
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Server error...</div>;
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="text-center text-sm">
        Showing results for:
        <span className="font-bold italic">&quot;{term}&quot;</span>
      </div>
      {data && (
        <List>
          {data.pages.map(
            (page) =>
              page.data &&
              page.data.map((joke) => (
                <List.Item key={joke.id}>{joke.value}</List.Item>
              )),
          )}
        </List>
      )}

      {!hasNextPage ? (
        <Alert intent="warning" message="No more jokes" />
      ) : isFetchingNextPage ? (
        <Alert intent="info" message="Loading..." />
      ) : (
        <Alert ref={ref} message="View more" />
      )}
    </div>
  );
};

export default JokeResults;
