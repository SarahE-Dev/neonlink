"use client"

import { Button } from "@/components/ui/button"
import { MessageSquare, Users, Image } from "lucide-react"
import { motion } from "framer-motion"

export function WelcomeScreen() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md"
      >
        <h1 className="text-4xl font-bold mb-2 tracking-tight neon-text">
          Welcome to <span className="text-secondary neon-text-secondary">NEON</span>
          <span className="text-accent neon-text-accent">LINK</span>
        </h1>
        <p className="text-muted-foreground mb-8">
          The next generation cyberpunk messaging platform for the digital age
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-primary/5 border border-primary/20 p-4 rounded-lg neon-border"
          >
            <MessageSquare className="h-8 w-8 text-primary mb-2 mx-auto" />
            <h3 className="font-medium text-primary">Secure Messaging</h3>
            <p className="text-sm text-muted-foreground">End-to-end encrypted communications</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-secondary/5 border border-secondary/20 p-4 rounded-lg"
            style={{ boxShadow: "0 0 5px var(--secondary), 0 0 10px var(--secondary)" }}
          >
            <Users className="h-8 w-8 text-secondary mb-2 mx-auto" />
            <h3 className="font-medium text-secondary">Group Chats</h3>
            <p className="text-sm text-muted-foreground">Create and manage group conversations</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-accent/5 border border-accent/20 p-4 rounded-lg"
            style={{ boxShadow: "0 0 5px var(--accent), 0 0 10px var(--accent)" }}
          >
            <Image className="h-8 w-8 text-accent mb-2 mx-auto" />
            <h3 className="font-medium text-accent">Media Sharing</h3>
            <p className="text-sm text-muted-foreground">Share images, videos, and files</p>
          </motion.div>
        </div>

        <p className="text-sm text-muted-foreground mb-4">Select a chat from the sidebar or start a new conversation</p>

        <Button className="bg-primary/20 text-primary hover:bg-primary/30 neon-border">Start Messaging</Button>
      </motion.div>
    </div>
  )
}

