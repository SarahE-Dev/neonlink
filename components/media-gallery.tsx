"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Image, FileText, Music, VideoIcon, Download, Eye, Share2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { useToast } from "@/components/ui/use-toast"

// Enhanced mock media data with cyberpunk-themed names and better descriptions
const mockImages = [
  {
    id: "img1",
    name: "Night City Skyline",
    type: "image",
    size: "2.4 MB",
    date: "Today",
    url: "/placeholder.svg?height=400&width=600&text=Night+City+Skyline",
    description: "Panoramic view of Night City at dusk, neon lights reflecting off skyscrapers",
  },
  {
    id: "img2",
    name: "Afterlife Club Entrance",
    type: "image",
    size: "1.8 MB",
    date: "Yesterday",
    url: "/placeholder.svg?height=400&width=600&text=Afterlife+Club",
    description: "The iconic entrance to the Afterlife mercenary bar",
  },
  {
    id: "img3",
    name: "Corpo Plaza Protest",
    type: "image",
    size: "3.2 MB",
    date: "2 days ago",
    url: "/placeholder.svg?height=400&width=600&text=Corpo+Plaza+Protest",
    description: "Anti-corporate protesters gathered at Corpo Plaza",
  },
  {
    id: "img4",
    name: "Kabuki Market Vendors",
    type: "image",
    size: "2.1 MB",
    date: "3 days ago",
    url: "/placeholder.svg?height=400&width=600&text=Kabuki+Market",
    description: "Street vendors selling tech and food in Kabuki Market",
  },
  {
    id: "img5",
    name: "Arasaka Tower at Night",
    type: "image",
    size: "4.5 MB",
    date: "1 week ago",
    url: "/placeholder.svg?height=400&width=600&text=Arasaka+Tower",
    description: "Imposing view of Arasaka Tower illuminated against the night sky",
  },
  {
    id: "img6",
    name: "Pacifica Abandoned Mall",
    type: "image",
    size: "3.7 MB",
    date: "1 week ago",
    url: "/placeholder.svg?height=400&width=600&text=Pacifica+Mall",
    description: "The deteriorating Grand Imperial Mall in Pacifica",
  },
  {
    id: "img7",
    name: "Cyberware Installation",
    type: "image",
    size: "5.2 MB",
    date: "2 weeks ago",
    url: "/placeholder.svg?height=400&width=600&text=Cyberware+Installation",
    description: "Ripperdoc installing new cyberware implants",
  },
  {
    id: "img8",
    name: "Maelstrom Gang Territory",
    type: "image",
    size: "4.1 MB",
    date: "2 weeks ago",
    url: "/placeholder.svg?height=400&width=600&text=Maelstrom+Territory",
    description: "Heavily modified Maelstrom gang members in their territory",
  },
  {
    id: "img9",
    name: "Delamain Taxi Fleet",
    type: "image",
    size: "3.3 MB",
    date: "3 weeks ago",
    url: "/placeholder.svg?height=400&width=600&text=Delamain+Taxi+Fleet",
    description: "The autonomous Delamain taxi fleet headquarters",
  },
]

const mockDocuments = [
  {
    id: "doc1",
    name: "Arasaka Security Protocols.pdf",
    type: "document",
    size: "4.2 MB",
    date: "Today",
    icon: FileText,
    description: "Leaked internal security protocols for Arasaka facilities",
  },
  {
    id: "doc2",
    name: "Militech Weapons Catalog.pdf",
    type: "document",
    size: "8.7 MB",
    date: "Yesterday",
    icon: FileText,
    description: "Complete catalog of Militech's latest weapons and combat systems",
  },
  {
    id: "doc3",
    name: "Night City Districts Map.pdf",
    type: "document",
    size: "12.3 MB",
    date: "3 days ago",
    icon: FileText,
    description: "Detailed map of all Night City districts with points of interest",
  },
  {
    id: "doc4",
    name: "Netrunner's Guide to ICE.txt",
    type: "document",
    size: "1.1 MB",
    date: "1 week ago",
    icon: FileText,
    description: "Comprehensive guide to breaking through corporate ICE security systems",
  },
  {
    id: "doc5",
    name: "Trauma Team Coverage Plans.pdf",
    type: "document",
    size: "3.5 MB",
    date: "1 week ago",
    icon: FileText,
    description: "Different coverage tiers and response times for Trauma Team medical services",
  },
  {
    id: "doc6",
    name: "Cyberware Side Effects Report.pdf",
    type: "document",
    size: "5.8 MB",
    date: "2 weeks ago",
    icon: FileText,
    description: "Medical report on long-term side effects of extensive cyberware implantation",
  },
]

