import { fetchJokes } from "@/utils/fetchJokes";
import { List, Alert } from "@aquacloud/ui";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

interface JokeResultsProps {}

const JokeResults = ({}: JokeResultsProps) => {
  const {
    data,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isError,
  } = useInfiniteQuery({
    queryKey: ["jokes"],
    queryFn: ({ pageParam = 1 }) => fetchJokes(pageParam),
    getNextPageParam: (lastpage) => lastpage.next,
    refetchOnWindowFocus: false,
  });

  const { ref } = useInView({
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
    <div>
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

      <div className="px-2">
        {!hasNextPage ? (
          <Alert intent="warning" message="No more jokes" />
        ) : isFetchingNextPage ? (
          <Alert intent="info" message="Loading..." />
        ) : (
          <Alert ref={ref} message="View more" />
        )}
      </div>
    </div>
  );
};

export default JokeResults;
