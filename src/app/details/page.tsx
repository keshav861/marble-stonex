
"use client";

import { useState, useEffect } from 'react';
import type { ProductItem } from '@/types';
import ProductCard from '@/components/ui/ProductCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const PRODUCTS_KEY = 'siteProducts'; // Same key as used in admin page

export default function DetailsPage() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedProducts = localStorage.getItem(PRODUCTS_KEY);
      if (storedProducts) {
        setProducts(JSON.parse(storedProducts));
      } else {
        setProducts([]); // Initialize with empty array if nothing in localStorage
      }
    } catch (error) {
      console.error("Failed to parse products from localStorage", error);
      setProducts([]); // Fallback to empty on error
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-lg text-muted-foreground">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-headline font-bold text-center sm:text-left">All Our Products</h1>
        <Button asChild>
          <Link href="/admin">Manage Products</Link>
        </Button>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">No Products Available Yet</h2>
          <p className="text-muted-foreground mb-6">
            Please check back soon, or visit the admin panel to add new products.
          </p>
          <Button asChild>
            <Link href="/admin">Go to Admin Panel</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
