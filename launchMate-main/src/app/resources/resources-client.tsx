'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ResourceDomain, ResourcePlaylist } from '@/lib/data';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Youtube, Bookmark, ArrowRight, Palette, Database, Code, Bot, Cpu, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

const iconMap = {
    Palette,
    Database,
    Code,
    Bot,
    Cpu,
    ShieldCheck
};

export default function ResourcesClientPage({ resourceDomains }: { resourceDomains: ResourceDomain[] }) {
  const [activeDomain, setActiveDomain] = useState<ResourceDomain | null>(resourceDomains[0]);

  const ActiveIcon = activeDomain ? iconMap[activeDomain.iconName] : null;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Resources Hub</h1>
        <p className="text-muted-foreground mt-1">Your personalized guide for learning and placement preparation.</p>
      </div>

      <Tabs defaultValue="domain-guidance">
        <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
          <TabsTrigger value="domain-guidance">Domain Guidance</TabsTrigger>
          <TabsTrigger value="subject-finder">Subject Finder</TabsTrigger>
        </TabsList>
        <TabsContent value="domain-guidance" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Domains</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-1 p-2">
                  {resourceDomains.map((domain) => {
                    const Icon = iconMap[domain.iconName];
                    return (
                        <Button
                        key={domain.id}
                        variant={activeDomain?.id === domain.id ? "secondary" : "ghost"}
                        className="justify-start"
                        onClick={() => setActiveDomain(domain)}
                        >
                        <Icon className="mr-2 h-4 w-4" />
                        {domain.name}
                        </Button>
                    )
                  })}
                </CardContent>
              </Card>
            </div>
            <div className="lg:col-span-3">
              {activeDomain && ActiveIcon ? (
                <div className="space-y-6">
                    <div>
                        <h2 className="text-2xl font-bold flex items-center gap-2">
                           <ActiveIcon className="w-6 h-6 text-primary" />
                           {activeDomain.name} Resources
                        </h2>
                        <p className="text-muted-foreground mt-1">{activeDomain.description}</p>
                    </div>
                  
                  {activeDomain.playlists.map((playlist) => (
                    <PlaylistCard key={playlist.id} playlist={playlist} />
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-muted-foreground">Select a domain to see resources.</p>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="subject-finder" className="mt-6">
           <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>Anna University Subject Finder</CardTitle>
                    <CardDescription>Enter a subject code to find notes, question banks, and reference materials.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-2">
                        <Input placeholder="e.g., CS8392, IT8501..." />
                        <Button>
                            <Search className="mr-2 h-4 w-4" />
                            Search
                        </Button>
                    </div>
                     <div className="mt-6 text-center text-muted-foreground">
                        <p>Feature coming soon!</p>
                    </div>
                </CardContent>
           </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function PlaylistCard({ playlist }: { playlist: ResourcePlaylist }) {
    return (
         <Card className="group">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-lg">{playlist.title}</CardTitle>
                        <CardDescription>by {playlist.author}</CardDescription>
                    </div>
                    <Button variant="ghost" size="icon">
                        <Bookmark className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{playlist.description}</p>
                <Button asChild>
                    <Link href={playlist.url} target="_blank">
                        <Youtube className="mr-2 h-4 w-4" />
                        Watch on YouTube
                        <ArrowRight className="ml-auto h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>
                </Button>
            </CardContent>
        </Card>
    )
}
