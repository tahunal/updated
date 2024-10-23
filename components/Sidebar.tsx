"use client"

import { Coins, PlusCircle, Plane, Flame, Shield, Edit3 } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"

const menuItems = [
  { name: 'CREATE TOKEN', icon: Coins, href: '/' },
  { name: 'MINT TOKENS', icon: PlusCircle, href: '/mint-tokens' },
  { name: 'AIRDROP', icon: Plane, href: '/airdrop' },
  { name: 'INCINERATOR', icon: Flame, href: '/incinerator' },
  { name: 'REVOKE OWNERSHIP', icon: Shield, href: '/revoke-ownership' },
  { name: 'UPDATE METADATA', icon: Edit3, href: '/update-metadata' },
];

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

const Sidebar = ({ className }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <div className={cn("pb-12 w-64", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              Navigation
            </h2>
            <ScrollArea className="h-[calc(100vh-10rem)] px-2">
              <div className="space-y-1">
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors",
                      pathname === item.href ? "bg-accent text-accent-foreground" : "transparent"
                    )}
                  >
                    <item.icon className={cn(
                      "mr-2 h-4 w-4",
                      pathname === item.href ? "text-accent-foreground" : "text-muted-foreground group-hover:text-accent-foreground"
                    )} />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;