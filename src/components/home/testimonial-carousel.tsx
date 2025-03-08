"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Testimonial } from "@/types/home";

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  autoSlideInterval?: number;
  showArrow?: boolean;
  showDot?: boolean;
}

const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({
  testimonials,
  autoSlideInterval = 5000,
  showArrow: showControls = true,
  showDot: showIndicators = true,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (autoSlideInterval > 0) {
      const interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }, autoSlideInterval);

      return () => clearInterval(interval);
    }
  }, [testimonials.length, autoSlideInterval]);

  const handlePrevious = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="relative h-96 w-full">
      <div className="relative h-full w-full overflow-hidden flex items-center justify-center">
        {testimonials.map((testimonial, index) => {
          let position = index - activeIndex;
          if (position < -1) position += testimonials.length;
          if (position > 1) position -= testimonials.length;

          const zIndex =
            position === 0 ? 30 : position === -1 || position === 1 ? 20 : 10;

          const opacity =
            position === 0 ? 1 : position === -1 || position === 1 ? 0.7 : 0.0;

          let transform = "";
          if (position === 0) {
            transform = "scale(1) translateX(0)";
          } else if (position === 1) {
            transform = "scale(0.85) translateX(50%)";
          } else if (position === -1) {
            transform = "scale(0.85) translateX(-50%)";
          } else if (position === 2 || position === -2) {
            transform = "scale(0.85) translateX(0)";
            return null;
          } else {
            return null;
          }

          return (
            <Card
              key={testimonial.id}
              className="absolute w-full h-[500] max-w-xl top-0 -translate-x-1/2 bg-white p-4 shadow-lg rounded-lg transition-all duration-500 ease-in-out"
              style={{
                zIndex,
                opacity,
                transform,
              }}
            >
              <CardContent className="flex flex-col items-center pt-6 text-center">
                <div className="w-20 h-20 rounded-full overflow-hidden mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {testimonial.name}
                </h3>
                <p className="text-gray-700 mb-4">{testimonial.quote}</p>
                <div className="flex">
                  {[...Array(5)].map((_, index) => (
                    <span key={index} className="text-2xl text-yellow-400">
                      {index < testimonial.rating ? "★" : "☆"}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {showControls && (
        <div className="absolute w-full top-1/2 -translate-y-1/2 flex justify-between px-4 z-40">
          <Button
            onClick={handlePrevious}
            variant="outline"
            size="icon"
            className="rounded-full bg-white shadow-md hover:bg-gray-100"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            onClick={handleNext}
            variant="outline"
            size="icon"
            className="rounded-full bg-white shadow-md hover:bg-gray-100"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      )}

      {/* Dots navigation */}
      {showIndicators && (
        <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2 z-40">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                activeIndex === index ? "bg-blue-600 w-6" : "bg-blue-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const exampleTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "Rino Andrian",
    avatar: "https://placehold.co/100x100",
    quote:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum reiciendis ex dignissimos consectetur odit, totam illo hic dolorem officia blanditiis minus, quia natus eum fuga recusandae soluta labore tempore? Minima.",
    rating: 5,
  },
  {
    id: 2,
    name: "Maya Wijaya",
    avatar: "https://placehold.co/100x100",
    quote:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum reiciendis ex dignissimos consectetur odit, totam illo hic dolorem officia blanditiis minus, quia natus eum fuga recusandae soluta labore tempore? Minima.",
    rating: 5,
  },
  {
    id: 3,
    name: "Budi Santoso",
    avatar: "https://placehold.co/100x100",
    quote:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum reiciendis ex dignissimos consectetur odit, totam illo hic dolorem officia blanditiis minus, quia natus eum fuga recusandae soluta labore tempore? Minima.",
    rating: 4,
  },
  {
    id: 4,
    name: "Anita Pratiwi",
    avatar: "https://placehold.co/100x100",
    quote:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum reiciendis ex dignissimos consectetur odit, totam illo hic dolorem officia blanditiis minus, quia natus eum fuga recusandae soluta labore tempore? Minima.",
    rating: 5,
  },
];

export default TestimonialCarousel;
