import { redirect } from "next/navigation"

export default function Home() {
  // Redirect to the chats page
  redirect("/chats")
}

