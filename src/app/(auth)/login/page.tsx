import React from "react";
import LogInForm from "@/components/auth/log-in-form";
import Navbar from "@/components/navbar/navbar";

const Login = () => {
  return (
    <div className="bg-[#FFFEE6] relative h-screen  overflow-hidden">
      <div className="absolute w-[120vw] h-[80vh] -left-[10vw] -top-[30vh] bg-[#B2BDDF] rounded-[50%]">
      </div>
      <Navbar />
      <div className="flex justify-center items-center h-[calc(100vh-160px)]  max-lg:px-4 lg:px-10">
        <LogInForm />
      </div>
    </div>
  );
};

export default Login;
