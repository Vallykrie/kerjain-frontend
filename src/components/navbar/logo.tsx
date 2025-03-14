"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/lib/auth-context";

const Logo: React.FC = () => {
  const { isAuthenticated } = useAuth();
  return (
    <Link href="/" className={isAuthenticated ? "" : "w-[250px]"}>
      <Image
        src="/logo1.png"
        alt="logo"
        width={140}
        height={76}
        className="max-md:max-h-9 max-md:max-w-16"
      />  
    </Link>
  );
};

export default Logo;

// max-h-10 max-md:max-h-7 mt-3