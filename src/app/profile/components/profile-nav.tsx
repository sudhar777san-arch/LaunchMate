
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, FolderKanban, Code, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "About", href: "/profile", icon: User, matchExact: true },
  { name: "Projects", href: "/projects", icon: FolderKanban },
  { name: "Skills", href: "/skills", icon: Code },
  { name: "Connections", href: "/connections", icon: Users },
];

export default function ProfileNav() {
  const pathname = usePathname();

  return (
    <div className="p-1.5 rounded-lg bg-muted grid grid-cols-2 sm:grid-cols-4 gap-1">
      {navItems.map((item) => {
        const isActive = item.matchExact ? pathname === item.href : pathname.startsWith(item.href);
        return (
            <Link
            key={item.name}
            href={item.href}
            className={cn(
                "flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-all",
                isActive
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:bg-background/50"
            )}
            >
            <item.icon className="h-4 w-4" />
            {item.name}
            </Link>
        )
      })}
    </div>
  );
}
