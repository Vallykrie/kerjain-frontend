import React from "react";
import Navbar from "@/components/navbar/navbar";
import JobDetailPage from "@/components/pekerjaan/job-details";

const Page = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="min-h-fit">
        <JobDetailPage></JobDetailPage>
      </div>
    </div>
  );
};

export default Page;
