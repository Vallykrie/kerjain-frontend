'use client';

import React from "react";
import Link from "next/link";
import { navLinks} from "./data";

const DesktopNavLinks: React.FC = () => {
  const linkClass = "hover:drop-shadow-[0_0px_10px_rgba(255,255,255,1)]";

  return (
    <div className="flex justify-between w-2/3 items-center font-jockey text-xl font-normal max-lg:hidden">
      {navLinks.map(({ href, title }) => (
        <Link key={href} href={href} className={linkClass}>
          {title}
        </Link>
      ))}
    </div>
  );
};

export default DesktopNavLinks;
