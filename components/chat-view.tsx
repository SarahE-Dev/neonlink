"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { UserAvatar } from "@/components/user-avatar"
import { Send, Paperclip, Mic, ImageIcon, MoreVertical, Phone, Video, Info } from "lucide-react"
import { cn } from "@/lib/utils"
import { MessageBubble } from "@/components/message-bubble"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"
import { motion, AnimatePresence } from "framer-motion"

interface Chat {
  id: string
  name: string
  avatar: string
  status?: "online" | "offline" | "away" | "busy"
  isGroup?: boolean
  members?: { id: string; name: string; avatar: string }[]
  messages: Message[]
}

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

export function ChatView({ chat }: { chat: Chat }) {
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [messages, setMessages] = useState<Message[]>(chat.messages)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Simulate typing indicator
  useEffect(() => {
    if (chat.id === "2") {
      const timer = setTimeout(() => {
        setIsTyping(true)

        const responseTimer = setTimeout(() => {
          setIsTyping(false)
          const newMsg: Message = {
            id: `msg-${Date.now()}`,
            senderId: "2",
            senderName: chat.name,
            senderAvatar: chat.avatar,
            content: "I've got the data you requested. Check this out.",
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            type: "text",
            isRead: false,
          }

          setMessages((prev) => [...prev, newMsg])
        }, 3000)

        return () => clearTimeout(responseTimer)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [chat.id, chat.name, chat.avatar])

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      senderId: "current-user",
      senderName: "V",
      senderAvatar: "",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      type: "text",
      isRead: false,
    }

    setMessages((prev) => [...prev, newMsg])
    setNewMessage("")

    // Simulate typing response for certain chats
    if (chat.id === "1" || chat.id === "3") {
      setTimeout(() => {
        setIsTyping(true)

        setTimeout(() => {
          setIsTyping(false)
          const responseMsg: Message = {
            id: `msg-${Date.now()}`,
            senderId: chat.id,
            senderName: chat.name,
            senderAvatar: "",
            content:
              chat.id === "1"
                ? "Got it. I'll meet you at the rendezvous point."
                : "Thanks for the info. The netrunners will be pleased.",
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            type: "text",
            isRead: false,
          }

          setMessages((prev) => [...prev, responseMsg])
        }, 2000)
      }, 1000)
    }
  }

  const handleAttachment = (type: string) => {
    toast({
      title: `${type} attachment`,
      description: `${type} attachment feature activated`,
      variant: "default",
    })
  }

  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div className="flex items-center justify-between p-4 border-b border-primary/20 bg-black/60 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <UserAvatar user={chat} />
          <div>
            <h2 className="font-semibold">{chat.name}</h2>
            <p className="text-xs text-muted-foreground">
              {chat.status === "online" ? <span className="text-green-500">● Online</span> : "Last seen recently"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10">
            <Phone className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10">
            <Video className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10">
            <Info className="h-5 w-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View profile</DropdownMenuItem>
              <DropdownMenuItem>Search in conversation</DropdownMenuItem>
              <DropdownMenuItem>Mute notifications</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">Block user</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="message-appear"
            >
              <MessageBubble
                message={message}
                isOwnMessage={message.senderId === "current-user"}
                showAvatar={index === 0 || messages[index - 1].senderId !== message.senderId}
              />
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <div className="flex items-start gap-2">
            <UserAvatar
              user={{
                id: chat.id,
                name: chat.name,
                avatar: "",
                status: "online",
              }}
              className="w-8 h-8"
            />
            <div className="bg-background/50 rounded-lg p-3 max-w-[80%]">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Message input */}
      <div className="p-4 border-t border-primary/20 bg-black/60 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10">
                <Paperclip className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onClick={() => handleAttachment("Image")}>
                <ImageIcon className="h-4 w-4 mr-2 text-secondary" />
                Image
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAttachment("File")}>
                <Paperclip className="h-4 w-4 mr-2 text-accent" />
                File
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAttachment("Audio")}>
                <Mic className="h-4 w-4 mr-2 text-primary" />
                Audio
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSendMessage()
              }
            }}
            placeholder="Type a message..."
            className="bg-background/50 border-primary/30 focus-visible:ring-primary/50"
          />

          <Button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            size="icon"
            className={cn(
              "bg-primary/20 text-primary hover:bg-primary/30",
              !newMessage.trim() && "opacity-50 cursor-not-allowed",
            )}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}

