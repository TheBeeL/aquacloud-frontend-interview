import JokeResults from "@/components/JokeResults";
import Search from "@/components/Search";
import { NextPage } from "next";

const Page: NextPage = () => {
  const handleSearch = (term: string) => {
    console.log(term);
  };

  return (
    <main className="min-h-screen bg-slate-200 py-2 text-slate-800 dark:bg-slate-800 dark:text-slate-200">
      <div className="container mx-auto flex flex-col gap-2 p-2">
        <Search onSearch={handleSearch} />
        <JokeResults />
      </div>
    </main>
  );
};

Page.displayName = "HomePage";

export default Page;
