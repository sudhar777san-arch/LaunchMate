import Image from 'next/image';
import { campuses } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ThumbsUp, MessageSquare } from 'lucide-react';
import { PostForm } from './components/post-form';

export default async function CampusPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const campus = campuses.find((c) => c.id === id);

  if (!campus) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div className="relative h-64 w-full overflow-hidden rounded-xl">
        <Image
          src={campus.imageUrl}
          alt={campus.name}
          fill
          data-ai-hint="university campus"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-6 left-6">
          <h1 className="text-4xl font-bold tracking-tight text-white">{campus.name}</h1>
          <p className="text-lg text-white/90">{campus.location}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <PostForm campusId={campus.id} />
          
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Campus Feed</h2>
            {campus.posts.map((post) => (
              <Card key={post.id}>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <Avatar>
                      <AvatarImage src={post.author.avatarUrl} alt={post.author.name} />
                      <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold">{post.author.name}</p>
                        <p className="text-xs text-muted-foreground">{post.timestamp}</p>
                      </div>
                      <p className="mt-2 text-foreground/90">{post.content}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex items-center gap-6 border-t pt-4">
                  <Button variant="ghost" size="sm" className="flex items-center gap-2 text-muted-foreground">
                    <ThumbsUp className="h-4 w-4" /> {post.likes}
                  </Button>
                  <Button variant="ghost" size="sm" className="flex items-center gap-2 text-muted-foreground">
                    <MessageSquare className="h-4 w-4" /> {post.comments}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Top Innovators</CardTitle>
                </CardHeader>
                <CardContent>
                    {/* Placeholder for innovators list */}
                    <p className="text-sm text-muted-foreground">Coming soon...</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Trending Projects</CardTitle>
                </CardHeader>
                <CardContent>
                     {/* Placeholder for projects list */}
                    <p className="text-sm text-muted-foreground">Coming soon...</p>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
    return campuses.map((campus) => ({
        id: campus.id,
    }));
}
