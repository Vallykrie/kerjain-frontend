import React from "react";
import LogInForm from "@/components/auth/log-in-form";
import Navbar from "@/components/navbar/navbar";
import Image from "next/image";
import decoration1 from "public/login.svg"

const Login = () => {
  return (
    <div className="bg-[#FFFEE6] relative">
      <div className="absolute top-0 fit w-full h-full">
        <Image src={decoration1} alt="" className="w-full"/>
      </div>
      <Navbar />
      <div className="flex justify-center items-center h-[calc(100vh-160px)]">
        <LogInForm />
      </div>
    </div>
  );
};

export default Login;
