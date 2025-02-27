"use client";

import React from "react";
import Link from "next/link";
import { navLinks } from "./data";
import { Button } from "../ui/button";

const DesktopNav: React.FC = () => {
  const linkClass = "hover:drop-shadow-[0_0px_10px_rgba(255,255,255,1)]";

  return (
    <>
      <div className="flex justify-center w-2/3 items-center font-jockey text-xl font-normal max-lg:hidden space-x-12">
        {navLinks.map(({ href, title }) => (
          <Link key={href} href={href} className={linkClass}>
            {title}
          </Link>
        ))}
      </div>
      <div className="flex-none justify-center items-center flex space-x-12 max-lg:hidden">
        <Link href="/login">
          <Button variant="outline" className="outline-[#05195B] outline text-[#05195B] bg-white">Login</Button>
        </Link>
        <Link href="/signup">
          <Button variant="default" className="bg-[#072689]">Sign Up</Button>
        </Link>
      </div>
    </>
  );
};

export default DesktopNav;
