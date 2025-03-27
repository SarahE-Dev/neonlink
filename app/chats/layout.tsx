import type React from "react"
import { MainNav } from "@/components/main-nav"
import { SideNav } from "@/components/side-nav"

export default function ChatsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen flex-col bg-black overflow-hidden">
      <MainNav />
      <div className="flex flex-1 overflow-hidden">
        <SideNav />
        <main className="flex-1 overflow-hidden relative">
          <div className="scanline"></div>
          <div className="cyber-grid h-full">{children}</div>
        </main>
      </div>
    </div>
  )
}

