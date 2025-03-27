"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { UserAvatar } from "@/components/user-avatar"
import { Search, Plus, Users, MoreVertical } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getMockGroups } from "@/lib/mock-data"
import { motion } from "framer-motion"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"

export function GroupsList() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const groups = getMockGroups()

  const filteredGroups = groups.filter((group) => group.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="container py-6 max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight neon-text">Groups</h1>
          <p className="text-muted-foreground">Manage your group conversations</p>
        </div>
        <Button className="bg-primary/20 text-primary hover:bg-primary/30 neon-border">
          <Plus className="h-4 w-4 mr-2" />
          Create Group
        </Button>
      </div>

      <div className="flex items-center gap-2 mb-6">
        <Input
          placeholder="Search groups..."
          className="bg-background/50 border-primary/30 focus-visible:ring-primary/50"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          prefix={<Search className="h-4 w-4 text-muted-foreground" />}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGroups.map((group) => (
          <motion.div
            key={group.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.02 }}
          >
            <Card className="bg-black/60 border-primary/20 overflow-hidden hover:neon-border transition-all duration-300">
              <div className="h-24 bg-gradient-to-r from-primary/20 to-secondary/20 relative">
                <div className="absolute bottom-0 right-0 p-2">
                  <Badge className="bg-black/60 text-primary hover:bg-black/80">{group.memberCount} members</Badge>
                </div>
              </div>
              <CardHeader className="flex flex-row items-center gap-4 pt-6">
                <UserAvatar user={group} className="h-12 w-12" />
                <div>
                  <CardTitle>{group.name}</CardTitle>
                  <CardDescription>Last active: {group.lastMessageTime}</CardDescription>
                </div>
                <div className="ml-auto">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10">
                        <MoreVertical className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View details</DropdownMenuItem>
                      <DropdownMenuItem>Mute notifications</DropdownMenuItem>
                      <DropdownMenuItem>Leave group</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground mb-4">
                  <span className="text-secondary">{group.lastMessageSender}:</span> {group.lastMessage}
                </div>
                <div className="flex -space-x-2">
                  {group.members?.slice(0, 3).map((member, index) => (
                    <UserAvatar
                      key={member.id}
                      user={member}
                      className="h-8 w-8 border-2 border-background"
                      showStatus={false}
                    />
                  ))}
                  {group.memberCount > 3 && (
                    <div className="h-8 w-8 rounded-full bg-secondary/20 border-2 border-background flex items-center justify-center text-xs text-secondary">
                      +{group.memberCount - 3}
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="border-t border-primary/10 pt-4">
                <Button
                  variant="ghost"
                  className="text-primary hover:bg-primary/10 w-full"
                  onClick={() => router.push(`/chats/${group.id}`)}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Open Chat
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

