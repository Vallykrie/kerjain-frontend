"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const Logo: React.FC = () => {
  return (
    <Link href="/">
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