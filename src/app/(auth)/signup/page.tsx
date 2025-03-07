import React from "react";
import SignUpForm from "@/components/auth/sign-up-form";
import Navbar from "@/components/navbar/navbar";
import decoration1 from "public/signup.svg";
import Image from "next/image";

const Signup = () => {
  return (
    <div className="bg-[#FFFEE6] relative">
      <div className="absolute top-0 fit w-full h-full">
        <Image src={decoration1} alt="" className="w-full" />
      </div>
      <Navbar />
      <div className="flex justify-center items-center h-[calc(100vh-160px)]">
        <SignUpForm />
      </div>
    </div>
  );
};

export default Signup;
