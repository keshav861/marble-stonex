
import React from 'react';
import { Gem, IndianRupee, Search, Settings, LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { ServiceItem } from '@/types';
import { appData } from '@/lib/appData';

// Helper to map string icon names from appData to Lucide components
const iconMap: { [key: string]: LucideIcon } = {
  Gem: Gem,
  DollarSign: IndianRupee, // Changed from DollarSign to IndianRupee
  Search: Search,
  Settings: Settings,
  // Add more mappings if needed
};

const services: ServiceItem[] = appData.services.map(service => ({
  icon: iconMap[service.icon] || Gem, // Default to Gem if mapping not found
  title: service.title,
  description: service.description,
}));

export default function CoreServices() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-headline font-semibold text-center mb-12 text-foreground bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <Card key={service.title} className="text-center card hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-0">
              <CardHeader>
                <div className="mx-auto bg-gradient-to-br from-blue-500 to-purple-600 p-4 rounded-2xl w-fit mb-4 shadow-lg">
                  <service.icon className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-xl font-headline text-foreground">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
