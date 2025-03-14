"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import decoration1 from "public/ulerVertikal.svg";
import Image from "next/image";
import decoration2 from "public/ulerHorizontal1.svg";
import photo from "public/cardPhoto.png";

const Layanan = () => {
  return (
    <div className="bg-white flex relative flex-col justify-start items-center min-h-screen px-32 py-16 space-y-20 max-lg:px-4">
      <div className="absolute top-0 left-5 h-1/2 max-md:hidden">
        <Image src={decoration1} alt=""></Image>
      </div>
      <div className="absolute bottom-0 right-0 max-md:hidden">
        <Image src={decoration2} alt=""></Image>
      </div>
      <h1 className="text-6xl font-black text-center max-lg:text-5xl max-md:text-4xl max-sm:text-3xl text-[#082A98] z-10">
        Layanan KerjaIn
      </h1>
      <div className="flex flex-row space-x-10 z-10 max-lg:flex-col max-lg:space-x-0 max-lg:space-y-10">
        <Card className="w-[400px] flex items-center justify-center flex-col max-[400px]:w-[300px]  max-lg:w-[400px] max-xl:w-[300px]">
          <CardHeader>
            <CardTitle className="flex items-center justify-center text-xl">
              WorkIn
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Image src={photo} alt="photo"></Image>
          </CardContent>
          <CardFooter>
            <p className="text-center max-lg:text-sm max-md:text-xs">
              KerjaIn memberikan fitur edukasi inklusif yang memungkinkan teman
              disabilitas memilih program pelatihan sesuai minat untuk
              meningkatkan skill dan juga peluang kerja.
            </p>
          </CardFooter>
        </Card>
        <Card className="w-[400px] flex items-center justify-center flex-col max-[400px]:w-[300px] max-xl:w-[300px] max-lg:w-[400px]">
          <CardHeader>
            <CardTitle className="flex items-center justify-center text-xl">
              CommIn
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Image src={photo} alt="photo"></Image>
          </CardContent>
          <CardFooter>
            <p className="text-center max-lg:text-sm max-md:text-xs">
              KerjaIn memberikan fitur edukasi inklusif yang memungkinkan teman
              disabilitas memilih program pelatihan sesuai minat untuk
              meningkatkan skill dan juga peluang kerja.
            </p>
          </CardFooter>
        </Card>
        <Card className="w-[400px] flex items-center justify-center flex-col max-[400px]:w-[300px]  max-lg:w-[400px] max-xl:w-[300px]">
          <CardHeader>
            <CardTitle className="flex items-center justify-center text-xl">
              EduIn
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Image src={photo} alt="photo"></Image>
          </CardContent>
          <CardFooter>
            <p className="text-center max-lg:text-sm max-md:text-xs">
              KerjaIn memberikan fitur edukasi inklusif yang memungkinkan teman
              disabilitas memilih program pelatihan sesuai minat untuk
              meningkatkan skill dan juga peluang kerja.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Layanan;
