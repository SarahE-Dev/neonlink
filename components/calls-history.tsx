"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserAvatar } from "@/components/user-avatar"
import { Search, Phone, VideoIcon, PhoneIncoming, PhoneOutgoing, PhoneMissed, Info } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { useToast } from "@/components/ui/use-toast"

// Update the mock calls to use empty avatars
// Mock calls data
const mockCalls = [
  {
    id: "call1",
    name: "Rogue",
    avatar: "",
    type: "incoming",
    callType: "audio",
    duration: "5:23",
    date: "Today, 10:30 AM",
    status: "completed",
  },
  {
    id: "call2",
    name: "Johnny Silverhand",
    avatar: "",
    type: "outgoing",
    callType: "video",
    duration: "12:45",
    date: "Today, 9:15 AM",
    status: "completed",
  },
  {
    id: "call3",
    name: "Judy Alvarez",
    avatar: "",
    type: "missed",
    callType: "audio",
    duration: "",
    date: "Yesterday, 8:45 PM",
    status: "missed",
  },
  {
    id: "call4",
    name: "Panam Palmer",
    avatar: "",
    type: "incoming",
    callType: "audio",
    duration: "3:12",
    date: "Yesterday, 2:30 PM",
    status: "completed",
  },
  {
    id: "call5",
    name: "Takemura",
    avatar: "",
    type: "outgoing",
    callType: "audio",
    duration: "8:05",
    date: "2 days ago",
    status: "completed",
  },
  {
    id: "call6",
    name: "Afterlife Mercs",
    avatar: "",
    type: "outgoing",
    callType: "video",
    duration: "22:18",
    date: "3 days ago",
    status: "completed",
    isGroup: true,
    participants: 5,
  },
  {
    id: "call7",
    name: "Netrunners Guild",
    avatar: "",
    type: "missed",
    callType: "video",
    duration: "",
    date: "4 days ago",
    status: "missed",
    isGroup: true,
    participants: 8,
  },
]

const getCallIcon = (call: any) => {
  if (call.type === "incoming") {
    return <PhoneIncoming className="h-4 w-4 text-green-500" />
  } else if (call.type === "outgoing") {
    return <PhoneOutgoing className="h-4 w-4 text-primary" />
  } else {
    return <PhoneMissed className="h-4 w-4 text-destructive" />
  }
}

export function CallsHistory() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const { toast } = useToast()

  const handleCall = (contact: any, callType: string) => {
    toast({
      title: `${callType} call to ${contact.name}`,
      description: "Initiating call simulation",
      variant: "default",
    })
  }

  const filterCalls = () => {
    let filtered = mockCalls.filter((call) => call.name.toLowerCase().includes(searchQuery.toLowerCase()))

    if (activeTab === "audio") {
      filtered = filtered.filter((call) => call.callType === "audio")
    } else if (activeTab === "video") {
      filtered = filtered.filter((call) => call.callType === "video")
    } else if (activeTab === "missed") {
      filtered = filtered.filter((call) => call.status === "missed")
    }

    return filtered
  }

  return (
    <div className="container py-6 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight neon-text">Calls</h1>
          <p className="text-muted-foreground">View your call history and make new calls</p>
        </div>
        <div className="flex gap-2">
          <Button
            className="bg-primary/20 text-primary hover:bg-primary/30 neon-border"
            onClick={() =>
              toast({
                title: "New audio call",
                description: "Select a contact to call",
                variant: "default",
              })
            }
          >
            <Phone className="h-4 w-4 mr-2" />
            New Call
          </Button>
          <Button
            className="bg-secondary/20 text-secondary hover:bg-secondary/30"
            style={{ boxShadow: "0 0 5px var(--secondary), 0 0 10px var(--secondary)" }}
            onClick={() =>
              toast({
                title: "New video call",
                description: "Select a contact for video call",
                variant: "default",
              })
            }
          >
            <VideoIcon className="h-4 w-4 mr-2" />
            Video Call
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-6">
        <Input
          placeholder="Search calls..."
          className="bg-background/50 border-primary/30 focus-visible:ring-primary/50"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          prefix={<Search className="h-4 w-4 text-muted-foreground" />}
        />
      </div>

      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="all" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
            All
          </TabsTrigger>
          <TabsTrigger value="audio" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
            <Phone className="h-4 w-4 mr-2" />
            Audio
          </TabsTrigger>
          <TabsTrigger value="video" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
            <VideoIcon className="h-4 w-4 mr-2" />
            Video
          </TabsTrigger>
          <TabsTrigger value="missed" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
            <PhoneMissed className="h-4 w-4 mr-2" />
            Missed
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <CallsList calls={filterCalls()} onCall={handleCall} />
        </TabsContent>

        <TabsContent value="audio" className="space-y-4">
          <CallsList calls={filterCalls()} onCall={handleCall} />
        </TabsContent>

        <TabsContent value="video" className="space-y-4">
          <CallsList calls={filterCalls()} onCall={handleCall} />
        </TabsContent>

        <TabsContent value="missed" className="space-y-4">
          <CallsList calls={filterCalls()} onCall={handleCall} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function CallsList({ calls, onCall }: { calls: any[]; onCall: (contact: any, callType: string) => void }) {
  return (
    <div className="space-y-3">
      {calls.length > 0 ? (
        calls.map((call) => (
          <motion.div
            key={call.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="bg-black/60 border-primary/20 hover:bg-black/80 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <UserAvatar
                      user={{
                        id: call.id,
                        name: call.name,
                        avatar: call.avatar,
                      }}
                    />
                    {call.isGroup && (
                      <div className="absolute -bottom-1 -right-1 bg-secondary text-secondary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {call.participants}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{call.name}</span>
                      {call.callType === "video" && <VideoIcon className="h-3 w-3 text-muted-foreground" />}
                      {getCallIcon(call)}
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <span>{call.date}</span>
                      {call.duration && (
                        <>
                          <span>•</span>
                          <span>{call.duration}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-primary hover:bg-primary/10"
                      onClick={() => onCall(call, "Audio")}
                    >
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-secondary hover:bg-secondary/10"
                      onClick={() => onCall(call, "Video")}
                    >
                      <VideoIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-muted-foreground hover:bg-background/50"
                      onClick={() => onCall(call, "Info")}
                    >
                      <Info className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))
      ) : (
        <div className="flex items-center justify-center p-8 text-muted-foreground">No calls found</div>
      )}
    </div>
  )
}

