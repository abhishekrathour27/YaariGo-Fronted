"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import NavbarHOC from "@/components/custom/Navbar/NavbarHOC";

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
    <>
      {routePart !== "story" && <NavbarHOC />}
      {children}
      {/* {routePart !== "admin" && <FooterHOC />} */}
    </>
  );
}
