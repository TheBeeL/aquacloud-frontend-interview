import { Joke, Page } from "@aquacloud/internal";
import { useQuery } from "@tanstack/react-query";
import { NextPage } from "next";

const fetchJokes = async (page: number = 1) => {
  return (await (
    await fetch("/api/jokes?" + new URLSearchParams({ page: page.toString() }))
  ).json()) as Page<Joke>;
};

const Page: NextPage = () => {
  const page: number = 1;
  const { data: jokes } = useQuery<Page<Joke>>({
    queryKey: ["jokes", page],
    queryFn: () => fetchJokes(page),
  });

  return (
    <main className="min-h-screen bg-slate-200 py-2 text-slate-800 dark:bg-slate-800 dark:text-slate-200">
      <div className="container mx-auto flex flex-col gap-2">
        {jokes &&
          jokes.data.map((joke) => (
            <div
              key={joke.id}
              className="rounded border border-slate-800/70 p-1 dark:border-slate-200/70"
            >
              {joke.value}
            </div>
          ))}
      </div>
    </main>
  );
};

Page.displayName = "HomePage";

export default Page;
