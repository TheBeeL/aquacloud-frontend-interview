import { NextPage } from "next";

const Page: NextPage = (_) => {
  return (
    <div className="container">
      <p>Welcome to the Aquacloud FrontEnd Engineer tech test</p>
    </div>
  );
};

Page.displayName = "HomePage";

export default Page;
