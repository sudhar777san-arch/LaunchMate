
import Link from "next/link";
import { currentUser, students } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus, UserX, MessageSquare, User } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function ConnectionsPage() {
  const userConnections = students.filter(s => currentUser.connections.includes(s.id) && s.id !== currentUser.id);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your Network</h1>
          <p className="text-muted-foreground mt-1">Manage your professional connections.</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
            <Input placeholder="Search connections..." className="flex-1 md:w-auto" />
            <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Find Connections
            </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {userConnections.map(conn => (
          <Card key={conn.id} className="text-center">
            <CardContent className="p-6">
              <Link href="#">
                <Avatar className="h-24 w-24 mx-auto mb-4 border-4 border-transparent hover:border-primary/50 transition-colors">
                  <AvatarImage src={conn.avatarUrl} alt={conn.name} />
                  <AvatarFallback>{conn.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-semibold hover:text-primary transition-colors">{conn.name}</h3>
              </Link>
              <p className="text-sm text-muted-foreground">{conn.college}</p>
            </CardContent>
            <div className="flex flex-col gap-2 p-4 border-t">
                <Button asChild size="sm">
                    <Link href="#">
                        <User className="mr-2 h-4 w-4" /> View Profile
                    </Link>
                </Button>
                 <Button variant="outline" size="sm">
                    <MessageSquare className="mr-2 h-4 w-4" /> Message
                </Button>
                 <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                    <UserX className="mr-2 h-4 w-4" /> Remove
                </Button>
            </div>
          </Card>
        ))}
         {userConnections.length === 0 && (
            <Card className="sm:col-span-2 lg:col-span-3 xl:col-span-4 text-center p-8">
                <p className="text-muted-foreground">Your network is empty. Start finding new connections!</p>
            </Card>
         )}
      </div>
    </div>
  );
}
