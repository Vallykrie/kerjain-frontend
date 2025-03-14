"use client";

import Filter from "@/components/pekerjaan/sidebar";
import JobCardGrid from "@/components/pekerjaan/job-card";
import VoiceSearch from "@/components/speech-recognition";

export default function JobsPage() {
  return (
    <div>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold mb-6">
            Lowongan Kerja untuk Disabilitas
          </h1>

          {/* Search Bar */}
          <div className="mb-8">
            <VoiceSearch />
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar */}
            <div className="w-full md:w-64 flex-shrink-0">
              <Filter></Filter>
            </div>

            {/* Main Content */}
            <div className="flex-grow">
              <JobCardGrid />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
