"use client";

import React from "react";
import {
  Home,
  MessageCircle,
  User,
  Video,
  Settings,
  LogOut,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const userDetail =
    typeof window !== "undefined" ? localStorage.getItem("user") : null;
  const user = userDetail ? JSON.parse(userDetail) : null;

  const userName = user?.name || "User";
  const initials = userName
    .split(" ")
    .map((word: string) => word[0])
    .join("")
    .toUpperCase();

  const nav = [
    { id: "home", label: "Home", icon: <Home size={18} />, path: "/" },
    {
      id: "friend",
      label: "Friends",
      icon: <Users size={18} />,
      path: "/friends-list",
    },
    { id: "video", label: "Video", icon: <Video size={18} />, path: "/videos" },
    {
      id: "profile",
      label: "Profile",
      icon: <User size={18} />,
      path: `/profile/${user?._id}`,
    },
    {
      id: "messages",
      label: "Messages",
      icon: <MessageCircle size={18} />,
      path: "/messages",
    },
  ];

  return (
    <aside className="w-80 h-[92vh] bg-[#171718] text-white  border-r border-slate-500 shadow-sm flex flex-col justify-between p-5">
      <div className="space-y-40">
        {/* 🔹 HEADER */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center font-bold text-lg shadow-md">
              {initials}
            </div>
            <div className="text-sm font-semibold">{userName}</div>
          </div>

          {/* 🔹 NAVIGATION */}
          <nav className="space-y-2">
            {nav.map((item) => {
              const isActive =
                pathname === item.path ||
                (item.path !== "/" && pathname.startsWith(item.path));

              return (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => router.push(item.path)}
                  className="w-full flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors focus:outline-none cursor-pointer"
                  style={{
                    background: isActive
                      ? "rgba(255,255,255,0.06)"
                      : "transparent",
                  }}
                >
                  <div
                    className="flex items-center justify-center w-10 h-10 rounded-lg"
                    style={{
                      background: isActive ? "#1F1F21" : "transparent",
                      boxShadow: isActive
                        ? "0 6px 18px rgba(0,0,0,0.35)"
                        : "none",
                      color: isActive ? "#5B6FFF" : "#9AA0A6",
                    }}
                  >
                    {item.icon}
                  </div>

                  <div className="flex-1 text-left">
                    <div
                      className="font-medium"
                      style={{ color: isActive ? "#FFFFFF" : "#EDEDED" }}
                    >
                      {item.label}
                    </div>
                    {item.id === "messages" && (
                      <div className="text-xs text-[#9AA0A6]">5 new</div>
                    )}
                  </div>

                  {isActive && (
                    <div className="hidden md:block text-xs font-semibold text-[#5B6FFF]">
                      Active
                    </div>
                  )}
                </motion.button>
              );
            })}
          </nav>
        </div>

        {/* 🔹 UTILITIES */}
        <div className="pt-4 border-t border-white/10">
          <button className="w-full flex items-center gap-3 rounded-xl px-3 py-2 text-sm hover:bg-white/5">
            <Settings size={18} />
            <span className="font-medium">Settings</span>
          </button>

          <button className="w-full mt-2 flex items-center gap-3 rounded-xl px-3 py-2 text-sm hover:bg-white/5">
            <LogOut size={18} />
            <span className="font-medium">Sign out</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
