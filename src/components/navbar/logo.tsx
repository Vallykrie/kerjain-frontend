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
        width={100}
        height={50}
        className="max-h-10 max-md:max-h-7 mt-3"
      />  
    </Link>
  );
};

export default Logo;