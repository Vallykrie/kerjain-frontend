"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { NewsItem } from "@/types/home";

const newsItems: NewsItem[] = [
  {
    id: 1,
    title:
      "Penyandang Disabilitas Berhak Dapat Pekerjaan dan Penghasilan yang Layak",
    imageUrl: "https://placehold.co/400x240",
    source: "liputan6.com",
    date: "25/02/2025",
  },
  {
    id: 2,
    title:
      "Menaker: Perkuat Akses Pelatihan dan Penempatan Kerja bagi Disabilitas",
    imageUrl: "https://placehold.co/400x240",
    source: "kemnaker.go.id",
    date: "24/02/2025",
  },
  {
    id: 3,
    title:
      "Wujudkan Gampang Kerja, Pemkot Tangerang Gelar Sosialisasi Penempatan Tenaga Kerja Disabilitas",
    imageUrl: "https://placehold.co/400x240",
    source: "tangerangkota.go.id",
    date: "20/02/2025",
  },
  {
    id: 4,
    title: "UU Cipta Kerja Wajibkan Pengusaha Lindungi Pekerja Disabilitas",
    imageUrl: "https://placehold.co/400x240",
    source: "kompas.com",
    date: "18/02/2025",
  },
  {
    id: 5,
    title: "Kementerian Ketenagakerjaan Adakan Pelatihan Khusus Disabilitas",
    imageUrl: "https://placehold.co/400x240",
    source: "cnnindonesia.com",
    date: "15/02/2025",
  },
  {
    id: 6,
    title: "BLK Jakarta Buka Pendaftaran Khusus Untuk Penyandang Disabilitas",
    imageUrl: "https://placehold.co/400x240",
    source: "jakarta.go.id",
    date: "12/02/2025",
  },
  {
    id: 7,
    title:
      "Program KerjaIn Bantu 500 Penyandang Disabilitas Dapatkan Pekerjaan",
    imageUrl: "https://placehold.co/400x240",
    source: "detik.com",
    date: "10/02/2025",
  },
  {
    id: 8,
    title: "Perusahaan Teknologi Tingkatkan Kuota Pekerja Disabilitas",
    imageUrl: "https://placehold.co/400x240",
    source: "tekno.kompas.com",
    date: "08/02/2025",
  },
  {
    id: 9,
    title:
      "Pemkot Bandung Luncurkan Program Inklusif untuk Tenaga Kerja Disabilitas",
    imageUrl: "https://placehold.co/400x240",
    source: "bandung.go.id",
    date: "05/02/2025",
  },
  {
    id: 10,
    title: "Survei: 60% Penyandang Disabilitas Kesulitan Mendapat Akses Kerja",
    imageUrl: "https://placehold.co/400x240",
    source: "tribunnews.com",
    date: "01/02/2025",
  },
  {
    id: 11,
    title: "Pentingnya Pelatihan Digital untuk Penyandang Disabilitas",
    imageUrl: "https://placehold.co/400x240",
    source: "republika.co.id",
    date: "28/01/2025",
  },
  {
    id: 12,
    title: "Kementerian PPPA Dorong Kesetaraan di Dunia Kerja",
    imageUrl: "https://placehold.co/400x240",
    source: "kemenpppa.go.id",
    date: "25/01/2025",
  },
  {
    id: 13,
    title: "Go-Jek Luncurkan Program Khusus Driver Disabilitas",
    imageUrl: "https://placehold.co/400x240",
    source: "bisnis.com",
    date: "22/01/2025",
  },
  {
    id: 14,
    title: "Diskriminasi Kerja Terhadap Disabilitas Masih Tinggi",
    imageUrl: "https://placehold.co/400x240",
    source: "tempo.co",
    date: "18/01/2025",
  },
];

export default function NewsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemsPerPage = 4;

  // Calculate total number of pages
  const totalPages = Math.ceil(newsItems.length / itemsPerPage);

  // Function to handle dot indicator click
  const handleDotClick = (index: number) => {
    setActiveIndex(index);
  };

  // Function to get the visible news items for the current page
  const getVisibleItems = () => {
    const startIndex = activeIndex * itemsPerPage;
    return newsItems.slice(startIndex, startIndex + itemsPerPage);
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">

      {/* News Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {getVisibleItems().map((item) => (
          <Link href={`/news/${item.id}`} key={item.id}>
            <Card className="overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="relative h-48 w-full">
                <div className="w-full h-full relative">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="object-cover w-full h-full"
                    onError={(e) => {
                      // Fallback for missing images
                      const target = e.target as HTMLImageElement;
                      target.src =
                        "https://via.placeholder.com/400x240?text=News+Image";
                    }}
                  />
                </div>
              </div>

              <CardContent className="p-4">
                <h3 className="font-bold text-sm text-gray-900 mb-2 line-clamp-2 h-10">
                  {item.title}
                </h3>
                <div className="flex justify-between items-center text-xs text-gray-600">
                  <span>{item.source}</span>
                  <span>{item.date}</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Dot Indicators - Dynamic based on data length */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === activeIndex ? "bg-indigo-700" : "bg-gray-300"
              }`}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
