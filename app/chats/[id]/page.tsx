import { ChatView } from "@/components/chat-view"
import { getMockChat } from "@/lib/mock-data"

export default function ChatPage({ params }: { params: { id: string } }) {
  const chat = getMockChat(params.id)

  return <ChatView chat={chat} />
}

