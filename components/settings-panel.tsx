"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserAvatar } from "@/components/user-avatar"
import { User, Bell, Monitor, Moon, Sun, Smartphone, Palette, Volume2, Lock, LogOut, Save } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"

export function SettingsPanel() {
  const [theme, setTheme] = useState("dark")
  const [accentColor, setAccentColor] = useState("cyan")
  const { toast } = useToast()

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated",
      variant: "default",
    })
  }

  return (
    <div className="container py-6 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight neon-text">Settings</h1>
          <p className="text-muted-foreground">Customize your NeonLink experience</p>
        </div>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-64 space-y-2">
            <TabsList className="flex flex-col h-auto bg-transparent space-y-1">
              <TabsTrigger
                value="profile"
                className="justify-start data-[state=active]:bg-primary/10 data-[state=active]:text-primary w-full"
              >
                <User className="h-4 w-4 mr-2" />
                Profile
              </TabsTrigger>
              <TabsTrigger
                value="appearance"
                className="justify-start data-[state=active]:bg-primary/10 data-[state=active]:text-primary w-full"
              >
                <Palette className="h-4 w-4 mr-2" />
                Appearance
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                className="justify-start data-[state=active]:bg-primary/10 data-[state=active]:text-primary w-full"
              >
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </TabsTrigger>
              <TabsTrigger
                value="audio-video"
                className="justify-start data-[state=active]:bg-primary/10 data-[state=active]:text-primary w-full"
              >
                <Volume2 className="h-4 w-4 mr-2" />
                Audio & Video
              </TabsTrigger>
              <TabsTrigger
                value="privacy"
                className="justify-start data-[state=active]:bg-primary/10 data-[state=active]:text-primary w-full"
              >
                <Lock className="h-4 w-4 mr-2" />
                Privacy & Security
              </TabsTrigger>
            </TabsList>

            <Card className="border-destructive/20 bg-destructive/5">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <LogOut className="h-5 w-5 text-destructive" />
                  <div>
                    <h4 className="font-medium text-destructive">Logout</h4>
                    <p className="text-xs text-muted-foreground">Sign out of your account</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex-1">
            <TabsContent value="profile" className="mt-0">
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                  <CardDescription>Manage your personal information and account settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="flex flex-col items-center gap-2">
                      <UserAvatar
                        user={{
                          id: "current-user",
                          name: "V",
                          avatar: "",
                          status: "online",
                        }}
                        className="h-20 w-20"
                      />
                      <Button variant="outline" size="sm" className="text-primary border-primary/30">
                        Change Avatar
                      </Button>
                    </div>
                    <div className="flex-1 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="username">Username</Label>
                          <Input id="username" defaultValue="V" className="bg-background/50 border-primary/30" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="display-name">Display Name</Label>
                          <Input id="display-name" defaultValue="V" className="bg-background/50 border-primary/30" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          defaultValue="v@nightcity.net"
                          className="bg-background/50 border-primary/30"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Input
                          id="bio"
                          defaultValue="Mercenary in Night City"
                          className="bg-background/50 border-primary/30"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Status</h3>
                    <RadioGroup defaultValue="online" className="flex flex-col space-y-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="online" id="online" />
                        <Label htmlFor="online" className="flex items-center">
                          <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                          Online
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="away" id="away" />
                        <Label htmlFor="away" className="flex items-center">
                          <span className="h-2 w-2 rounded-full bg-yellow-500 mr-2"></span>
                          Away
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="busy" id="busy" />
                        <Label htmlFor="busy" className="flex items-center">
                          <span className="h-2 w-2 rounded-full bg-red-500 mr-2"></span>
                          Busy
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="invisible" id="invisible" />
                        <Label htmlFor="invisible" className="flex items-center">
                          <span className="h-2 w-2 rounded-full bg-gray-500 mr-2"></span>
                          Invisible
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end border-t border-primary/10 pt-4">
                  <Button onClick={handleSave} className="bg-primary/20 text-primary hover:bg-primary/30 neon-border">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="appearance" className="mt-0">
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>Customize the look and feel of NeonLink</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Theme</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div
                        className={cn(
                          "border rounded-lg p-4 cursor-pointer hover:border-primary/50",
                          theme === "dark" && "border-primary neon-border",
                        )}
                        onClick={() => setTheme("dark")}
                      >
                        <div className="h-20 bg-black rounded-md mb-2 flex items-center justify-center">
                          <Moon className="h-6 w-6 text-primary" />
                        </div>
                        <div className="text-center font-medium">Dark</div>
                      </div>
                      <div
                        className={cn(
                          "border rounded-lg p-4 cursor-pointer hover:border-primary/50",
                          theme === "light" && "border-primary neon-border",
                        )}
                        onClick={() => setTheme("light")}
                      >
                        <div className="h-20 bg-gray-100 rounded-md mb-2 flex items-center justify-center">
                          <Sun className="h-6 w-6 text-orange-500" />
                        </div>
                        <div className="text-center font-medium">Light</div>
                      </div>
                      <div
                        className={cn(
                          "border rounded-lg p-4 cursor-pointer hover:border-primary/50",
                          theme === "system" && "border-primary neon-border",
                        )}
                        onClick={() => setTheme("system")}
                      >
                        <div className="h-20 bg-gradient-to-r from-black to-gray-100 rounded-md mb-2 flex items-center justify-center">
                          <Monitor className="h-6 w-6 text-blue-500" />
                        </div>
                        <div className="text-center font-medium">System</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Accent Color</h3>
                    <div className="grid grid-cols-4 gap-4">
                      <div
                        className={cn(
                          "border rounded-lg p-2 cursor-pointer hover:border-primary/50",
                          accentColor === "cyan" && "border-primary neon-border",
                        )}
                        onClick={() => setAccentColor("cyan")}
                      >
                        <div className="h-10 bg-cyan-500 rounded-md mb-2"></div>
                        <div className="text-center text-sm font-medium">Cyan</div>
                      </div>
                      <div
                        className={cn(
                          "border rounded-lg p-2 cursor-pointer hover:border-primary/50",
                          accentColor === "magenta" && "border-primary neon-border",
                        )}
                        onClick={() => setAccentColor("magenta")}
                      >
                        <div className="h-10 bg-fuchsia-500 rounded-md mb-2"></div>
                        <div className="text-center text-sm font-medium">Magenta</div>
                      </div>
                      <div
                        className={cn(
                          "border rounded-lg p-2 cursor-pointer hover:border-primary/50",
                          accentColor === "green" && "border-primary neon-border",
                        )}
                        onClick={() => setAccentColor("green")}
                      >
                        <div className="h-10 bg-green-500 rounded-md mb-2"></div>
                        <div className="text-center text-sm font-medium">Green</div>
                      </div>
                      <div
                        className={cn(
                          "border rounded-lg p-2 cursor-pointer hover:border-primary/50",
                          accentColor === "orange" && "border-primary neon-border",
                        )}
                        onClick={() => setAccentColor("orange")}
                      >
                        <div className="h-10 bg-orange-500 rounded-md mb-2"></div>
                        <div className="text-center text-sm font-medium">Orange</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Interface</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="compact-mode">Compact Mode</Label>
                          <p className="text-sm text-muted-foreground">Use a more compact UI layout</p>
                        </div>
                        <Switch id="compact-mode" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="animations">Animations</Label>
                          <p className="text-sm text-muted-foreground">Enable UI animations and effects</p>
                        </div>
                        <Switch id="animations" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="glitch-effects">Glitch Effects</Label>
                          <p className="text-sm text-muted-foreground">Enable cyberpunk glitch effects</p>
                        </div>
                        <Switch id="glitch-effects" defaultChecked />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end border-t border-primary/10 pt-4">
                  <Button onClick={handleSave} className="bg-primary/20 text-primary hover:bg-primary/30 neon-border">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="mt-0">
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>Configure how you receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="enable-notifications">Enable Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive notifications from NeonLink</p>
                      </div>
                      <Switch id="enable-notifications" defaultChecked />
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Notification Types</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="direct-messages">Direct Messages</Label>
                            <p className="text-sm text-muted-foreground">Notifications for new direct messages</p>
                          </div>
                          <Switch id="direct-messages" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="group-messages">Group Messages</Label>
                            <p className="text-sm text-muted-foreground">Notifications for new group messages</p>
                          </div>
                          <Switch id="group-messages" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="mentions">Mentions</Label>
                            <p className="text-sm text-muted-foreground">Notifications when you are mentioned</p>
                          </div>
                          <Switch id="mentions" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="calls">Calls</Label>
                            <p className="text-sm text-muted-foreground">Notifications for incoming calls</p>
                          </div>
                          <Switch id="calls" defaultChecked />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Sound & Vibration</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="notification-sound">Notification Sound</Label>
                            <p className="text-sm text-muted-foreground">Play sound for notifications</p>
                          </div>
                          <Switch id="notification-sound" defaultChecked />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="sound-volume">Sound Volume</Label>
                            <span className="text-sm text-muted-foreground">70%</span>
                          </div>
                          <Slider defaultValue={[70]} max={100} step={1} className="py-2" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Do Not Disturb</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="dnd-mode">Do Not Disturb Mode</Label>
                            <p className="text-sm text-muted-foreground">Mute all notifications</p>
                          </div>
                          <Switch id="dnd-mode" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="dnd-schedule">Schedule</Label>
                          <Select defaultValue="off">
                            <SelectTrigger id="dnd-schedule" className="bg-background/50 border-primary/30">
                              <SelectValue placeholder="Select schedule" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="off">Off</SelectItem>
                              <SelectItem value="night">Night (10 PM - 7 AM)</SelectItem>
                              <SelectItem value="work">Work Hours (9 AM - 5 PM)</SelectItem>
                              <SelectItem value="custom">Custom Schedule</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end border-t border-primary/10 pt-4">
                  <Button onClick={handleSave} className="bg-primary/20 text-primary hover:bg-primary/30 neon-border">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="audio-video" className="mt-0">
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle>Audio & Video</CardTitle>
                  <CardDescription>Configure your audio and video settings for calls</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Audio Settings</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="microphone">Microphone</Label>
                        <Select defaultValue="default">
                          <SelectTrigger id="microphone" className="bg-background/50 border-primary/30">
                            <SelectValue placeholder="Select microphone" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="default">Default Microphone</SelectItem>
                            <SelectItem value="headset">Headset Microphone</SelectItem>
                            <SelectItem value="external">External Microphone</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="mic-volume">Microphone Volume</Label>
                          <span className="text-sm text-muted-foreground">80%</span>
                        </div>
                        <Slider defaultValue={[80]} max={100} step={1} className="py-2" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="speakers">Speakers</Label>
                        <Select defaultValue="default">
                          <SelectTrigger id="speakers" className="bg-background/50 border-primary/30">
                            <SelectValue placeholder="Select speakers" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="default">Default Speakers</SelectItem>
                            <SelectItem value="headphones">Headphones</SelectItem>
                            <SelectItem value="external">External Speakers</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="speaker-volume">Speaker Volume</Label>
                          <span className="text-sm text-muted-foreground">75%</span>
                        </div>
                        <Slider defaultValue={[75]} max={100} step={1} className="py-2" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Video Settings</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="camera">Camera</Label>
                        <Select defaultValue="default">
                          <SelectTrigger id="camera" className="bg-background/50 border-primary/30">
                            <SelectValue placeholder="Select camera" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="default">Default Camera</SelectItem>
                            <SelectItem value="external">External Webcam</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="video-quality">Video Quality</Label>
                        <Select defaultValue="high">
                          <SelectTrigger id="video-quality" className="bg-background/50 border-primary/30">
                            <SelectValue placeholder="Select video quality" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low (360p)</SelectItem>
                            <SelectItem value="medium">Medium (720p)</SelectItem>
                            <SelectItem value="high">High (1080p)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="background-blur">Background Blur</Label>
                          <p className="text-sm text-muted-foreground">Blur your background during video calls</p>
                        </div>
                        <Switch id="background-blur" defaultChecked />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Call Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="auto-answer">Auto-Answer Calls</Label>
                          <p className="text-sm text-muted-foreground">Automatically answer incoming calls</p>
                        </div>
                        <Switch id="auto-answer" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="noise-suppression">Noise Suppression</Label>
                          <p className="text-sm text-muted-foreground">Reduce background noise during calls</p>
                        </div>
                        <Switch id="noise-suppression" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="echo-cancellation">Echo Cancellation</Label>
                          <p className="text-sm text-muted-foreground">Prevent echo during calls</p>
                        </div>
                        <Switch id="echo-cancellation" defaultChecked />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end border-t border-primary/10 pt-4">
                  <Button onClick={handleSave} className="bg-primary/20 text-primary hover:bg-primary/30 neon-border">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="privacy" className="mt-0">
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle>Privacy & Security</CardTitle>
                  <CardDescription>Manage your privacy and security settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Privacy</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="read-receipts">Read Receipts</Label>
                          <p className="text-sm text-muted-foreground">
                            Let others know when you've read their messages
                          </p>
                        </div>
                        <Switch id="read-receipts" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="typing-indicators">Typing Indicators</Label>
                          <p className="text-sm text-muted-foreground">Show when you're typing a message</p>
                        </div>
                        <Switch id="typing-indicators" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="last-seen">Last Seen</Label>
                          <p className="text-sm text-muted-foreground">Show when you were last active</p>
                        </div>
                        <Switch id="last-seen" defaultChecked />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Security</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                          <p className="text-sm text-muted-foreground">
                            Add an extra layer of security to your account
                          </p>
                        </div>
                        <Switch id="two-factor" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="end-to-end">End-to-End Encryption</Label>
                          <p className="text-sm text-muted-foreground">Encrypt all your messages</p>
                        </div>
                        <Switch id="end-to-end" defaultChecked />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="login-devices">Active Sessions</Label>
                        <Card className="border-primary/10">
                          <CardContent className="p-4 space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Smartphone className="h-4 w-4 text-primary" />
                                <div>
                                  <div className="text-sm font-medium">Mobile Device</div>
                                  <div className="text-xs text-muted-foreground">Last active: Just now</div>
                                </div>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-destructive border-destructive/30 hover:bg-destructive/10"
                              >
                                Logout
                              </Button>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Monitor className="h-4 w-4 text-primary" />
                                <div>
                                  <div className="text-sm font-medium">Desktop (Current)</div>
                                  <div className="text-xs text-muted-foreground">Last active: Now</div>
                                </div>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-primary border-primary/30 hover:bg-primary/10"
                                disabled
                              >
                                Current
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Blocked Contacts</h3>
                    <p className="text-sm text-muted-foreground">You have no blocked contacts</p>
                    <Button variant="outline" className="text-primary border-primary/30 hover:bg-primary/10">
                      Manage Blocked Contacts
                    </Button>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end border-t border-primary/10 pt-4">
                  <Button onClick={handleSave} className="bg-primary/20 text-primary hover:bg-primary/30 neon-border">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  )
}

