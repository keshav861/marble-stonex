"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ImageModal } from '@/components/ui/image-modal';
import type { ProductItem } from '@/types';

interface ProductCardProps {
  product: ProductItem;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Prepare main image in the format expected by ImageModal
  const mainImage = {
    src: product.imageSrc,
    alt: product.imageAlt || product.title
  };

  return (
    <>
      <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 ease-in-out group h-full flex flex-col hover:scale-105 rounded-2xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="p-0 relative">
          <div 
            className="aspect-[4/3] relative w-full rounded-t-2xl overflow-hidden cursor-pointer" 
            onClick={() => setIsModalOpen(true)}
          >
            <Image
              src={product.imageSrc}
              alt={product.imageAlt}
              data-ai-hint={product.aiHint}
              fill
              style={{ objectFit: 'cover' }}
              className="transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          {product.isTopSelling && (
            <Badge variant="destructive" className="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg px-3 py-1 rounded-full font-medium">
              Top Selling
            </Badge>
          )}
        </CardHeader>
        <CardContent className="p-6 flex-grow flex flex-col">
          <Badge variant="secondary" className="mb-2 self-start bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-full px-3 py-1">{product.category}</Badge>
          <CardTitle className="text-xl font-headline mb-2 text-foreground bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">{product.title}</CardTitle>
          <CardDescription className="text-muted-foreground text-sm flex-grow mb-5 leading-relaxed">{product.description}</CardDescription>
          <button 
            className="mt-auto w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white hover:from-blue-700 hover:to-indigo-800 px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 transform hover:translate-y-[-2px] shadow-md hover:shadow-lg"
            onClick={() => setIsModalOpen(true)}
          >
            View Details
          </button>
        </CardContent>
      </Card>

      {/* Image Modal */}
      <ImageModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        mainImage={mainImage}
        additionalImages={product.additionalImages}
      />
    </>
  );
}
