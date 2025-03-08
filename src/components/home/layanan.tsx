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
    <div className="bg-white flex relative flex-col justify-start items-center h-screen px-32 py-16 space-y-20">
      <div className="absolute top-0 left-5 h-1/2">
        <Image src={decoration1} alt=""></Image>
      </div>
      <div className="absolute bottom-0 right-0">
        <Image src={decoration2} alt=""></Image>
      </div>
      <h1 className="text-6xl font-black text-center max-lg:text-5xl max-md:text-4xl max-sm:text-xl text-[#082A98] z-10">
        Layanan KerjaIn
      </h1>
      <div className="flex flex-row space-x-10 z-10">
        <Card className="w-[400px] flex items-center justify-center flex-col">
          <CardHeader>
            <CardTitle className="flex items-center justify-center text-xl">
              WorkIn
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Image src={photo} alt="photo"></Image>
          </CardContent>
          <CardFooter>
            <p className="text-center">
              KerjaIn memberikan fitur edukasi inklusif yang memungkinkan teman
              disabilitas memilih program pelatihan sesuai minat untuk
              meningkatkan skill dan juga peluang kerja.
            </p>
          </CardFooter>
        </Card>
        <Card className="w-[400px] flex items-center justify-center flex-col">
          <CardHeader>
            <CardTitle className="flex items-center justify-center text-xl">
              CommIn
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Image src={photo} alt="photo"></Image>
          </CardContent>
          <CardFooter>
            <p className="text-center">
              KerjaIn memberikan fitur edukasi inklusif yang memungkinkan teman
              disabilitas memilih program pelatihan sesuai minat untuk
              meningkatkan skill dan juga peluang kerja.
            </p>
          </CardFooter>
        </Card>
        <Card className="w-[400px] flex items-center justify-center flex-col">
          <CardHeader>
            <CardTitle className="flex items-center justify-center text-xl">
              EduIn
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Image src={photo} alt="photo"></Image>
          </CardContent>
          <CardFooter>
            <p className="text-center">
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
