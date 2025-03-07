import React from "react";
import Navbar from "@/components/navbar/navbar";
import Filter from "@/components/pekerjaan/sidebar";
import JobCardGrid from "@/components/pekerjaan/grid";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Pekerjaan = () => {
  return (
    <div className="bg-white min-h-screen">
      <Navbar></Navbar>
      <div className="h-full p-16 flex flex-col space-y-16">
        <div className="flex flex-row space-x-2">
          <Input
            className="bg-[#F0F3F9] border-[#F0F3F9] h-14 text-lg"
            placeholder="Cari Nama Pekerjaan, Skill, dan Perusahaan"
          ></Input>
          <Input
            className="bg-[#F0F3F9] border-[#F0F3F9] h-14 text-lg"
            placeholder="Cari Lokasi"
          ></Input>
          <Button className="w-1/3 h-14 font-semibold text-xl rounded-xl bg-[#05195B] hover:bg-blue-900">
            Cari
          </Button>
        </div>
        <div className="flex space-x-10 flex-row justify-start items-start">
          <aside className="w-1/4">
            <Filter />
          </aside>
          <JobCardGrid />
        </div>
      </div>
    </div>
  );
};

export default Pekerjaan;
