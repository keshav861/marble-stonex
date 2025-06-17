
import type { LucideIcon } from 'lucide-react';

export interface SlideItem {
  id: number;
  imageSrc: string; 
  imageAlt: string;
  aiHint: string;
  heading: string; 
  ctaText: string; 
  ctaLink: string;
}

export interface ProductItemSpecification {
  color: string;
  finish: string;
  origin: string;
  thickness: string;
}
export interface ProductItem {
  id: string;
  imageSrc: string; 
  imageAlt: string;
  aiHint: string;
  title: string;
  description: string;
  category: string; 
  isTopSelling?: boolean;
  specifications?: ProductItemSpecification; 
  // Added date for sorting or display if needed, similar to blog posts
  dateAdded: string; 
  // Support for multiple images
  additionalImages?: {
    src: string;
    alt: string;
  }[];
}

export interface ServiceItem {
  icon: LucideIcon; 
  title: string;
  description: string;
}

export interface ProductCategory {
  name: string;
  description: string;
  types: string[];
  imageSrc: string; 
  aiHint: string;
}

// BlogPost type remains as it was not explicitly asked to be removed,
// though its primary use in details/admin is being replaced by products.
export interface BlogPost {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  aiHint: string;
  category: string;
  date: string; 
}

export interface CompanyInfo {
  name: string;
  establishedYear: string;
  yearsOfExperience: string;
  customersServed: string;
}

export interface ContactPrimary {
  phone: string;
  whatsapp: string;
  email: string;
  workingHours: string;
}

export interface ContactLocation {
  address: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export interface ContactMaps {
  coordinates: {
    latitude: string;
    longitude: string;
  };
}

export interface ContactSocialMedia {
  facebook: string;
  instagram: string;
  whatsapp: string;
  twitter: string;
}

export interface ContactInfo {
  primary: ContactPrimary;
  location: ContactLocation;
  maps: ContactMaps;
  socialMedia: ContactSocialMedia;
}

export interface AboutContentData {
    mainHeading: string;
    introduction: string;
    history: { title: string; content: string };
    mission: { title: string; content: string };
    vision: { title: string; content: string };
    achievements: Array<{ year: string; title: string }>;
}
