"use client"

import { Input } from "@/components/ui/input"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { UserAvatar } from "@/components/user-avatar"
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Phone,
  Share2,
  MessageSquare,
  Users,
  MoreVertical,
  Settings,
  Maximize,
  ChevronRight,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock participants
const mockParticipants = [
  {
    id: "p1",
    name: "V (You)",
    avatar: "",
    isSpeaking: false,
    isMuted: false,
    isVideoOn: true,
    isScreenSharing: false,
  },
  {
    id: "p2",
    name: "Rogue",
    avatar: "",
    isSpeaking: true,
    isMuted: false,
    isVideoOn: true,
    isScreenSharing: false,
  },
  {
    id: "p3",
    name: "Johnny Silverhand",
    avatar: "",
    isSpeaking: false,
    isMuted: true,
    isVideoOn: false,
    isScreenSharing: false,
  },
  {
    id: "p4",
    name: "Judy Alvarez",
    avatar: "",
    isSpeaking: false,
    isMuted: false,
    isVideoOn: false,
    isScreenSharing: false,
  },
  {
    id: "p5",
    name: "Panam Palmer",
    avatar: "",
    isSpeaking: false,
    isMuted: false,
    isVideoOn: true,
    isScreenSharing: false,
  },
]

export function VideoConference() {
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isParticipantsOpen, setIsParticipantsOpen] = useState(false)
  const [activeView, setActiveView] = useState<"grid" | "speaker">("grid")
  const { toast } = useToast()

  const handleAction = (action: string) => {
    toast({
      title: action,
      description: `${action} action triggered`,
      variant: "default",
    })
  }

  return (
    <div className="flex flex-col h-full">
      {/* Main video area */}
      <div className="flex-1 p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 z-0"></div>

        {activeView === "grid" ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 h-full relative z-10">
            {mockParticipants.map((participant) => (
              <motion.div
                key={participant.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <Card
                  className={cn(
                    "h-full overflow-hidden border-primary/20",
                    participant.isSpeaking && "border-primary neon-border",
                  )}
                >
                  <CardContent className="p-0 h-full">
                    {participant.isVideoOn ? (
                      <div className="bg-gradient-to-br from-black/80 to-black/60 h-full flex items-center justify-center">
                        {/* Video feed simulation */}
                        <img
                          src={`/placeholder.svg?height=300&width=400&text=${participant.name}`}
                          alt={participant.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="bg-gradient-to-br from-black/80 to-black/60 h-full flex items-center justify-center">
                        <UserAvatar
                          user={{
                            id: participant.id,
                            name: participant.name,
                            avatar: "",
                          }}
                          className="h-20 w-20"
                        />
                      </div>
                    )}

                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                      <div className="flex items-center justify-between">
                        <span className="text-white text-sm font-medium">{participant.name}</span>
                        <div className="flex items-center gap-1">
                          {participant.isMuted && <MicOff className="h-4 w-4 text-red-500" />}
                          {!participant.isVideoOn && <VideoOff className="h-4 w-4 text-red-500" />}
                          {participant.isScreenSharing && <Share2 className="h-4 w-4 text-green-500" />}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="h-full flex flex-col md:flex-row gap-4 relative z-10">
            <div className="flex-1">
              <Card className="h-full overflow-hidden border-primary/20 neon-border">
                <CardContent className="p-0 h-full">
                  <div className="bg-gradient-to-br from-black/80 to-black/60 h-full flex items-center justify-center">
                    {/* Main speaker video simulation */}
                    <img
                      src="/placeholder.svg?height=600&width=800&text=Rogue"
                      alt="Main speaker"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                    <div className="flex items-center justify-between">
                      <span className="text-white text-sm font-medium">Rogue (Speaking)</span>
                      <div className="flex items-center gap-1">
                        {mockParticipants[1].isMuted && <MicOff className="h-4 w-4 text-red-500" />}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="md:w-1/4 h-full flex flex-col gap-2 overflow-y-auto">
              {mockParticipants
                .filter((p) => p.id !== "p2")
                .map((participant) => (
                  <motion.div
                    key={participant.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className="relative h-24"
                  >
                    <Card className="h-full overflow-hidden border-primary/20">
                      <CardContent className="p-0 h-full">
                        {participant.isVideoOn ? (
                          <div className="bg-gradient-to-br from-black/80 to-black/60 h-full flex items-center justify-center">
                            <img
                              src={`/placeholder.svg?height=100&width=150&text=${participant.name}`}
                              alt={participant.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="bg-gradient-to-br from-black/80 to-black/60 h-full flex items-center justify-center">
                            <UserAvatar
                              user={{
                                id: participant.id,
                                name: participant.name,
                                avatar: "",
                              }}
                              className="h-10 w-10"
                            />
                          </div>
                        )}

                        <div className="absolute bottom-0 left-0 right-0 p-1 bg-gradient-to-t from-black/80 to-transparent">
                          <div className="flex items-center justify-between">
                            <span className="text-white text-xs font-medium truncate">
                              {participant.name}
                              {participant.id === "p1" && " (You)"}
                            </span>
                            <div className="flex items-center gap-1">
                              {participant.isMuted && <MicOff className="h-3 w-3 text-red-500" />}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
            </div>
          </div>
        )}

        {/* View controls */}
        <div className="absolute top-4 right-4 z-20 flex gap-2">
          <Button
            size="sm"
            variant="ghost"
            className={cn(
              "bg-black/60 text-white hover:bg-black/80",
              activeView === "grid" && "bg-primary/20 text-primary",
            )}
            onClick={() => setActiveView("grid")}
          >
            <div className="grid grid-cols-2 gap-0.5">
              <div className="w-1.5 h-1.5 bg-current rounded-sm"></div>
              <div className="w-1.5 h-1.5 bg-current rounded-sm"></div>
              <div className="w-1.5 h-1.5 bg-current rounded-sm"></div>
              <div className="w-1.5 h-1.5 bg-current rounded-sm"></div>
            </div>
            <span className="ml-2 text-xs">Grid</span>
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className={cn(
              "bg-black/60 text-white hover:bg-black/80",
              activeView === "speaker" && "bg-primary/20 text-primary",
            )}
            onClick={() => setActiveView("speaker")}
          >
            <Maximize className="h-3.5 w-3.5 mr-1" />
            <span className="text-xs">Speaker</span>
          </Button>
        </div>

        {/* Side panels */}
        {(isChatOpen || isParticipantsOpen) && (
          <div className="absolute top-0 right-0 bottom-0 w-80 bg-black/80 border-l border-primary/20 z-30 p-4 overflow-y-auto">
            {isChatOpen && (
              <div className="h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-primary">Chat</h3>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-muted-foreground hover:bg-background/50"
                    onClick={() => setIsChatOpen(false)}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex-1 space-y-4 overflow-y-auto">
                  <div className="flex gap-2">
                    <UserAvatar
                      user={{
                        id: "p2",
                        name: "Rogue",
                        avatar: "",
                      }}
                      className="h-8 w-8"
                      showStatus={false}
                    />
                    <div className="bg-background/50 rounded-lg p-2 text-sm">
                      <div className="font-medium text-xs mb-1">Rogue</div>
                      <div>Can everyone hear me clearly?</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <UserAvatar
                      user={{
                        id: "p4",
                        name: "Judy Alvarez",
                        avatar: "",
                      }}
                      className="h-8 w-8"
                      showStatus={false}
                    />
                    <div className="bg-background/50 rounded-lg p-2 text-sm">
                      <div className="font-medium text-xs mb-1">Judy Alvarez</div>
                      <div>Yes, audio is good on my end.</div>
                    </div>
                  </div>
                  <div className="flex gap-2 justify-end">
                    <div className="bg-primary/20 rounded-lg p-2 text-sm">
                      <div className="font-medium text-xs mb-1">You</div>
                      <div>I can hear you fine, Rogue.</div>
                    </div>
                    <UserAvatar
                      user={{
                        id: "p1",
                        name: "V",
                        avatar: "",
                      }}
                      className="h-8 w-8"
                      showStatus={false}
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <Input
                    placeholder="Type a message..."
                    className="bg-background/50 border-primary/30 focus-visible:ring-primary/50"
                  />
                </div>
              </div>
            )}

            {isParticipantsOpen && (
              <div className="h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-primary">Participants (5)</h3>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-muted-foreground hover:bg-background/50"
                    onClick={() => setIsParticipantsOpen(false)}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-3">
                  {mockParticipants.map((participant) => (
                    <div key={participant.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <UserAvatar
                          user={{
                            id: participant.id,
                            name: participant.name,
                            avatar: "",
                          }}
                          className="h-8 w-8"
                          showStatus={false}
                        />
                        <div>
                          <div className="font-medium text-sm">
                            {participant.name}
                            {participant.id === "p1" && " (You)"}
                          </div>
                          <div className="text-xs text-muted-foreground flex items-center gap-1">
                            {participant.isSpeaking && <span className="text-green-500">Speaking</span>}
                            {!participant.isSpeaking && !participant.isMuted && <span>Not speaking</span>}
                            {participant.isMuted && <span className="text-red-500">Muted</span>}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {participant.isMuted && <MicOff className="h-3 w-3 text-red-500" />}
                        {!participant.isVideoOn && <VideoOff className="h-3 w-3 text-red-500" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="bg-black/80 border-t border-primary/20 p-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className={cn(
                "border-primary/30 hover:bg-primary/10",
                isMuted && "bg-destructive/20 text-destructive border-destructive/30 hover:bg-destructive/30",
              )}
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </Button>
            <Button
              variant="outline"
              size="icon"
              className={cn(
                "border-primary/30 hover:bg-primary/10",
                !isVideoOn && "bg-destructive/20 text-destructive border-destructive/30 hover:bg-destructive/30",
              )}
              onClick={() => setIsVideoOn(!isVideoOn)}
            >
              {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
            </Button>
            <Button
              variant="outline"
              size="icon"
              className={cn(
                "border-primary/30 hover:bg-primary/10",
                isScreenSharing && "bg-green-500/20 text-green-500 border-green-500/30 hover:bg-green-500/30",
              )}
              onClick={() => setIsScreenSharing(!isScreenSharing)}
            >
              <Share2 className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className={cn("border-primary/30 hover:bg-primary/10", isChatOpen && "bg-primary/20 text-primary")}
              onClick={() => {
                setIsChatOpen(!isChatOpen)
                if (isParticipantsOpen) setIsParticipantsOpen(false)
              }}
            >
              <MessageSquare className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className={cn(
                "border-primary/30 hover:bg-primary/10",
                isParticipantsOpen && "bg-primary/20 text-primary",
              )}
              onClick={() => {
                setIsParticipantsOpen(!isParticipantsOpen)
                if (isChatOpen) setIsChatOpen(false)
              }}
            >
              <Users className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="border-primary/30 hover:bg-primary/10">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleAction("Change background")}>Change background</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAction("Start recording")}>Start recording</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAction("Settings")}>
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Button
            variant="destructive"
            size="icon"
            className="bg-red-600 hover:bg-red-700"
            onClick={() => handleAction("End call")}
          >
            <Phone className="h-5 w-5 rotate-135" />
          </Button>
        </div>
      </div>
    </div>
  )
}

