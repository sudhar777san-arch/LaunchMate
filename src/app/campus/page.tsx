import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { campuses } from '@/lib/data';
import { ArrowRight } from 'lucide-react';

export default function CampusHubsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Campus Innovation Hubs</h1>
        <p className="text-muted-foreground mt-1">Connect with innovators and projects from top universities worldwide.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {campuses.map((campus) => (
          <Link href={`/campus/${campus.id}`} key={campus.id}>
            <Card className="group relative overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <Image
                src={campus.imageUrl}
                alt={campus.name}
                width={800}
                height={400}
                data-ai-hint="university campus"
                className="h-48 w-full object-cover transition-transform group-hover:scale-105"
                loading="lazy"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              />
              <CardHeader className="absolute bottom-0 p-4">
                <CardTitle className="text-xl font-bold text-primary-foreground">{campus.name}</CardTitle>
                <CardDescription className="text-sm text-primary-foreground/80">{campus.location}</CardDescription>
              </CardHeader>
               <div className="absolute top-4 right-4 p-2 bg-background/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0">
                  <ArrowRight className="w-5 h-5 text-foreground" />
               </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
