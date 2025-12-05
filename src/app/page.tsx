import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BotMessageSquare, Globe, Rocket, UserCircle, Building } from "lucide-react";
import Link from "next/link";
import { projects, currentUser } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
           <h1 className="text-4xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-primary">Welcome back, {currentUser.name.split(' ')[0]}!</h1>
          <p className="text-muted-foreground mt-1 text-lg">Here's your launchpad for today. Innovate, connect, and build the future.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Your Profile</CardTitle>
            <UserCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Launch Ready</div>
            <p className="text-xs text-muted-foreground">Keep your skills and projects updated.</p>
            <Button asChild variant="secondary" size="sm" className="mt-4">
              <Link href="/profile">View Profile</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Mentor</CardTitle>
            <BotMessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Ask Anything</div>
            <p className="text-xs text-muted-foreground">Get career advice or project ideas.</p>
            <Button asChild variant="secondary" size="sm" className="mt-4">
              <Link href="/mentor">Chat Now</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Campus Hub</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentUser.college}</div>
            <p className="text-xs text-muted-foreground">See what's happening on campus.</p>
            <Button asChild variant="secondary" size="sm" className="mt-4">
              <Link href="/campus/mit">Visit Hub</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-3xl font-bold tracking-tighter">Featured Projects</h2>
        <div className="grid gap-6 mt-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 3).map((project) => (
            <Card key={project.id} className="flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Rocket className="h-5 w-5 text-primary" />
                  {project.name}
                </CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex -space-x-2 overflow-hidden">
                  {project.team.map(member => (
                    <Avatar key={member.id} className="inline-block h-8 w-8 rounded-full ring-2 ring-background">
                      <AvatarImage src={member.avatarUrl} alt={member.name} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
              </CardContent>
              <div className="p-6 pt-0">
                <Button asChild className="w-full" variant="secondary">
                  <Link href="/projects">View Project</Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
