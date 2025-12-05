"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Search, Settings, User, LogOut, Rocket } from "lucide-react";
import Link from "next/link";
import { SidebarNav } from "./sidebar-nav";
import { ThemeToggle } from "./theme-toggle";
import { usePerformanceMode } from "./performance-mode";
import { useIsMobile } from "@/hooks/use-mobile";
import { currentUser } from "@/lib/data";
import { Zap, ZapOff } from "lucide-react";

export function Header() {
  const isMobile = useIsMobile();
  const { isPerformanceMode, togglePerformanceMode } = usePerformanceMode();

  const commonClasses = "sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/60 backdrop-blur-xl"

  if (!isMobile) {
    return (
      <header className={`${commonClasses} px-6`}>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search projects, students..." className="pl-9 bg-transparent" />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={togglePerformanceMode}
            title={isPerformanceMode ? "Disable Performance Mode" : "Enable Performance Mode"}
          >
            {isPerformanceMode ? <ZapOff className="h-4 w-4" /> : <Zap className="h-4 w-4" />}
          </Button>
          <ThemeToggle />
          <UserMenu />
        </div>
      </header>
    );
  }

  return (
    <header className={`${commonClasses} justify-between px-4`}>
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="ghost">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Open Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="pr-0 bg-card/80 backdrop-blur-xl border-r">
          <SidebarNav />
        </SheetContent>
      </Sheet>
       <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
          <div className="w-7 h-7 bg-primary rounded-full flex items-center justify-center">
            <Rocket className="w-4 h-4 text-primary-foreground" />
          </div>
        </Link>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={togglePerformanceMode}
          title={isPerformanceMode ? "Disable Performance Mode" : "Enable Performance Mode"}
        >
          {isPerformanceMode ? <ZapOff className="h-4 w-4" /> : <Zap className="h-4 w-4" />}
        </Button>
        <ThemeToggle />
        <UserMenu />
      </div>
    </header>
  );
}

function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full">
          <Avatar className="h-9 w-9 border-2 border-primary/50">
            <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
            <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 glassmorphism" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{currentUser.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {currentUser.college}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/profile">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
