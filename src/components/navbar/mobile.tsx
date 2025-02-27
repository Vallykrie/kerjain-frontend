"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { Squash as Hamburger } from "hamburger-react";
import { AnimatePresence, motion } from "framer-motion";
import { useClickAway } from "react-use";
import { navLinksMobile, NavLink } from "./data";

const MobileNav: React.FC = () => {
  const [isOpen, setOpen] = useState(false);
  const ref = useRef(null);
  useClickAway(ref, () => setOpen(false));

  return (
    <div ref={ref} className="hidden max-lg:block">
      <div className="flex items-center justify-end h-full">
        <Hamburger toggled={isOpen} size={25} toggle={setOpen} />
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-6 absolute left-0 right-0 top-[3.5rem] p-5 drop-shadow-lg bg-[#FDFAE9]"
          >
            <ul className="grid gap-2">
              {navLinksMobile.map((route: NavLink, idx: number) => {
                return (
                  <motion.li
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 100,
                      damping: 20,
                      delay: 0.1 + idx / 10,
                    }}
                    key={route.title}
                    className="w-full p-[0.08rem] rounded-xl"
                  >
                    <Link
                      onClick={() => setOpen((prev) => !prev)}
                      className={
                        "flex items-center justify-start w-full p-5 rounded-xl bg-transparent hover:bg-black hover:bg-opacity-10 transition-all duration-300 ease-in-out"
                      }
                      href={route.href}
                    >
                      <span className="flex gap-1 text-lg">{route.title}</span>
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileNav;
