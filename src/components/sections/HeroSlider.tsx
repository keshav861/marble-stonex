"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { SlideItem } from '@/types';
import { cn } from '@/lib/utils';
import { appData } from '@/lib/appData';
import Link from 'next/link';

const slidesData: SlideItem[] = appData.sliderContent.map((slide, index) => ({
  id: slide.id,
  imageSrc: index === 0 ? '/images/marble1.png' :
           index === 1 ? '/images/MARBLE2.jpg' :
           '/images/marble3.webp',
  imageAlt: slide.title,
  aiHint: slide.aiHint,
  heading: slide.title,
  ctaText: slide.buttonText,
  ctaLink: slide.ctaLink,
}));

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slidesData.length);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slidesData.length) % slidesData.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000); 
    return () => clearInterval(timer);
  }, [nextSlide]);

  if (!slidesData.length) {
    return null; 
  }

  return (
    <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden group rounded-2xl mx-auto my-6 shadow-2xl max-w-[98vw]">
      <div
        className="flex transition-transform duration-1000 ease-in-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slidesData.map((slide, idx) => (
          <div key={slide.id} className="relative w-full flex-shrink-0 h-full">
            <Image
              src={slide.imageSrc}
              alt={slide.imageAlt}
              data-ai-hint={slide.aiHint}
              fill
              priority={idx === 0} // Priority for the first image
              style={{ objectFit: 'cover' }}
              className="brightness-[0.6] group-hover:brightness-50 transition-all duration-500 ease-in-out rounded-2xl"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 z-10 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-2xl">
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-headline font-bold text-white mb-8 animate-fade-in drop-shadow-2xl [animation-delay:0.2s] tracking-tight">
                {slide.heading}
              </h2>
              <Button 
                asChild 
                size="lg" 
                className="bg-white/90 hover:bg-white text-gray-900 animate-fade-in [animation-delay:0.5s] transform hover:scale-105 transition-all duration-300 rounded-full px-8 py-3 font-semibold shadow-lg backdrop-blur-sm border border-white/20"
              >
                <Link href={slide.ctaLink}>{slide.ctaText}</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 left-6 transform -translate-y-1/2 z-20 bg-white/10 hover:bg-white/30 text-white border-none opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 rounded-full backdrop-blur-md"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 right-6 transform -translate-y-1/2 z-20 bg-white/10 hover:bg-white/30 text-white border-none opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 rounded-full backdrop-blur-md"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {slidesData.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={cn(
              'h-3 w-3 rounded-full transition-all duration-300 ease-in-out transform hover:scale-125 backdrop-blur-sm',
              currentIndex === index ? 'bg-white scale-125 shadow-lg' : 'bg-white/50 hover:bg-white/80'
            )}
          />
        ))}
      </div>
    </div>
  );
}
