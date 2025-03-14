"use client";

import Image, { StaticImageData } from 'next/image';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { CalendarIcon, TagIcon } from 'lucide-react';
import { cn } from "@/lib/utils";

export type BootcampType = {
  id: string;
  title: string;
  imageUrl: StaticImageData;
  startDate: string;
  endDate: string;
  price: number;
  originalPrice?: number;
  detailUrl: string;
};

interface BootcampCardProps {
  bootcamp: BootcampType;
  className?: string;
}

export function BootcampCard({ bootcamp, className }: BootcampCardProps) {
  const {
    title,
    imageUrl,
    startDate,
    endDate,
    price,
    originalPrice,
    detailUrl
  } = bootcamp;

  const formatPrice = (price: number) => {
    return `Rp ${price.toLocaleString('id-ID')}`;
  };

  return (
    <Card className={cn("overflow-hidden transition-all duration-300 hover:shadow-lg", className)}>
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      
      <CardHeader className="py-4">
        <h3 className="text-xl font-bold tracking-tight uppercase">{title}</h3>
      </CardHeader>
      
      <CardContent className="space-y-3 pb-4">
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-600">
            {startDate} - {endDate}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <TagIcon className="h-4 w-4 text-gray-500" />
          <div className="flex items-center gap-2">
            <span className="font-semibold">{formatPrice(price)}</span>
            {originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(originalPrice)}
              </span>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pb-6 justify-end">
        <a 
          href={detailUrl}
          className="bg-[#FCF300] hover:bg-yellow-300 text-black font-semibold px-6 py-2 rounded-md transition-colors duration-300 text-center inline-block"
        >
          Lihat Detail
        </a>
      </CardFooter>
    </Card>
  );
}