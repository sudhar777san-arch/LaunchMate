
import Image from "next/image";
import Link from "next/link";
import { currentUser, students, projects } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Code, Link as LinkIcon, Mail, UserPlus, FileText, User, Users, FolderKanban } from "lucide-react";
import ResumeButton from "./components/resume-button";
import ProfileNav from "./components/profile-nav";

export default function ProfilePage() {
  const userProfileData = JSON.stringify(currentUser, null, 2);

  return (
    <div className="space-y-8">
      <Card className="overflow-hidden">
        <div className="h-32 md:h-48 bg-gradient-to-r from-primary to-accent" />
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-end -mt-16 sm:-mt-24 gap-4">
            <Avatar className="h-32 w-32 border-4 border-card ring-2 ring-primary">
              <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
              <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-grow">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{currentUser.name}</h1>
              <p className="text-muted-foreground">{currentUser.college}</p>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Button className="flex-1 sm:flex-none">
                <UserPlus className="mr-2 h-4 w-4" /> Connect
              </Button>
              <Button variant="outline" className="flex-1 sm:flex-none">
                <Mail className="mr-2 h-4 w-4" /> Message
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <ProfileNav />
          
          <Card>
            <CardHeader>
              <CardTitle>About {currentUser.name.split(' ')[0]}</CardTitle>
            </CardHeader>
            <CardContent className="text-foreground/90 leading-relaxed">
              <p>{currentUser.bio}</p>
            </CardContent>
          </Card>

        </div>
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary"/>
                AI Tools
              </CardTitle>
              <CardDescription>
                Generate a professional resume or a portfolio website with one click.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <ResumeButton profileData={userProfileData} type="resume" />
              <ResumeButton profileData={userProfileData} type="portfolio" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