const mockAudio = [
  {
    id: "aud1",
    name: "Johnny Silverhand - Chippin' In.mp3",
    type: "audio",
    size: "8.4 MB",
    date: "2 days ago",
    duration: "4:12",
    icon: Music,
    description: "Live recording from Johnny Silverhand's last concert",
  },
  {
    id: "aud2",
    name: "Kerry Eurodyne - A Like Supreme.mp3",
    type: "audio",
    size: "7.8 MB",
    date: "3 days ago",
    duration: "3:45",
    icon: Music,
    description: "Kerry Eurodyne's cover of Samurai's classic hit",
  },
  {
    id: "aud3",
    name: "Us Cracks - PonPon Shit.mp3",
    type: "audio",
    size: "6.2 MB",
    date: "1 week ago",
    duration: "3:22",
    icon: Music,
    description: "Latest hit single from the popular group Us Cracks",
  },
  {
    id: "aud4",
    name: "Samurai - Never Fade Away.mp3",
    type: "audio",
    size: "9.1 MB",
    date: "2 weeks ago",
    duration: "5:01",
    icon: Music,
    description: "Original recording of Samurai's most famous song",
  },
  {
    id: "aud5",
    name: "NCPD Scanner Feed.mp3",
    type: "audio",
    size: "15.3 MB",
    date: "3 days ago",
    duration: "18:45",
    icon: Music,
    description: "Recorded police scanner communications during a major corpo raid",
  },
  {
    id: "aud6",
    name: "Lizzy Wizzy - Delusion.mp3",
    type: "audio",
    size: "7.5 MB",
    date: "1 week ago",
    duration: "4:33",
    icon: Music,
    description: "Unreleased track from chrome pop star Lizzy Wizzy",
  },
]

const mockVideos = [
  {
    id: "vid1",
    name: "Braindance Recording - Arasaka Heist.mp4",
    type: "video",
    size: "128 MB",
    date: "Yesterday",
    duration: "15:32",
    url: "/placeholder.svg?height=400&width=600&text=Braindance+Recording",
    icon: VideoIcon,
    description: "First-person braindance recording of a high-risk Arasaka heist",
  },
  {
    id: "vid2",
    name: "N54 News - Corpo Wars Update.mp4",
    type: "video",
    size: "84 MB",
    date: "3 days ago",
    duration: "8:45",
    url: "/placeholder.svg?height=400&width=600&text=N54+News",
    icon: VideoIcon,
    description: "Latest news report on the escalating conflict between Arasaka and Militech",
  },
  {
    id: "vid3",
    name: "Combat Tutorial - Mantis Blades.mp4",
    type: "video",
    size: "156 MB",
    date: "1 week ago",
    duration: "22:18",
    url: "/placeholder.svg?height=400&width=600&text=Mantis+Blades+Tutorial",
    icon: VideoIcon,
    description: "Comprehensive tutorial on effective mantis blade combat techniques",
  },
  {
    id: "vid4",
    name: "Netrunning Basics - Quickhacking.mp4",
    type: "video",
    size: "112 MB",
    date: "2 weeks ago",
    duration: "18:05",
    url: "/placeholder.svg?height=400&width=600&text=Netrunning+Basics",
    icon: VideoIcon,
    description: "Introduction to quickhacking for aspiring netrunners",
  },
  {
    id: "vid5",
    name: "Trauma Team Extraction - Live Footage.mp4",
    type: "video",
    size: "175 MB",
    date: "5 days ago",
    duration: "12:47",
    url: "/placeholder.svg?height=400&width=600&text=Trauma+Team+Extraction",
    icon: VideoIcon,
    description: "Captured footage of a Trauma Team platinum-tier extraction operation",
  },
  {
    id: "vid6",
    name: "Cyberpsychosis Documentary.mp4",
    type: "video",
    size: "230 MB",
    date: "3 weeks ago",
    duration: "45:22",
    url: "/placeholder.svg?height=400&width=600&text=Cyberpsychosis+Documentary",
    icon: VideoIcon,
    description: "In-depth documentary about the rising cases of cyberpsychosis in Night City",
  },
]

