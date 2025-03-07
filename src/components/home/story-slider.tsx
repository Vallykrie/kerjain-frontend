'use client'

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { Story } from '@/types/home';

const testimonials: Story[] = [
  {
    id: 1,
    name: 'Andi Pratama',
    age: 28,
    position: 'Petugas Call Center',
    company: 'Bank Mandiri',
    image: 'https://placehold.co/100x100',
    quote: '"Saya pernah merasa peluang kerja bagi penyandang disabilitas sangat terbatas, hingga saya menemukan KerjaIn. Dengan fitur pencarian inklusifnya, saya akhirnya mendapatkan kesempatan bekerja sebagai petugas call center di gedung call center Bank Mandiri, Tangerang Selatan. Rasanya seperti mimpi yang menjadi kenyataan! Lingkungan kerja di sini sangat mendukung, membuat saya merasa dihargai dan mampu berkembang. Lebih dari sekadar pekerjaan, ini adalah kesempatan untuk membuktikan bahwa keterbatasan bukanlah penghalang. Tahun ini, Bank Mandiri menargetkan menerima lebih dari 100 penyandang disabilitas—semoga semakin banyak teman-teman yang merasakan peluang seperti saya!"'
  },
  {
    id: 2,
    name: 'Maya Wijaya',
    age: 32,
    position: 'UI/UX Designer',
    company: 'TechNova',
    image: 'https://placehold.co/100x100',
    quote: '"Sebagai penyandang disabilitas, saya sering menghadapi stereotip tentang kemampuan saya dalam industri teknologi. KerjaIn membuka pintu bagi saya untuk bergabung dengan TechNova, perusahaan yang benar-benar menghargai perspektif unik saya. Sekarang saya memimpin tim desain inklusif dan telah membantu mengembangkan produk yang dapat diakses oleh semua orang. Saya bangga menjadi bagian dari perubahan ini dan berharap lebih banyak perusahaan mengikuti jejak ini."'
  },
  {
    id: 3,
    name: 'Budi Santoso',
    age: 26,
    position: 'Accounting Staff',
    company: 'Pertamina',
    image: 'https://placehold.co/100x100',
    quote: '"KerjaIn membantu saya menemukan posisi di Pertamina yang sesuai dengan keahlian saya di bidang akuntansi. Mereka tidak hanya membantu dalam proses perekrutan, tetapi juga mempersiapkan saya untuk wawancara dan memberikan dukungan untuk adaptasi di tempat kerja. Saya sangat berterima kasih atas kesempatan ini dan mendorong penyandang disabilitas lainnya untuk tidak ragu mencari peluang karier yang mereka inginkan."'
  }
];

export default function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center gap-6">
        {/* Testimonial Photo with Circle Crop */}
        <div className="relative shrink-0">
          <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-blue-900">
            <img 
              src={currentTestimonial.image} 
              alt={currentTestimonial.name}
              width={256}
              height={256}
              className="object-cover w-full h-full"
              onError={(e) => {
                // Fallback for missing images
                (e.target as HTMLImageElement).src = "https://via.placeholder.com/256";
              }}
            />
          </div>
          
          {/* Name and Position overlay */}
          <div className="absolute bottom-0 left-0 right-0 text-center bg-white bg-opacity-90 py-2 rounded-b-full">
            <h3 className="text-2xl font-bold text-gray-800">{currentTestimonial.name} ({currentTestimonial.age})</h3>
            <p className="text-lg text-gray-600">
              {currentTestimonial.position},<br/>
              {currentTestimonial.company}
            </p>
          </div>
        </div>

        {/* Testimonial Text Bubble */}
        <div className="relative flex-1">
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <p className="text-lg leading-relaxed">
                {currentTestimonial.quote}
              </p>
            </CardContent>
          </Card>
          
          {/* Next Button */}
          <Button 
            onClick={handleNext}
            variant="outline" 
            className="absolute -right-4 top-1/2 transform -translate-y-1/2 rounded-full w-12 h-12 bg-white shadow-md"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}