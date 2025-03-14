import React from "react";
import Image from "next/image";
import decoration1 from "public/ulerHorizontal2.svg";
import TestimonialCarousel, { exampleTestimonials } from "./testimonial-carousel";

const Testimoni = () => {
  return (
    <div className="bg-[#FFFEE6] flex relative flex-col justify-start items-center min-h-screen px-32 py-16 space-y-20 max-lg:px-4">
      <Image
        src={decoration1}
        alt=""
        className="absolute top-5 right-0 max-md:hidden"
      ></Image>
      <Image
        src={decoration1}
        alt=""
        className="absolute bottom-5 left-0 scale-x-[-1] max-md:hidden"
      ></Image>
      <h1 className="text-6xl font-black text-center max-lg:text-5xl max-md:text-4xl max-sm:text-3xl text-[#082A98] z-10">
        <div>What People are Saying</div>
        <div>about KerjaIn</div>
      </h1>
      <div className="w-full flex justify-center z-10">
        <TestimonialCarousel testimonials={exampleTestimonials} showArrow={false}/>
      </div>
    </div>
  );
};

export default Testimoni;
