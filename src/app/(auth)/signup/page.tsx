import React from "react";
import SignUpForm from "@/components/auth/sign-up-form";
import Navbar from "@/components/navbar/navbar";

const Signup = () => {
  return (
    <div className="bg-[#FFFEE6] relative h-screen overflow-hidden">
      <div>
        <div className="absolute w-[80vw] h-[120vh] bg-[#B2BDDF] rounded-[50%] -left-[30vw] -top-[10vh]"></div>
        <div className="absolute w-[80vw] h-[120vh] bg-[#B2BDDF] rounded-[50%] -right-[30vw] -top-[10vh]"></div>
      </div>
      <Navbar />
      <div className="flex justify-center items-center h-[calc(100vh-160px)]  max-lg:px-4 lg:px-10">
        <SignUpForm />
      </div>
    </div>
  );
};

export default Signup;
