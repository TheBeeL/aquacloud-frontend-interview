import usePaginatedJokesQuery from "@/utils/useJokeInfiniteQuery";
import { List, Alert } from "@aquacloud/ui";
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
  } = usePaginatedJokesQuery(term);
  const { ref } = useInView({
    threshold: 1,
    onChange: (inView) => {
      if (inView) {
        fetchNextPage();
      }
    },
  });

  if (isLoading) {
    return <Alert intent="info" message="Loading..." />;
  }

  if (isError) {
    return <Alert intent="error" message="Server Error" />;
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="text-center text-sm">
        Showing results for:
        <span className="font-bold italic">&quot;{term}&quot;</span>
      </div>
      {data && (
        <List className="md:grid md:grid-cols-2">
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
