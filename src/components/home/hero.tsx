import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import hero from "public/hero.png";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="flex flex-col justify-end items-center h-fit">
      <div className="flex flex-col space-y-6 justify-center items-center max-w-[70vw] max-lg:max-w-[80vw] max-md:max-w-[90vw] max-sm:max-w-[95vw]">
        <h1 className="text-6xl font-black text-center max-lg:text-5xl max-md:text-4xl max-sm:text-xl">
          <div>Temukan Pekerjaan Sesuai</div>
          <div>dengan Kebutuhanmu</div>
        </h1>
        <p className="max-lg:text-sm max-md:text-xs">
          Kami menghubungkan kamu dengan perusahaan ramah disabilitas di
          Indonesia
        </p>
        <div className="flex flex-row space-x-2">
          <Input
            className="bg-[#E8E8E8]"
            placeholder="Cari Nama Pekerjaan, Skill, dan Perusahaan"
          ></Input>
          <Input className="bg-[#E8E8E8]" placeholder="Kota / Provinsi"></Input>
          <Button className="">Cari</Button>
        </div>
      </div>
      <Image src={hero} alt="hero" height={633} className="-mb-28"></Image>
      <div className="absolute bg-[#082A98] h-96 w-full bottom-0 -z-10 ">

      </div>
    </div>
  );
};

export default Hero;
