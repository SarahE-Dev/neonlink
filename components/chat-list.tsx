"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserAvatar } from "@/components/user-avatar"
import { Search, Plus, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import { useRouter, usePathname } from "next/navigation"
import { getMockChats, getMockGroups } from "@/lib/mock-data"

export function ChatList() {
  const router = useRouter()
  const pathname = usePathname()
  const [searchQuery, setSearchQuery] = useState("")

  const chats = getMockChats()
  const groups = getMockGroups()

  const filteredChats = chats.filter((chat) => chat.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const filteredGroups = groups.filter((group) => group.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="border-r border-primary/20 h-full flex flex-col bg-black/60">
      <div className="p-4 border-b border-primary/20">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search..."
            className="bg-background/50 border-primary/30 focus-visible:ring-primary/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            prefix={<Search className="h-4 w-4 text-muted-foreground" />}
          />
          <Button
            size="icon"
            variant="outline"
            className="shrink-0 border-primary/30 hover:bg-primary/10 hover:text-primary"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="direct" className="flex-1 flex flex-col">
        <TabsList className="grid grid-cols-2 mx-4 mt-2">
          <TabsTrigger value="direct" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
            Direct
          </TabsTrigger>
          <TabsTrigger value="groups" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
            <Users className="h-4 w-4 mr-2" />
            Groups
          </TabsTrigger>
        </TabsList>

        <TabsContent value="direct" className="flex-1 overflow-auto p-2">
          {filteredChats.length > 0 ? (
            <div className="space-y-2">
              {filteredChats.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => router.push(`/chats/${chat.id}`)}
                  className={cn(
                    "w-full flex items-center gap-3 p-2 rounded-md transition-all hover:bg-primary/10",
                    pathname === `/chats/${chat.id}` && "bg-primary/10 neon-border",
                  )}
                >
                  <UserAvatar user={chat} />
                  <div className="flex-1 text-left truncate">
                    <div className="flex justify-between">
                      <span className="font-medium">{chat.name}</span>
                      <span className="text-xs text-muted-foreground">{chat.lastMessageTime}</span>
                    </div>
                    <div className="text-sm text-muted-foreground truncate">{chat.lastMessage}</div>
                  </div>
                  {chat.unreadCount > 0 && (
                    <div className="bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {chat.unreadCount}
                    </div>
                  )}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">No chats found</div>
          )}
        </TabsContent>

        <TabsContent value="groups" className="flex-1 overflow-auto p-2">
          {filteredGroups.length > 0 ? (
            <div className="space-y-2">
              {filteredGroups.map((group) => (
                <button
                  key={group.id}
                  onClick={() => router.push(`/chats/${group.id}`)}
                  className={cn(
                    "w-full flex items-center gap-3 p-2 rounded-md transition-all hover:bg-primary/10",
                    pathname === `/chats/${group.id}` && "bg-primary/10 neon-border",
                  )}
                >
                  <div className="relative">
                    <UserAvatar user={group} />
                    <div className="absolute -bottom-1 -right-1 bg-secondary text-secondary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {group.memberCount}
                    </div>
                  </div>
                  <div className="flex-1 text-left truncate">
                    <div className="flex justify-between">
                      <span className="font-medium">{group.name}</span>
                      <span className="text-xs text-muted-foreground">{group.lastMessageTime}</span>
                    </div>
                    <div className="text-sm text-muted-foreground truncate">
                      <span className="text-secondary">{group.lastMessageSender}:</span> {group.lastMessage}
                    </div>
                  </div>
                  {group.unreadCount > 0 && (
                    <div className="bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {group.unreadCount}
                    </div>
                  )}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">No groups found</div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

