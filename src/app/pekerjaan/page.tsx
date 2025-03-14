import React from "react";
import Navbar from "@/components/navbar/navbar";
import Filter from "@/components/pekerjaan/sidebar";
import JobCardGrid from "@/components/pekerjaan/job-card";
import VoiceSearch from "@/components/speech-recognition";

const Pekerjaan = () => {
  return (
    <main className="bg-white min-h-screen">
      <Navbar></Navbar>
      <div className="h-full p-16 flex flex-col space-y-16 max-lg:px-4">
        <VoiceSearch></VoiceSearch>
        <section className="flex space-x-10 flex-row justify-start items-start max-lg:flex-col max-lg:space-y-16 max-lg:justify-center max-lg:space-x-0">
          <aside className="w-1/4 max-lg:w-full max-lg:flex max-lg:justify-center">
            <Filter />
          </aside>
          <section className="max-lg:w-full max-lg:flex max-lg:justify-center">
            <JobCardGrid />
          </section>
        </section>
      </div>
    </main>
  );
};

export default Pekerjaan;
