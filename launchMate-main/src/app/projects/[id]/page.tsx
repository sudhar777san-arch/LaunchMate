import Image from 'next/image';
import { notFound } from 'next/navigation';
import { projects, students } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUp, Github, ExternalLink, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function ProjectDetailsPage({ params }: { params: { id: string } }) {
  const project = projects.find((p) => p.id === params.id);

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <header className="space-y-4">
        <div className="relative h-64 w-full overflow-hidden rounded-xl">
          <Image
            src={project.imageUrl}
            alt={project.name}
            fill
            data-ai-hint="project abstract"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
                <h1 className="text-4xl font-bold tracking-tight">{project.name}</h1>
                <div className="flex flex-wrap gap-2 mt-2">
                    {project.tags.map(tag => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                </div>
            </div>
             <div className="flex gap-2">
                <Button variant="outline">
                    <Edit className="mr-2 h-4 w-4" /> Edit
                </Button>
                 <Button variant="destructive">
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                </Button>
                <Button>
                    <ArrowUp className="mr-2 h-4 w-4" />
                    Upvote ({project.votes})
                </Button>
            </div>
        </div>
      </header>
      
      <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Description</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-foreground/90 leading-relaxed">{project.description}</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Links</CardTitle>
                </CardHeader>
                <CardContent className="flex gap-4">
                    <Button asChild variant="outline">
                        <Link href="#">
                            <Github className="mr-2 h-4 w-4" /> GitHub
                        </Link>
                    </Button>
                    <Button asChild>
                        <Link href="#">
                            <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-1 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Team Members</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {project.team.map(member => {
                        const memberDetails = students.find(s => s.id === member.id);
                        return (
                            <Link href={`/profile/${member.id}`} key={member.id} className="flex items-center gap-3 group">
                                <Avatar>
                                    <AvatarImage src={member.avatarUrl} alt={member.name} />
                                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-semibold group-hover:text-primary transition-colors">{member.name}</p>
                                    <p className="text-sm text-muted-foreground">{memberDetails?.college}</p>
                                </div>
                            </Link>
                        )
                    })}
                </CardContent>
            </Card>
        </div>
      </main>
    </div>
  );
}

export async function generateStaticParams() {
    return projects.map((project) => ({
        id: project.id,
    }));
}
