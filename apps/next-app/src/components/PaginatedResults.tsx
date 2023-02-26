import PaginationControls from "@/components/PaginationControls";
import usePaginatedJokesQuery from "@/utils/useJokeInfiniteQuery";
import { Joke, Page } from "@aquacloud/internal";
import { Alert, List } from "@aquacloud/ui";
import { FetchNextPageOptions, InfiniteData } from "@tanstack/react-query";
import { useState } from "react";

interface PaginatedResutlsProps {
  data: InfiniteData<Page<Joke>>;
  fetchPage: (options?: FetchNextPageOptions) => void;
  isFetchingNextPage: boolean;
}

const PaginatedResults = ({
  data,
  fetchPage,
  isFetchingNextPage,
}: PaginatedResutlsProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const handleNavigate = (page: number) => {
    fetchPage({ pageParam: page, cancelRefetch: true });
    setCurrentPage(page);
  };

  return (
    <>
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
          <List className="md:grid md:grid-cols-2">
            {data.pages
              .find((page) => page.page === currentPage)
              ?.data.map((joke) => (
                <List.Item key={joke.id} className="overflow-hidden">
                  {joke.value}
                </List.Item>
              ))}
          </List>
          <PaginationControls
            current={currentPage}
            total={data.pages[0]!.totalPages}
            onNavigate={handleNavigate}
          />
        </>
      )}
    </>
  );
};

export default PaginatedResults;
