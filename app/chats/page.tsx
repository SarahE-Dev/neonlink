import { ChatList } from "@/components/chat-list"
import { WelcomeScreen } from "@/components/welcome-screen"

export default function ChatsPage() {
  return (
    <div className="grid lg:grid-cols-[1fr_2fr] h-full">
      <ChatList />
      <WelcomeScreen />
    </div>
  )
}

