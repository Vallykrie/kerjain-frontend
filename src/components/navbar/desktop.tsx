"use client";

import React from "react";
import Link from "next/link";
import { navLinks } from "./data";
import { Button } from "../ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogoutButton } from "../auth/logout-button";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";

const DesktopNav = () => {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  const getUserInitials = () => {
    if (!user || !user.name) return "U";
    const names = user.name.split(" ");
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (
      names[0].charAt(0) + names[names.length - 1].charAt(0)
    ).toUpperCase();
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="flex justify-center w-fit h-fit py-2 px-16 rounded-full items-center text-xl font-normal max-lg:hidden space-x-12 bg-white drop-shadow-[0_0_12px_rgba(0,0,0,0.25)]">
          {navLinks.map(({ href, title }) => (
            <Link
              key={href}
              href={href}
              className="hover:drop-shadow-[0_0px_10px_rgba(255,255,255,1)]"
            >
              {title}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex-none justify-center items-center flex space-x-6 max-lg:hidden">
        {isAuthenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="w-[140px]">
                <Avatar className="cursor-pointer h-16 w-16">
                  <AvatarImage
                    src={"https://placehold.co/100x100"}
                    alt="avatar"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://placehold.co/100x100";
                    }}
                  />
                  <AvatarFallback>{getUserInitials()}</AvatarFallback>
                </Avatar>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuLabel className="font-normal text-sm text-gray-500">
                {user?.name}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => router.push("/profile")}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogoutButton />
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
            <Link href="/signup">
              <Button
                variant="outline"
                className="outline-[#05195B] outline text-[#05195B] bg-white rounded-lg text-xl font-bold"
              >
                Sign Up
              </Button>
            </Link>
            <Link href="/login">
              <Button
                variant="default"
                className="bg-[#072689] outline-[#05195B] outline rounded-lg text-xl font-bold"
              >
                Log In
              </Button>
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default DesktopNav;
