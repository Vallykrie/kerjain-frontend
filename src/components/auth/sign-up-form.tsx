import React from "react";
import Signup from "public/signup.png";
import Image from "next/image";
import Link from "next/link";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import seperator from "public/or-seperator.svg";

const SignUpForm = () => {
  return (
    <div className="flex justify-center items-center bg-[#DADFF0] outline shadow p-8 rounded-xl drop-shadow-lg gap-8">
      <div className="drop-shadow-lg">
        <Image
          src={Signup}
          alt="Hello! Are you ready to grow together in an inclusive workplace?"
          height={500}
          style={{ width: "500px" }}
        />
      </div>
      <div className="flex justify-center items-center w-[500px] flex-col">
        <div className="mb-12 w-full flex justify-center items-center flex-col">
          <h1 className="font-extrabold text-3xl">Create an Account</h1>
          <p className="text-sm">
            Sudah punya akun?&nbsp;
            <Link href={"/login"} className="underline">
              Log In sekarang!
            </Link>
          </p>
        </div>
        <div className="w-full text-[#515151] space-y-2">
          <div>
            <p>Nama Lengkap</p>
            <Input type="text" className="bg-white outline" />
          </div>
          <div>
            <p>Email</p>
            <Input type="text" className="bg-white outline" />
          </div>
          <div>
            <p>Username</p>
            <Input type="text" className="bg-white outline" />
          </div>
          <div>
            <p>Kata Sandi</p>
            <Input type="text" className="bg-white outline" />
          </div>
          <div>
            <p>Konfirmasi Kata Sandi</p>
            <Input type="text" className="bg-white outline" />
          </div>
        </div>
        <div className="space-y-6 mt-6 w-full">
            <Button variant="default" className="w-full bg-[#072689] rounded-full">Sign Up</Button>
            <Image src={seperator} alt="or"></Image>
            <Button variant="default" className="w-full bg-white text-black rounded-full">Sign In with Google</Button>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
