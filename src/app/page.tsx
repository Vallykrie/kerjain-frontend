import React from "react";
import Hero from "@/components/home/hero";
import Navbar from "@/components/navbar/navbar";
import About from "@/components/home/about";
import Layanan from "@/components/home/layanan";
import Testimoni from "@/components/home/testimoni";
import Stories from "@/components/home/stories";
import News from "@/components/home/news";

const Home = () => {
  return (
    <div className="bg-[#B2BDDF]">
      <Navbar></Navbar>
      <Hero />
      <About />
      <Layanan />
      <Testimoni />
      <Stories /> 
      <News />
    </div>
  );
};

export default Home;
