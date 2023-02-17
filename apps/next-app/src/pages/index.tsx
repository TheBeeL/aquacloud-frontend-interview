import { Joke, Page } from "@aquacloud/internal";
import { useQuery } from "@tanstack/react-query";
import { NextPage } from "next";

const Page: NextPage = () => {
  const { data: jokes } = useQuery<Page<Joke>>({
    queryKey: ["jokes"],
    queryFn: async () => (await fetch("/api/jokes")).json(),
  });

  return (
    <div className="container">
      {jokes && jokes.data.map((joke) => <div key={joke.id}>{joke.value}</div>)}
    </div>
  );
};

Page.displayName = "HomePage";

export default Page;
