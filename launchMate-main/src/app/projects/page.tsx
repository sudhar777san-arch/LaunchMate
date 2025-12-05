
'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo, memo } from "react";
import { projects as allProjects } from "@/lib/data";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ArrowUp, PlusCircle, MoreVertical, Trash2, Edit, ArrowDown, ArrowUpAZ, Calendar } from "lucide-react";

type SortKey = 'votes' | 'name' | 'date';

export default function ProjectsPage() {
  const [projects, setProjects] = useState(allProjects);
  const [sortKey, setSortKey] = useState<SortKey>('votes');
  const [sortAsc, setSortAsc] = useState(false);

  const sortedProjects = useMemo(() => {
    return [...projects].sort((a, b) => {
      if (sortKey === 'name') {
        return sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      }
      if (sortKey === 'votes') {
         return sortAsc ? a.votes - b.votes : b.votes - a.votes;
      }
       // Simple date sort, assuming ids are sortable by date for now
      if (sortKey === 'date') {
         return sortAsc ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id);
      }
      return 0;
    });
  }, [projects, sortKey, sortAsc]);
  
  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
        setSortAsc(!sortAsc);
    } else {
        setSortKey(key);
        setSortAsc(false);
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Project Showcase</h1>
          <p className="text-muted-foreground mt-1">Discover, support, and get inspired by projects from fellow students.</p>
        </div>
        <div className="flex gap-2">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                        {sortAsc ? <ArrowUp className="mr-2 h-4 w-4" /> : <ArrowDown className="mr-2 h-4 w-4" />}
                        Sort by: {sortKey.charAt(0).toUpperCase() + sortKey.slice(1)}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleSort('votes')}>
                        <ArrowUp className="mr-2 h-4 w-4" /> Votes
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleSort('name')}>
                        <ArrowUpAZ className="mr-2 h-4 w-4" /> Name
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleSort('date')}>
                        <Calendar className="mr-2 h-4 w-4" /> Date
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Project
            </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {sortedProjects.map((project) => (
          <Card key={project.id} className="flex flex-col group overflow-hidden transition-all hover:shadow-xl">
             <div className="relative h-48 w-full overflow-hidden">
                <Link href={`/projects/${project.id}`} className="absolute inset-0">
                  <Image
                      src={project.imageUrl}
                      alt={project.name}
                      fill
                      data-ai-hint="project abstract"
                      className="object-cover transition-transform group-hover:scale-105"
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </Link>
                 <div className="absolute top-2 right-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem><Edit className="mr-2 h-4 w-4" />Edit</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                                <Trash2 className="mr-2 h-4 w-4" />Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                 </div>
             </div>

            <CardHeader>
                <Link href={`/projects/${project.id}`}>
                    <CardTitle className="hover:text-primary transition-colors">{project.name}</CardTitle>
                </Link>
              <div className="flex flex-wrap gap-2 pt-2">
                {project.tags.map(tag => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <div className="flex -space-x-2">
                {project.team.map((member) => (
                  <Avatar key={member.id} className="h-8 w-8 border-2 border-card">
                    <AvatarImage src={member.avatarUrl} alt={member.name} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <Button variant="outline" className="group/vote">
                 <ArrowUp className="mr-2 h-4 w-4 text-muted-foreground group-hover/vote:text-primary transition-colors" />
                 <span className="text-muted-foreground group-hover/vote:text-primary font-semibold transition-colors">{project.votes}</span>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
