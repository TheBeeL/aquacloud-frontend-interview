import JokePage from "@/components/JokePage";
import { NextPage } from "next";

const Page: NextPage = () => {
  return (
    <main className="min-h-screen bg-slate-200 py-2 text-slate-800 dark:bg-slate-800 dark:text-slate-200">
      <div className="container mx-auto flex flex-col">
        <JokePage />
      </div>
    </main>
  );
};

Page.displayName = "HomePage";

export default Page;
