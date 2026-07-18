"use client";

import { useSidebar } from "./SidebarContext";

export default function Backdrop() {
  const { isMobileOpen, toggleMobileSidebar } = useSidebar();

  if (!isMobileOpen) return null;

  return (
    <div
      className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
      onClick={toggleMobileSidebar}
    />
  );
}
