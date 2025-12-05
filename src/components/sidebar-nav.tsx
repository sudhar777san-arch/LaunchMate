
"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Building, Globe, LayoutGrid, BotMessageSquare, Rocket, UserCircle, Library, Code, Users } from "lucide-react";

const mainNav = [
  { href: "/", label: "Dashboard", icon: LayoutGrid, matchExact: true },
  { href: "/profile", label: "Profile", icon: UserCircle },
  { href: "/projects", label: "Projects", icon: Rocket },
  { href: "/skills", label: "Skills", icon: Code },
  { href: "/connections", label: "Connections", icon: Users },
  { href: "/mentor", label: "AI Mentor", icon: BotMessageSquare },
  { href: "/campus", label: "Campus Hubs", icon: Building },
  { href: "/resources", label: "Resources", icon: Library },
];

const profileSubPages = ["/projects", "/skills", "/connections"];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
       <div className="flex items-center gap-3 p-4 border-b">
         <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <Rocket className="w-5 h-5 text-primary-foreground" />
         </div>
         <h1 className="text-xl font-bold tracking-tighter text-foreground">LaunchMate</h1>
      </div>
      <ScrollArea className="flex-1">
        <nav className="grid items-start gap-1 p-2 text-sm font-medium">
          {mainNav.map(({ href, label, icon: Icon, matchExact }) => {
            let isActive = matchExact ? pathname === href : pathname.startsWith(href);
            // Special handling for profile to highlight for its sub-pages
            if (href === "/profile" && profileSubPages.some(p => pathname.startsWith(p))) {
                isActive = true;
            }
             if (profileSubPages.includes(href) && pathname.startsWith(href)) {
                 const isProfileActive = pathname.startsWith('/profile');
                 if(!isProfileActive) isActive = true;
                 else isActive = false;
            }


            return (
              <Button
                key={href}
                asChild
                variant="ghost"
                className={cn(
                    "justify-start relative",
                    isActive && "bg-secondary text-primary-foreground",
                    // Hide projects, skills, connections if we are on a profile sub-page
                    profileSubPages.includes(href) && profileSubPages.some(p => pathname.startsWith(p)) && href !== pathname ? "" : ""
                )}
              >
                <Link href={href}>
                  {isActive && (
                    <motion.div 
                      layoutId="active-nav-indicator"
                      className="absolute left-0 top-0 h-full w-1 bg-primary rounded-r-full"
                    />
                  )}
                  <Icon className="mr-3 h-5 w-5" />
                  {label}
                </Link>
              </Button>
            );
          })}
        </nav>
      </ScrollArea>
    </div>
  );
}
