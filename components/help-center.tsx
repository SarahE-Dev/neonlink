"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, HelpCircle, FileText, MessageSquare, Video, Phone, Settings, Shield, ChevronRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { motion } from "framer-motion"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"

// Mock help categories
const helpCategories = [
  { id: "getting-started", name: "Getting Started", icon: HelpCircle, color: "text-primary" },
  { id: "messaging", name: "Messaging", icon: MessageSquare, color: "text-secondary" },
  { id: "video-calls", name: "Video Calls", icon: Video, color: "text-accent" },
  { id: "audio-calls", name: "Audio Calls", icon: Phone, color: "text-green-500" },
  { id: "settings", name: "Settings", icon: Settings, color: "text-orange-500" },
  { id: "privacy", name: "Security", icon: Shield, color: "text-purple-500" },
]

// Mock FAQs
const faqs = [
  {
    question: "How do I create a group chat?",
    answer:
      "To create a group chat, go to the Chats tab, click the '+' button, and select 'New Group'. Then, add the contacts you want to include and give your group a name.",
  },
  {
    question: "Can I use NeonLink on multiple devices?",
    answer:
      "Yes, NeonLink supports multiple devices. Simply log in with your account on each device. Your messages and settings will sync automatically.",
  },
  {
    question: "How do I change my profile picture?",
    answer:
      "To change your profile picture, go to Settings > Profile, then click on your current avatar and select 'Change Avatar'. You can upload a new image from your device.",
  },
  {
    question: "Is my data encrypted?",
    answer:
      "Yes, NeonLink uses end-to-end encryption for all messages and calls. This means only you and the person you're communicating with can read or hear the content.",
  },
  {
    question: "How do I start a video call?",
    answer:
      "To start a video call, open a chat with the person you want to call, then click the video camera icon in the top right corner. You can also go to the Video tab and start a new call from there.",
  },
  {
    question: "How do I share files and media?",
    answer:
      "To share files or media, open a chat and click the paperclip icon next to the message input. You can then select the type of media you want to share (image, file, audio) and choose the file from your device.",
  },
  {
    question: "Can I delete messages after sending them?",
    answer:
      "Yes, you can delete messages after sending them. Long-press or right-click on the message you want to delete, then select 'Delete' from the menu. You can choose to delete it just for yourself or for everyone in the chat.",
  },
]

export function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("getting-started")
  const { toast } = useToast()

  const handleContactSupport = () => {
    toast({
      title: "Support request sent",
      description: "Our team will get back to you shortly",
      variant: "default",
    })
  }

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="container py-6 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight neon-text">Help Center</h1>
          <p className="text-muted-foreground">Find answers to your questions about NeonLink</p>
        </div>
        <Button className="bg-primary/20 text-primary hover:bg-primary/30 neon-border" onClick={handleContactSupport}>
          <MessageSquare className="h-4 w-4 mr-2" />
          Contact Support
        </Button>
      </div>

      <div className="flex items-center gap-2 mb-6">
        <Input
          placeholder="Search for help..."
          className="bg-background/50 border-primary/30 focus-visible:ring-primary/50"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          prefix={<Search className="h-4 w-4 text-muted-foreground" />}
        />
      </div>

      {!searchQuery && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {helpCategories.map((category) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.03 }}
            >
              <Card
                className={cn(
                  "border-primary/20 hover:neon-border cursor-pointer transition-all duration-300",
                  activeCategory === category.id && "bg-primary/5 neon-border",
                )}
                onClick={() => setActiveCategory(category.id)}
              >
                <CardContent className="p-6 flex items-center gap-4">
                  <div
                    className={cn(
                      "p-3 rounded-full bg-background/50",
                      category.id === activeCategory && "bg-primary/10",
                    )}
                  >
                    <category.icon className={cn("h-6 w-6", category.color)} />
                  </div>
                  <div>
                    <h3 className="font-medium">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">View guides</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground ml-auto" />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      <div className="space-y-6">
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle>
              {searchQuery
                ? "Search Results"
                : activeCategory === "getting-started"
                  ? "Getting Started with NeonLink"
                  : `${helpCategories.find((c) => c.id === activeCategory)?.name} Help`}
            </CardTitle>
            <CardDescription>
              {searchQuery
                ? `Found ${filteredFaqs.length} results for "${searchQuery}"`
                : "Frequently asked questions and guides"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {filteredFaqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left hover:text-primary">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {filteredFaqs.length === 0 && (
              <div className="flex flex-col items-center justify-center py-8">
                <HelpCircle className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No results found</h3>
                <p className="text-muted-foreground text-center max-w-md">
                  We couldn't find any help articles matching your search. Try different keywords or contact our support
                  team.
                </p>
                <Button className="mt-4 bg-primary/20 text-primary hover:bg-primary/30" onClick={handleContactSupport}>
                  Contact Support
                </Button>
              </div>
            )}
          </CardContent>
          <CardFooter className="border-t border-primary/10 pt-4 flex flex-col items-start">
            <h3 className="font-medium mb-2">Still need help?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              If you couldn't find what you're looking for, our support team is ready to assist you.
            </p>
            <div className="flex gap-4">
              <Button
                variant="outline"
                className="border-primary/30 text-primary hover:bg-primary/10"
                onClick={handleContactSupport}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Live Chat
              </Button>
              <Button
                variant="outline"
                className="border-secondary/30 text-secondary hover:bg-secondary/10"
                onClick={() =>
                  toast({
                    title: "Documentation",
                    description: "Opening full documentation",
                    variant: "default",
                  })
                }
              >
                <FileText className="h-4 w-4 mr-2" />
                View Documentation
              </Button>
            </div>
          </CardFooter>
        </Card>

        {!searchQuery && activeCategory === "getting-started" && (
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle>Quick Start Guide</CardTitle>
              <CardDescription>Get up and running with NeonLink in minutes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 text-primary rounded-full w-8 h-8 flex items-center justify-center shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-medium mb-1">Create your profile</h3>
                  <p className="text-sm text-muted-foreground">
                    Set up your profile with a display name and avatar. This helps your contacts identify you.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 text-primary rounded-full w-8 h-8 flex items-center justify-center shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-medium mb-1">Add contacts</h3>
                  <p className="text-sm text-muted-foreground">
                    Start adding contacts to your network. You can search for users by their username or scan their QR
                    code.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 text-primary rounded-full w-8 h-8 flex items-center justify-center shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-medium mb-1">Start messaging</h3>
                  <p className="text-sm text-muted-foreground">
                    Begin conversations with your contacts. You can send text messages, images, files, and more.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 text-primary rounded-full w-8 h-8 flex items-center justify-center shrink-0">
                  4
                </div>
                <div>
                  <h3 className="font-medium mb-1">Create groups</h3>
                  <p className="text-sm text-muted-foreground">
                    Set up group chats for team collaboration or social circles. Add multiple contacts to a single
                    conversation.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 text-primary rounded-full w-8 h-8 flex items-center justify-center shrink-0">
                  5
                </div>
                <div>
                  <h3 className="font-medium mb-1">Make calls</h3>
                  <p className="text-sm text-muted-foreground">
                    Start audio or video calls with your contacts. You can also host group calls with multiple
                    participants.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-primary/10 pt-4">
              <Button
                className="bg-primary/20 text-primary hover:bg-primary/30 w-full"
                onClick={() =>
                  toast({
                    title: "Tutorial",
                    description: "Starting interactive tutorial",
                    variant: "default",
                  })
                }
              >
                Start Interactive Tutorial
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  )
}

