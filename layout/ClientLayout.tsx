"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import NavbarHOC from "@/components/custom/Navbar/NavbarHOC";
import LeftSidebarHOC from "@/components/custom/sidebar/LeftSidebarHOC";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isClient, setIsClient] = useState(false);

  const pathname = usePathname(); // ✅ top level pe call
  const routePart = pathname.split("/")[1]; // 👉 "shop"

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <>{children}</>;
  }

  return (
    <div className="overflow-hidden h-screen">
      {routePart !== "story" &&
        routePart !== "userLogin" &&
        routePart !== "forget-password" &&
        routePart !== "reset-password" && <NavbarHOC />}
      {/* {routePart !== "userLogin" && <NavbarHOC />} */}
      {pathname !== "/" && pathname !== "/userLogin" && <LeftSidebarHOC />}
      {children}
      {/* {routePart !== "admin" && <FooterHOC />} */}
    </div>
  );
}
