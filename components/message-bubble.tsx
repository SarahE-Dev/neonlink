"use client"

import { useState } from "react"
import { UserAvatar } from "@/components/user-avatar"
import { cn } from "@/lib/utils"
import { Check, CheckCheck, Download, FileText, MoreVertical, Trash } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { motion } from "framer-motion"

interface Message {
  id: string
  senderId: string
  senderName: string
  senderAvatar: string
  content: string
  timestamp: string
  type: "text" | "image" | "file" | "audio"
  fileUrl?: string
  fileName?: string
  isRead?: boolean
}

interface MessageBubbleProps {
  message: Message
  isOwnMessage: boolean
  showAvatar: boolean
}

export function MessageBubble({ message, isOwnMessage, showAvatar }: MessageBubbleProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={cn("flex items-start gap-2 mb-2 group", isOwnMessage && "flex-row-reverse")}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {showAvatar ? (
        <UserAvatar
          user={{
            id: message.senderId,
            name: message.senderName,
            avatar: message.senderAvatar,
          }}
          className="w-8 h-8"
          showStatus={false}
        />
      ) : (
        <div className="w-8 h-8" />
      )}

      <div className="max-w-[80%]">
        {showAvatar && !isOwnMessage && (
          <div className="text-xs text-muted-foreground mb-1 ml-1">{message.senderName}</div>
        )}

        <div className="flex items-end gap-2">
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className={cn("order-first", isOwnMessage && "order-last")}
            >
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="text-muted-foreground hover:text-foreground">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align={isOwnMessage ? "end" : "start"}>
                  <DropdownMenuItem>Reply</DropdownMenuItem>
                  <DropdownMenuItem>Forward</DropdownMenuItem>
                  <DropdownMenuItem>Copy</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">
                    <Trash className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </motion.div>
          )}

          <div
            className={cn(
              "rounded-lg p-3",
              isOwnMessage
                ? "bg-primary/30 text-white rounded-tr-none border border-primary/50"
                : "bg-background/50 rounded-tl-none",
            )}
          >
            {message.type === "text" && <div>{message.content}</div>}

            {message.type === "image" && (
              <div className="space-y-2">
                <div className="relative rounded-md overflow-hidden">
                  <img
                    src={message.fileUrl || "/placeholder.svg?height=200&width=300"}
                    alt="Image"
                    className="max-w-[240px] rounded-md hover:opacity-90 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end justify-end p-2">
                    <button className="bg-background/80 p-1 rounded-full">
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                {message.content && <div>{message.content}</div>}
              </div>
            )}

            {message.type === "file" && (
              <div className="flex items-center gap-2 bg-background/30 p-2 rounded-md">
                <div className="bg-primary/10 p-2 rounded-md">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{message.fileName || "document.pdf"}</div>
                  <div className="text-xs text-muted-foreground">2.4 MB</div>
                </div>
                <button className="text-primary hover:text-primary/80">
                  <Download className="h-4 w-4" />
                </button>
              </div>
            )}

            {message.type === "audio" && (
              <div className="flex items-center gap-2 bg-background/30 p-2 rounded-md">
                <div className="bg-secondary/10 p-2 rounded-md">
                  <FileText className="h-6 w-6 text-secondary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{message.fileName || "voice-message.mp3"}</div>
                  <div className="text-xs text-muted-foreground">0:12</div>
                </div>
                <button className="text-secondary hover:text-secondary/80">
                  <Download className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        <div
          className={cn(
            "text-xs text-muted-foreground mt-1 flex items-center gap-1",
            isOwnMessage ? "justify-end mr-1" : "ml-1",
          )}
        >
          {message.timestamp}
          {isOwnMessage &&
            (message.isRead ? <CheckCheck className="h-3 w-3 text-primary" /> : <Check className="h-3 w-3" />)}
        </div>
      </div>
    </div>
  )
}

