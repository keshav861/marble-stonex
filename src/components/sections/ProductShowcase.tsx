
"use client";

import { useState, useEffect } from 'react';
import ProductCard from '@/components/ui/ProductCard';
import type { ProductItem } from '@/types';
// import { appData } from '@/lib/appData'; // No longer needed for static products

const PRODUCTS_KEY = 'siteProducts'; // Same key as used in admin page

export default function ProductShowcase() {
  const [topSellingProducts, setTopSellingProducts] = useState<ProductItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedProducts = localStorage.getItem(PRODUCTS_KEY);
      if (storedProducts) {
        const allProducts: ProductItem[] = JSON.parse(storedProducts);
        setTopSellingProducts(allProducts.filter(p => p.isTopSelling));
      } else {
        setTopSellingProducts([]);
      }
    } catch (error) {
      console.error("Failed to parse products from localStorage for showcase", error);
      setTopSellingProducts([]);
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <section className="py-16 lg:py-24 bg-secondary/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-headline font-semibold mb-12 text-foreground">
            Our Finest Selections
          </h2>
          <p className="text-muted-foreground">Loading top products...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-slate-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-headline font-semibold text-center mb-12 text-foreground bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
          Our Finest Selections
        </h2>
        {topSellingProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {topSellingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center glass-effect p-12 mx-auto max-w-md">
            <p className="text-muted-foreground text-lg leading-relaxed">
              No top selling products to display at the moment. Explore all products or check back later!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
