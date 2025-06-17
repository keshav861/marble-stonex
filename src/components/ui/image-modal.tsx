"use client";

import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  mainImage: {
    src: string;
    alt: string;
  };
  additionalImages?: {
    src: string;
    alt: string;
  }[];
}

export function ImageModal({ isOpen, onClose, mainImage, additionalImages = [] }: ImageModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const allImages = [mainImage, ...additionalImages];
  
  // Reset index when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0);
    }
  }, [isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
      } else if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, allImages.length, onClose]);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const currentImage = allImages[currentIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      {/* Close button */}
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
        aria-label="Close modal"
      >
        <X className="h-6 w-6" />
      </button>

      {/* Navigation buttons */}
      {allImages.length > 1 && (
        <>
          <button 
            onClick={() => setCurrentIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1))}
            className="absolute left-4 z-50 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button 
            onClick={() => setCurrentIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1))}
            className="absolute right-4 z-50 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      {/* Main image */}
      <div className="relative w-[90vw] h-[80vh] max-w-5xl">
        <img
          src={currentImage.src}
          alt={currentImage.alt}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Thumbnails */}
      {allImages.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 px-4 overflow-x-auto py-2">
          {allImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`relative w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${index === currentIndex ? 'border-blue-500 scale-110' : 'border-transparent opacity-70 hover:opacity-100'}`}
            >
              <img 
                src={image.src} 
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}