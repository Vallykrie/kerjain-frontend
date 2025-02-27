'use client';

import React from "react";
import Logo from "./logo";
import DesktopNavLinks from "./desktop-nav";
import MobileNav from "./mobile-nav";

const Navbar: React.FC = () => {
  return (
    <div className="p-4 px-20 z-50 max-md:px-4 max-md:top-0 max-md:static sticky">
      <div className="container mx-auto flex justify-between mb-3">
        <Logo />
        <DesktopNavLinks />
        <MobileNav />
      </div>
    </div>
  );
};

export default Navbar;