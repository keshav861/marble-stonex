
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { appData } from "@/lib/appData";
import type { ProductCategory } from "@/types";

const stoneCategories: ProductCategory[] = appData.productCategories.map(category => ({
  name: category.name,
  description: category.description,
  types: category.types,
  imageSrc: category.imageSrc || "https://placehold.co/600x400.png", // Use placeholder from data or default
  aiHint: category.aiHint || category.name.toLowerCase().replace(/\s+/g, ' ')
}));

export default function StoneTypesPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-headline font-bold mb-12 text-center">Explore Our Stone Types</h1>
      {stoneCategories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {stoneCategories.map((category) => (
            <Card key={category.name} id={category.name.toLowerCase()} className="overflow-hidden shadow-lg flex flex-col">
              <div className="relative w-full h-64">
                <Image 
                  src={category.imageSrc} 
                  alt={`Sample of ${category.name}`} 
                  data-ai-hint={category.aiHint}
                  fill
                  style={{objectFit: "cover"}}
                />
              </div>
              <CardHeader>
                <CardTitle className="text-3xl font-headline">{category.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground mb-4">{category.description}</p>
                {category.types && category.types.length > 0 && (
                  <>
                    <h3 className="font-semibold text-foreground mb-2">Popular Varieties / Types:</h3>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      {category.types.map(variety => <li key={variety}>{variety}</li>)}
                    </ul>
                  </>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground text-lg">No stone categories available at the moment. Please check back later.</p>
      )}
    </div>
  );
}
