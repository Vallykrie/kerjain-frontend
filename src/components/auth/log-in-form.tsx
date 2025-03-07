"use client";

import React from "react";
import Login from "public/login.png";
import Image from "next/image";
import Link from "next/link";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import seperator from "public/or-seperator.svg";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { signInSchema, SignInSchemaType } from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { redirect } from "next/navigation";

const LogInForm = () => {
  const form = useForm<SignInSchemaType>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  function onSubmit(values: z.infer<typeof signInSchema>) {
    toast(`You submitted: ${JSON.stringify(values)}`);
    redirect("/");
  }

  return (
    <div className="flex justify-center items-center bg-[#FEFBA7] outline shadow p-8 rounded-xl drop-shadow-lg gap-8">
      <div className="drop-shadow-lg max-lg:hidden">
        <Image
          src={Login}
          alt="Hello! Are you ready to grow together in an inclusive workplace?"
          height={500}
          style={{ width: "500px" }}
        />
      </div>
      <div className="flex justify-center items-center w-[500px] flex-col">
        <div className="mb-12 w-full flex justify-center items-center flex-col space-y-4">
          <h1 className="font-extrabold text-5xl">Log In</h1>
          <p className="text-lg">
            Belum punya akun?&nbsp;
            <Link href={"/login"} className="underline">
              Daftar sekarang!
            </Link>
          </p>
        </div>
        <div className="w-full text-[#515151]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-16"> 
              <div className="space-y-2">
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
              </div>

              <div className="space-y-2 w-full">
                <Button
                  variant="default"
                  className="w-full bg-blue_primary text-white rounded-xl h-12 font-semibold text-xl"
                  type="submit"
                >
                  Log In
                </Button>
                <Image src={seperator} alt="or"></Image>
                <Button
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

export default LogInForm;
