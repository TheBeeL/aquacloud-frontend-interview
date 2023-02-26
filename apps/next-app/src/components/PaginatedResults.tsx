import PaginationControls from "@/components/PaginationControls";
import usePaginatedJokesQuery from "@/utils/useJokeInfiniteQuery";
import { Alert, List } from "@aquacloud/ui";
import { useState } from "react";

interface PaginatedResutlsProps {
  term: string;
}

const PaginatedResults = ({ term }: PaginatedResutlsProps) => {
  const { data, isLoading, fetchNextPage, isFetchingNextPage, isError } =
    usePaginatedJokesQuery(term);
  const [currentPage, setCurrentPage] = useState(1);
  const handleNavigate = (page: number) => {
    fetchNextPage({ pageParam: page, cancelRefetch: true });
    setCurrentPage(page);
  };

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
      <PaginationControls
        current={currentPage}
        total={data.pages[0]!.totalPages}
        onNavigate={handleNavigate}
      />
      {isFetchingNextPage &&
      !data.pages.some((page) => page.page === currentPage) ? (
        <Alert intent="info" message="Loading..." />
      ) : (
        <>
          {data && (
            <List className="md:grid md:grid-cols-2">
              {data.pages
                .find((page) => page.page === currentPage)
                ?.data.map((joke) => (
                  <List.Item key={joke.id} className="overflow-hidden">
                    {joke.value}
                  </List.Item>
                ))}
            </List>
          )}
          <PaginationControls
            current={currentPage}
            total={data.pages[0]!.totalPages}
            onNavigate={handleNavigate}
          />
        </>
      )}
    </div>
  );
};

export default PaginatedResults;
