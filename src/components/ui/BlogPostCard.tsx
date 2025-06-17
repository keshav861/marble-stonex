
"use client";

import Image from 'next/image';
import Link from 'next/link';
import type { BlogPost } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface BlogPostCardProps {
  post: BlogPost;
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  const shortDescription = post.description.length > 100 
    ? post.description.substring(0, 100) + "..."
    : post.description;

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <CardHeader className="p-0 relative">
        <div className="w-full h-[280px] relative"> {/* Fixed height for 380x280, width will be responsive */}
          <Image
            src={post.imageUrl || "https://placehold.co/380x280.png"}
            alt={post.title}
            data-ai-hint={post.aiHint || post.category.toLowerCase()}
            fill
            style={{ objectFit: 'cover' }}
            className="transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Adjust sizes for responsiveness
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow flex flex-col">
        <div className="flex justify-between items-center mb-2">
          <Badge variant="secondary">{post.category}</Badge>
          <p className="text-xs text-muted-foreground">{new Date(post.date).toLocaleDateString()}</p>
        </div>
        <CardTitle className="text-xl font-headline mb-2 text-foreground">{post.title}</CardTitle>
        <CardDescription className="text-muted-foreground text-sm flex-grow mb-4">{shortDescription}</CardDescription>
        <Button asChild variant="link" className="p-0 h-auto self-start text-primary">
          <Link href="#"> 
            Read More
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
