"use client";

import { Community } from "@/lib/types/komunitas";
import CommunityCard from "@/components/komunitas/komunitas-card";
import VoiceSearch from "@/components/speech-recognition";
import { Users, User } from "lucide-react";
import Navbar from "@/components/navbar/navbar";

export default function Home() {
  const communities: Community[] = [
    {
      id: "tuna-rungu-indonesia",
      name: "Tuna Rungu Indonesia",
      followers: 12500,
      logoUrl: "https://via.placeholder.com/80/0D6EFD/FFFFFF?text=TR",
    },
    {
      id: "tuna-daksa-indonesia",
      name: "Tuna Daksa Indonesia",
      followers: 22000,
      logoUrl: "https://via.placeholder.com/80/8A2BE2/FFFFFF?text=TD",
    },
    {
      id: "sehat-mental-indonesia",
      name: "Sehat Mental Indonesia",
      followers: 35000,
      logoUrl: "https://via.placeholder.com/80/3498DB/FFFFFF?text=SM",
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="flex flex-row justify-center max-md:flex-col px-4 py-6 space-x-4">
        {/* Sidebar Navigation */}
        <div className="flex flex-col gap-2 mb-6">
          <div className="flex items-center gap-3 p-4 rounded-lg border border-gray-200">
            <Users size={24} className="text-gray-700" />
            <span className="font-bold text-gray-800 text-lg">
              Komunitas Saya
            </span>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-lg border border-gray-200">
            <User size={24} className="text-gray-700" />
            <span className="font-bold text-gray-800 text-lg">
              Jelajahi Komunitas
            </span>
          </div>
        </div>
        <div>
          {/* Search Bar */}
          <div className="mb-6">
            <VoiceSearch />
          </div>

          {/* Communities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {communities.map((community) => (
              <CommunityCard key={community.id} community={community} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
