import React from "react";
import Navbar from "@/components/navbar/navbar";
import VoiceSearch from "@/components/speech-recognition";

const Komunitas = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="h-[calc(100vh-160px)] w-full flex justify-center items-center font-extrabold text-6xl ">
        CommIn
      </div>
      <VoiceSearch />
    </div>
  );
};

export default Komunitas;
