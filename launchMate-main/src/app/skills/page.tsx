
import Link from 'next/link';
import { currentUser } from "@/lib/data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlusCircle, Lightbulb, BrainCircuit } from "lucide-react";

export default function SkillsPage() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Your Skill Set</h1>
        <p className="text-muted-foreground mt-1">Manage your skills and discover new ones to learn.</p>
      </div>

      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <div>
            <CardTitle>My Skills</CardTitle>
            <CardDescription>This is a list of skills you have on your profile.</CardDescription>
          </div>
           <Button>
                <PlusCircle className="w-4 h-4 mr-2" />
                Add New Skill
            </Button>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          {currentUser.skills.map(skill => (
            <Badge key={skill} variant="default" className="text-md py-2 px-4 bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20">
              {skill}
            </Badge>
          ))}
           {currentUser.skills.length === 0 && (
            <p className="text-sm text-muted-foreground">You haven't added any skills yet. Click "Add New Skill" to start.</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
            <CardTitle>Develop Your Skills</CardTitle>
            <CardDescription>Expand your knowledge and add new capabilities to your profile.</CardDescription>
        </CardHeader>
        <CardContent className="grid sm:grid-cols-2 gap-4">
            <Button variant="outline" size="lg" className="h-auto py-4 flex-col gap-2 items-start text-left" asChild>
                <Link href="/resources">
                    <Lightbulb className="w-6 h-6 text-primary mb-2" />
                    <span className="font-semibold">Learn a Skill</span>
                    <span className="text-xs text-muted-foreground font-normal">Browse tutorials and courses in the Resources Hub.</span>
                </Link>
            </Button>
            <Button variant="outline" size="lg" className="h-auto py-4 flex-col gap-2 items-start text-left" asChild>
                <Link href="/mentor">
                    <BrainCircuit className="w-6 h-6 text-primary mb-2" />
                    <span className="font-semibold">Get AI Suggestions</span>
                    <span className="text-xs text-muted-foreground font-normal">Ask the AI Mentor for personalized skill recommendations.</span>
                </Link>
            </Button>
        </CardContent>
      </Card>
    </div>
  );
}
