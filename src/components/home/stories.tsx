import React from "react";
import Image from "next/image";
import decoration1 from "public/ulerHorizontal3.svg";
import TestimonialSlider from "./story-slider";

const Stories = () => {
  return (
    <div className="bg-white flex relative flex-col justify-start items-center min-h-screen px-32 py-16 space-y-20 max-lg:p-4">
      <Image src={decoration1} alt="" className="max-md:hidden absolute top-0 left-0"></Image>
      <h1 className="text-6xl font-black text-center max-lg:text-5xl max-md:text-4xl max-sm:text-3xl text-[#082A98] z-10">
        Successful Stories
      </h1>
      <div className="w-full flex justify-center z-10">
        <TestimonialSlider />
      </div>
    </div>
  );
};

export default Stories;
