"use client";

import { useState } from "react";
import { MainNav } from "@/components/main-nav";
import { SideNav } from "@/components/side-nav";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const handleSidebar = (): void => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex h-screen flex-col bg-black overflow-hidden">
      <MainNav isSidebarOpen={isSidebarOpen} handleSidebar={handleSidebar} />
      <div className="flex flex-1 overflow-hidden">
        
          <SideNav isSidebarOpen={isSidebarOpen} />
        
        <main className="flex-1 overflow-auto relative">
          <div className="scanline"></div>
          <div className="cyber-grid h-full">{children}</div>
        </main>
      </div>
    </div>
  );
}