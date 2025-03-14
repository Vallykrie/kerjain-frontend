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
import { useAuth } from "@/lib/auth-context";
import { toast } from "sonner";

const LogInForm = () => {
  const { login, isLoading, error } = useAuth();

  const form = useForm<SignInSchemaType>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values: z.infer<typeof signInSchema>) {
    try {
      await login(values);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      toast.error(`Failed to create account: ${errorMessage}`);
    }
  }

  // Show error from auth context if present
  React.useEffect(() => {
    if (error) {
      toast.error(error.message || "Login failed. Please try again.");
    }
  }, [error]);

  return (
    <div className="flex justify-center items-center bg-[#FEFBA7] outline shadow p-8 rounded-xl drop-shadow-lg gap-8 max-[500px]:p-4 max-[500px]:gap-4 ">
      <div className="drop-shadow-lg max-lg:hidden">
        <Image
          src={Login}
          alt="Hello! Are you ready to grow together in an inclusive workplace?"
          height={500}
          style={{ width: "500px" }}
        />
      </div>
      <div className="flex justify-center items-center w-[500px] flex-col max-lg:w-11/12">
        <div className="mb-12 w-full flex justify-center items-center flex-col space-y-4">
          <h1 className="font-extrabold text-5xl max-[500px]:text-3xl">Log In</h1>
          <p className="text-lg  max-[500px]:text-sm max-[400px]:text-xs">
            Belum punya akun?&nbsp;
            <Link href={"/signup"} className="underline">
              Daftar sekarang!
            </Link>
          </p>
        </div>
        <div className="w-full text-[#515151] max-[500px]:text-sm">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-16 max-[500px]:space-y-8">
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
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Log In"}
                </Button>
                <Image src={seperator} alt="or"></Image>
                <Button
                  variant="default"
                  className="w-full bg-white text-black rounded-xl h-12 font-semibold text-xl"
                  type="button"
                  disabled={isLoading}
                  onClick={() => {
                    toast.info("Google login not implemented");
                  }}
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
