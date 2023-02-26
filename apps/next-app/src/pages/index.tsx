import InfiniteScrollResults from "@/components/InfiniteScrollResults";
import Search from "@/components/Search";
import ThemeSelect from "@/components/ThemeSelect";
import { NextPage } from "next";
import { useState } from "react";

const Page: NextPage = () => {
  const [term, setTerm] = useState("");

  return (
    <main className="min-h-screen bg-slate-200 py-2 text-slate-800 dark:bg-slate-800 dark:text-slate-200">
      <div className="container mx-auto flex max-w-2xl flex-col gap-2 px-2">
        <div className="sticky top-0 flex flex-col gap-2 bg-slate-200 py-2 dark:bg-slate-800 md:flex-row">
          <Search className="md:grow" onSearch={setTerm} />
          <ThemeSelect className="self-end md:self-start" />
        </div>
        {term && <InfiniteScrollResults term={term} />}
      </div>
    </main>
  );
};

Page.displayName = "HomePage";

export default Page;
