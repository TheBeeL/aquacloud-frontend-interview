import { Joke, Page } from "@aquacloud/internal";
import { Alert, List } from "@aquacloud/ui";
import { InfiniteData } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

interface InfiniteScrollResultsProps {
  data: InfiniteData<Page<Joke>>;
  fetchNextPage: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage: boolean;
}

const InfiniteScrollResults = ({
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: InfiniteScrollResultsProps) => {
  const { ref } = useInView({
    threshold: 1,
    onChange: (inView) => {
      if (inView) {
        fetchNextPage();
      }
    },
  });

  return (
    <>
      <List className="md:grid md:grid-cols-2">
        {data.pages.map(
          (page) =>
            page.data &&
            page.data.map((joke) => (
              <List.Item key={joke.id} className="max-w-full overflow-hidden">
                {joke.value}
              </List.Item>
            )),
        )}
      </List>
      {!hasNextPage ? (
        <Alert intent="warning" message="No more jokes" />
      ) : isFetchingNextPage ? (
        <Alert intent="info" message="Loading..." />
      ) : (
        <Alert ref={ref} message="View more" />
      )}
    </>
  );
};

export default InfiniteScrollResults;
