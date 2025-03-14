import React from "react";
import komunitas from "public/komunitas-saya.svg";
import jelajahi from "public/jelajahi-komunitas.svg";
import Image from "next/image";

const Sidebar = () => {
  return (
    <div className="border-2 px-4 rounded-3xl space-y-6 py-6 drop-shadow-xl font-bold text-3xl text-[#515151]">
      <div className="flex flex-row space-x-3 justify-start items-center">
        <Image src={komunitas} alt="komunitas" />
        <h1>Komunitas Saya</h1>
      </div>
      <div className="w-full border border"></div>
      <div className="flex flex-row space-x-3 justify-start items-center">
        <Image src={jelajahi} alt="jelajahi" />
        <h1>Jelajahi Komunitas</h1>
      </div>
    </div>
  );
};

export default Sidebar;
