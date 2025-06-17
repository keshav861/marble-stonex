
import HeroSlider from '@/components/sections/HeroSlider';
import CoreServices from '@/components/sections/CoreServices';
import ProductShowcase from '@/components/sections/ProductShowcase';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <CoreServices />
      <ProductShowcase />
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-headline font-semibold text-center mb-6 text-foreground">
                Ready to Transform Your Space?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Contact us today for a consultation or visit our showroom to experience the elegance of natural stone.
            </p>
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/contact">Get In Touch</Link>
            </Button>
        </div>
      </section>
    </>
  );
}
