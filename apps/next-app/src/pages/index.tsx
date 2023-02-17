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
    <div className="container">
      {jokes && jokes.data.map((joke) => <div key={joke.id}>{joke.value}</div>)}
    </div>
  );
};

Page.displayName = "HomePage";

export default Page;
