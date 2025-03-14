"use client";

import React from "react";
import { useAuth } from "@/lib/auth-context";

type LogoutButtonProps = {
  className?: string;
};

export function LogoutButton({ className = "" }: LogoutButtonProps) {
  const { logout, isLoading } = useAuth();

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    await logout();
  };

  return (
    <button 
      onClick={handleLogout} 
      disabled={isLoading}
      className={`w-full text-left ${className}`}
    >
      {isLoading ? "Logging out..." : "Logout"}
    </button>
  );
}