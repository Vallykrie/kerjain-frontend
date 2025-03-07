"use client";

import React from "react";
import Signup from "public/signup.png";
import Image from "next/image";
import Link from "next/link";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import seperator from "public/or-seperator.svg";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { signUpSchema, SignUpSchemaType } from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { redirect } from "next/navigation";

const SignUpForm = () => {
  const form = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      nama: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof signUpSchema>) {
    toast(`You submitted: ${JSON.stringify(values)}`);
    redirect("/");
  }

  return (
    <div className="flex justify-center items-center bg-[#FEFBA7] outline shadow p-8 rounded-xl drop-shadow-lg gap-8">
      <div className="drop-shadow-lg max-lg:hidden">
        <Image
          src={Signup}
          alt="Hello! Are you ready to grow together in an inclusive workplace?"
          height={500}
          style={{ width: "500px" }}
        />
      </div>
      <div className="flex justify-center items-center w-[500px] flex-col">
        <div className="mb-4 w-full flex justify-center items-center flex-col space-y-4">
          <h1 className="font-extrabold text-5xl">Sign Up</h1>
          <p className="text-lg">
            Sudah punya akun?&nbsp;
            <Link href={"/login"} className="underline">
              Log In sekarang!
            </Link>
          </p>
        </div>
        <div className="w-full text-[#515151]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div>
                <FormField
                  control={form.control}
                  name="nama"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Lengkap</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder=""
                          {...field}
                          className="bg-[#EBEEFB] outline"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder=""
                          {...field}
                          className="bg-[#EBEEFB] outline"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          type="username"
                          placeholder=""
                          {...field}
                          className="bg-[#EBEEFB] outline"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kata Sandi</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder=""
                          {...field}
                          className="bg-[#EBEEFB] outline"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Konfirmasi Kata Sandi</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder=""
                          {...field}
                          className="bg-[#EBEEFB] outline"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2 w-full">
                <Button
                  type="submit"
                  variant="default"
                  className="w-full bg-blue_primary text-white rounded-xl h-12 font-semibold text-xl"
                >
                  Sign Up
                </Button>
                <Image src={seperator} alt="or"></Image>
                <Button
                  type="submit"
                  variant="default"
                  className="w-full bg-white text-black rounded-xl h-12 font-semibold text-xl"
                >
                  Sign In with Google
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