export function MediaGallery() {
  const [searchQuery, setSearchQuery] = useState("")
  const { toast } = useToast()

  const handleAction = (action: string, item: any) => {
    toast({
      title: `${action}: ${item.name}`,
      description: `Action simulated for demonstration purposes`,
      variant: "default",
    })
  }

  const filterItems = (items: any[]) => {
    return items.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase())),
    )
  }

  return (
    <div className="container py-6 max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight neon-text">Media Gallery</h1>
          <p className="text-muted-foreground">View and manage your shared media</p>
        </div>
        <Button className="bg-primary/20 text-primary hover:bg-primary/30 neon-border">
          <Image className="h-4 w-4 mr-2" />
          Upload Media
        </Button>
      </div>

      <div className="flex items-center gap-2 mb-6">
        <Input
          placeholder="Search media..."
          className="bg-background/50 border-primary/30 focus-visible:ring-primary/50"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          prefix={<Search className="h-4 w-4 text-muted-foreground" />}
        />
      </div>

      <Tabs defaultValue="images" className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="images" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
            <Image className="h-4 w-4 mr-2" />
            Images
          </TabsTrigger>
          <TabsTrigger value="documents" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
            <FileText className="h-4 w-4 mr-2" />
            Documents
          </TabsTrigger>
          <TabsTrigger value="audio" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
            <Music className="h-4 w-4 mr-2" />
            Audio
          </TabsTrigger>
          <TabsTrigger value="videos" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
            <VideoIcon className="h-4 w-4 mr-2" />
            Videos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="images" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterItems(mockImages).map((image) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.03 }}
              >
                <Card className="bg-black/60 border-primary/20 overflow-hidden hover:neon-border transition-all duration-300">
                  <div className="relative group">
                    <div className="w-full h-48 bg-gradient-to-br from-black/80 to-black/60 flex items-center justify-center">
                      <div className="text-center p-4">
                        <h3 className="text-lg font-medium text-primary">{image.name}</h3>
                        <p className="text-sm text-white/70 mt-2">{image.description.substring(0, 50)}...</p>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-end p-3 gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-white hover:bg-white/20"
                        onClick={() => handleAction("View", image)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-white hover:bg-white/20"
                        onClick={() => handleAction("Download", image)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-white hover:bg-white/20"
                        onClick={() => handleAction("Share", image)}
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="font-medium truncate">{image.name}</div>
                    <div className="text-sm text-muted-foreground flex justify-between mt-1">
                      <span>{image.size}</span>
                      <span>{image.date}</span>
                    </div>
                    {image.description && (
                      <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{image.description}</p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterItems(mockDocuments).map((doc) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.03 }}
              >
                <Card className="bg-black/60 border-primary/20 overflow-hidden hover:neon-border transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="bg-secondary/10 p-4 rounded-md">
                        <doc.icon className="h-8 w-8 text-secondary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{doc.name}</div>
                        <div className="text-sm text-muted-foreground flex justify-between mt-1">
                          <span>{doc.size}</span>
                          <span>{doc.date}</span>
                        </div>
                      </div>
                    </div>
                    {doc.description && (
                      <p className="text-xs text-muted-foreground mt-3 line-clamp-2">{doc.description}</p>
                    )}
                    <div className="flex justify-end gap-2 mt-4">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-primary hover:bg-primary/10"
                        onClick={() => handleAction("View", doc)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-primary hover:bg-primary/10"
                        onClick={() => handleAction("Download", doc)}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="audio" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filterItems(mockAudio).map((audio) => (
              <motion.div
                key={audio.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="bg-black/60 border-primary/20 overflow-hidden hover:neon-border transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-accent/10 p-3 rounded-md">
                        <audio.icon className="h-6 w-6 text-accent" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{audio.name}</div>
                        <div className="text-sm text-muted-foreground flex justify-between mt-1">
                          <span>{audio.size}</span>
                          <span>{audio.duration}</span>
                        </div>
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-accent hover:bg-accent/10"
                        onClick={() => handleAction("Play", audio)}
                      >
                        <Music className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-accent hover:bg-accent/10"
                        onClick={() => handleAction("Download", audio)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="mt-3 h-1 bg-accent/20 rounded-full overflow-hidden">
                      <div className="h-full bg-accent" style={{ width: `${Math.random() * 100}%` }}></div>
                    </div>
                    {audio.description && (
                      <p className="text-xs text-muted-foreground mt-3 line-clamp-2">{audio.description}</p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="videos" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filterItems(mockVideos).map((video) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.03 }}
              >
                <Card className="bg-black/60 border-primary/20 overflow-hidden hover:neon-border transition-all duration-300">
                  <div className="relative group">
                    <div className="w-full h-48 bg-gradient-to-br from-black/80 to-black/60 flex items-center justify-center">
                      <div className="text-center p-4">
                        <h3 className="text-lg font-medium text-primary">{video.name.split(".")[0]}</h3>
                        <p className="text-sm text-white/70 mt-2">{video.description.substring(0, 50)}...</p>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Button
                          size="icon"
                          className="bg-primary/30 text-white hover:bg-primary/50 rounded-full h-12 w-12"
                          onClick={() => handleAction("Play", video)}
                        >
                          <VideoIcon className="h-6 w-6" />
                        </Button>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="font-medium truncate">{video.name}</div>
                    <div className="text-sm text-muted-foreground flex justify-between mt-1">
                      <span>{video.size}</span>
                      <span>{video.date}</span>
                    </div>
                    {video.description && (
                      <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{video.description}</p>
                    )}
                    <div className="flex justify-end gap-2 mt-3">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-primary hover:bg-primary/10"
                        onClick={() => handleAction("Download", video)}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-primary hover:bg-primary/10"
                        onClick={() => handleAction("Share", video)}
                      >
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

