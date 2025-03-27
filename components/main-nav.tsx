"use client";

import { Bell, Menu, Search, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { UserAvatar } from "@/components/user-avatar";
import { useToast } from "@/hooks/use-toast"; 
import Link from "next/link";

export function MainNav() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { toast } = useToast(); 

  const showNotification = () => {
    toast({
      title: "New notifications",
      description: "You have 3 unread messages",
      duration: 4000, 
    });
  };

  return (
    <header className="border-b border-primary/20 bg-black/80 backdrop-blur-sm">
      <div className="flex h-14 items-center px-4">
        {/* Left Section */}
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="md:hidden mr-2">
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold tracking-wider neon-text">
            NEON<span className="text-secondary neon-text-secondary">LINK</span>
          </h1>
        </div>

        {/* Centered Search Bar */}
        <div className="flex-1 flex justify-center">
          {isSearchOpen && (
            <Input
              placeholder="Search messages..."
              className="bg-background/50 border-primary/30 focus-visible:ring-primary/50 w-full md:w-1/2"
              autoFocus
            />
          )}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 ml-auto">
          <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(!isSearchOpen)} className="hover-glitch">
            <Search className="h-5 w-5 text-primary" />
          </Button>
          <Button variant="ghost" size="icon" onClick={showNotification} className="hover-glitch">
            <Bell className="h-5 w-5 text-primary" />
          </Button>
          <Link href="/settings">
            <Button variant="ghost" size="icon" className="hover-glitch">
              <Settings className="h-5 w-5 text-primary" />
            </Button>
          </Link>
            <UserAvatar
              user={{
                id: "current-user",
                name: "V",
                avatar: "",
                status: "online",
              }}
              className="ml-2 cursor-pointer"
            />
          
        </div>
      </div>
    </header>
  );
}

