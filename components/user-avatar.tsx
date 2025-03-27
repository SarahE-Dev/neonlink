import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { LucideUser } from "lucide-react"

interface User {
  id: string
  name: string
  avatar: string
  status?: "online" | "offline" | "away" | "busy"
}

interface UserAvatarProps {
  user: User
  className?: string
  showStatus?: boolean
}

// Function to generate a consistent color based on user ID or name
const getAvatarColor = (id: string, name: string): string => {
  // Use a simple hash function to generate a consistent color
  const hash = (id || name).split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)

  // Array of cyberpunk-themed colors
  const colors = [
    "bg-cyan-600",
    "bg-fuchsia-600",
    "bg-yellow-500",
    "bg-emerald-600",
    "bg-orange-600",
    "bg-purple-600",
    "bg-red-600",
    "bg-blue-600",
    "bg-green-600",
    "bg-pink-600",
    "bg-indigo-600",
    "bg-amber-600",
  ]

  return colors[hash % colors.length]
}

export function UserAvatar({ user, className, showStatus = true }: UserAvatarProps) {
  const statusColors = {
    online: "bg-green-500",
    offline: "bg-gray-500",
    away: "bg-yellow-500",
    busy: "bg-red-500",
  }

  const avatarColor = getAvatarColor(user.id, user.name)

  return (
    <div className="relative">
      <Avatar className={cn("border border-primary/20", className)}>
        {user.avatar && user.avatar.startsWith("http") ? (
          <AvatarImage src={user.avatar} alt={user.name} />
        ) : (
          <AvatarFallback className={cn("text-white", avatarColor)}>
            <LucideUser className="h-5 w-5" />
          </AvatarFallback>
        )}
      </Avatar>
      {showStatus && user.status && (
        <span
          className={cn(
            "absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background",
            statusColors[user.status],
          )}
        />
      )}
    </div>
  )
}

