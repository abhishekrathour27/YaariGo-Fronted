"use client";

import { usePathname } from "next/navigation";
import NavbarHOC from "@/components/custom/Navbar/NavbarHOC";
import LeftSidebarHOC from "@/components/custom/sidebar/LeftSidebarHOC";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const routePart = pathname.split("/")[1];

  const hideNavbarRoutes = [
    "story",
    "userLogin",
    "forget-password",
    "reset-password",
  ];

  const hideSidebarRoutes = ["userLogin" , "forget-password" , "reset-password"];

  const showNavbar = !hideNavbarRoutes.includes(routePart);
  const showSidebar = !hideSidebarRoutes.includes(routePart);

  return (
    <div className="bg-[#0F0F10] min-h-screen">
      
      {/* Navbar (top fixed or normal — as per your NavbarHOC) */}
      {showNavbar && <NavbarHOC />}

      <div className="flex">
        
        {/* LEFT SIDEBAR - FIXED */}
        {showSidebar && (
          <div className="fixed left-0 top-[64px] h-[calc(100vh-64px)] w-64">
            <LeftSidebarHOC />
          </div>
        )}

        {/* PAGE CONTENT */}
        <div
          className={`flex-1 ${
            showSidebar ? "ml-64" : ""
          } h-[calc(100vh-64px)] overflow-y-auto hide-scrollbar ml-32 `}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
