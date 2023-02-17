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
    <main className="bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 min-h-screen py-2">
      <div className="container mx-auto flex flex-col gap-2">
        {jokes &&
          jokes.data.map((joke) => (
            <div
              key={joke.id}
              className="border border-slate-800/70 dark:border-slate-200/70 rounded p-1"
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
