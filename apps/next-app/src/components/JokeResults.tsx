import { displayAtom } from "@/components/DisplaySelector";
import InfiniteScrollResults from "@/components/InfiniteScrollResults";
import PaginatedResults from "@/components/PaginatedResults";
import usePaginatedJokesQuery from "@/utils/useJokeInfiniteQuery";
import { Alert } from "@aquacloud/ui";
import { useAtomValue } from "jotai";

interface JokeResultsProps {
  term: string;
  display?: "scroll" | "paginated";
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
  const display = useAtomValue(displayAtom);

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
      {data && display === "scroll" ? (
        <InfiniteScrollResults
          data={data}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      ) : (
        <PaginatedResults
          data={data}
          fetchPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      )}
    </div>
  );
};

export default JokeResults;
