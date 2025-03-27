"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Users, MessageSquare, Image, Phone, Video, Settings, HelpCircle, LogOut } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
  {
    name: "Chats",
    href: "/chats",
    icon: MessageSquare,
  },
  {
    name: "Groups",
    href: "/groups",
    icon: Users,
  },
  {
    name: "Media",
    href: "/media",
    icon: Image,
  },
  {
    name: "Calls",
    href: "/calls",
    icon: Phone,
  },
  {
    name: "Video",
    href: "/video",
    icon: Video,
  },
]

const bottomNavItems = [
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
  {
    name: "Help",
    href: "/help",
    icon: HelpCircle,
  },
  {
    name: "Logout",
    href: "/logout",
    icon: LogOut,
  },
]

export function SideNav() {
  const pathname = usePathname()

  return (
    <div className="hidden md:flex flex-col w-14 border-r border-primary/20 bg-black/80 backdrop-blur-sm">
      <div className="flex flex-col items-center py-4 gap-4">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "hover-glitch",
                pathname.startsWith(item.href) ? "bg-primary/10 text-primary neon-border" : "text-muted-foreground",
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="sr-only">{item.name}</span>
            </Button>
          </Link>
        ))}
      </div>

      <div className="mt-auto flex flex-col items-center py-4 gap-4">
        {bottomNavItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "hover-glitch",
                pathname.startsWith(item.href) ? "bg-primary/10 text-primary neon-border" : "text-muted-foreground",
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="sr-only">{item.name}</span>
            </Button>
          </Link>
        ))}
      </div>
    </div>
  )
}

