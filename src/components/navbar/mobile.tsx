"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { Squash as Hamburger } from "hamburger-react";
import { AnimatePresence, motion } from "framer-motion";
import { useClickAway } from "react-use";
import { navLinks, NavLink } from "./data";
import { useAuth } from "@/lib/auth-context";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useRouter } from "next/navigation";

const MobileNav: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [isOpen, setOpen] = useState(false);
  const ref = useRef(null);
  const router = useRouter();

  useClickAway(ref, () => setOpen(false));

  // Function to get user initials for avatar fallback
  const getUserInitials = () => {
    if (!user || !user.name) return "U";

    const names = user.name.split(" ");
    if (names.length === 1) return names[0].charAt(0).toUpperCase();

    return (
      names[0].charAt(0) + names[names.length - 1].charAt(0)
    ).toUpperCase();
  };

  const handleLogout = async () => {
    setOpen(false);
    await logout();
  };

  const navigateTo = (path: string) => {
    setOpen(false);
    router.push(path);
  };

  return (
    <div ref={ref} className="hidden max-lg:block">
      <div className="flex items-center justify-end h-full">
        {isAuthenticated ? (
          <div className="flex items-center gap-2 mr-2">
            <Hamburger toggled={isOpen} size={20} toggle={setOpen} />
          </div>
        ) : (
          <Hamburger toggled={isOpen} size={25} toggle={setOpen} />
        )}
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-6 absolute right-6 top-[3.5rem] p-5 drop-shadow-lg bg-white z-50 rounded-lg"
          >
            {isAuthenticated && (
              <div className="mb-4 p-4 bg-white bg-opacity-50 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Avatar>
                    <AvatarImage
                      src={"https://placehold.co/100x100"}
                      alt="avatar"
                    />
                    <AvatarFallback>{getUserInitials()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{user?.name}</p>
                    <p className="text-sm text-gray-600">{user?.email}</p>
                  </div>
                </div>
              </div>
            )}
            <ul className="grid gap-2">
              {/* Main navigation links */}
              {navLinks.map((route: NavLink, idx: number) => (
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
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-start w-full p-5 rounded-xl bg-transparent hover:bg-black hover:bg-opacity-10 transition-all duration-300 ease-in-out"
                    href={route.href}
                  >
                    <span className="flex gap-1 text-lg">{route.title}</span>
                  </Link>
                </motion.li>
              ))}

              {/* Auth-specific links */}
              {isAuthenticated ? (
                <>
                  <motion.li
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 100,
                      damping: 20,
                      delay: 0.1 + navLinks.length / 10,
                    }}
                    className="w-full p-[0.08rem] rounded-xl"
                  >
                    <button
                      onClick={() => navigateTo("/profile")}
                      className="flex items-center justify-start w-full p-5 rounded-xl bg-transparent hover:bg-black hover:bg-opacity-10 transition-all duration-300 ease-in-out"
                    >
                      <span className="flex gap-1 text-lg">Profile</span>
                    </button>
                  </motion.li>
                  <motion.li
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 100,
                      damping: 20,
                      delay: 0.1 + (navLinks.length + 1) / 10,
                    }}
                    className="w-full p-[0.08rem] rounded-xl"
                  >
                    <button
                      onClick={handleLogout}
                      className="flex items-center justify-start w-full p-5 rounded-xl bg-transparent hover:bg-black hover:bg-opacity-10 transition-all duration-300 ease-in-out"
                    >
                      <span className="flex gap-1 text-lg">Log Out</span>
                    </button>
                  </motion.li>
                </>
              ) : (
                <>
                  <motion.li
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 100,
                      damping: 20,
                      delay: 0.1 + navLinks.length / 10,
                    }}
                    className="w-full p-[0.08rem] rounded-xl"
                  >
                    <Link
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-start w-full p-5 rounded-xl bg-transparent hover:bg-black hover:bg-opacity-10 transition-all duration-300 ease-in-out"
                      href="/login"
                    >
                      <span className="flex gap-1 text-lg">Log In</span>
                    </Link>
                  </motion.li>
                  <motion.li
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 100,
                      damping: 20,
                      delay: 0.1 + (navLinks.length + 1) / 10,
                    }}
                    className="w-full p-[0.08rem] rounded-xl"
                  >
                    <Link
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-start w-full p-5 rounded-xl bg-transparent hover:bg-black hover:bg-opacity-10 transition-all duration-300 ease-in-out"
                      href="/signup"
                    >
                      <span className="flex gap-1 text-lg">Sign Up</span>
                    </Link>
                  </motion.li>
                </>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileNav;
