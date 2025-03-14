import React from "react";
import hero from "public/hero.png";
import Image from "next/image";
import VoiceSearch from "../speech-recognition";

const Hero = () => {
  return (
    <div className="flex flex-col justify-end items-center h-fit px-4 text-black">
      <div className="flex flex-col space-y-6 justify-center items-center max-w-[70vw] max-lg:max-w-[80vw] max-md:max-w-[90vw] max-sm:max-w-[95vw]">
        <h1 className="text-6xl font-black text-center max-lg:text-5xl max-md:text-4xl max-sm:text-2xl max-[400px]:text-xl">
          <div>Temukan Pekerjaan Sesuai</div>
          <div>dengan Kebutuhanmu</div>
        </h1>
        <p className="max-lg:text-sm max-md:text-xs text-center" >
          Kami menghubungkan kamu dengan perusahaan ramah disabilitas di
          Indonesia
        </p>
        <VoiceSearch />
      </div>
      <Image src={hero} alt="hero" height={633} className="-mb-14"></Image>
    </div>
  );
};

export default Hero;
