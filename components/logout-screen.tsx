"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { LogOut, AlertTriangle, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

export function LogoutScreen() {
  const router = useRouter()

  const handleLogout = () => {
    // In a real app, this would handle the logout logic
    router.push("/chats")
  }

  const handleCancel = () => {
    router.push("/chats")
  }

  return (
    <div className="flex items-center justify-center h-full p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="max-w-md w-full"
      >
        <Card className="border-destructive/20 bg-destructive/5">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="bg-destructive/20 p-3 rounded-full">
                <LogOut className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <CardTitle>Logout</CardTitle>
                <CardDescription>Sign out of your NeonLink account</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-background/50 border border-destructive/20 rounded-lg p-4 flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-destructive mb-1">Are you sure you want to logout?</h3>
                <p className="text-sm text-muted-foreground">
                  You will need to enter your credentials again to access your account. Any unsaved changes may be lost.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Before you go:</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                  You will be logged out from this device only
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                  Your messages and data will remain secure
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                  You can log back in at any time
                </li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
            <Button variant="destructive" className="w-full sm:w-auto" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
            <Button
              variant="outline"
              className="w-full sm:w-auto border-primary/30 text-primary hover:bg-primary/10"
              onClick={handleCancel}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Return to App
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}

