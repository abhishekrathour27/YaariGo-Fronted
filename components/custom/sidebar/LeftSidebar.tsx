"use client";
import React, { useState } from "react";
import {
  Home,
  MessageCircle,
  User,
  Video,
  Settings,
  LogOut,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Sidebar() {
  const [active, setActive] = useState("home");

  const nav = [
    { id: "home", label: "Home", icon: <Home size={18} /> },
    { id: "video", label: "Video", icon: <Video size={18} /> },
    { id: "profile", label: "Profile", icon: <User size={18} /> },
    { id: "messages", label: "Messages", icon: <MessageCircle size={18} /> },
  ];

  const userDetail = localStorage.getItem("user");
  const user = userDetail ? JSON.parse(userDetail) : null;

  const userName = user.name;
  const initials = user?.name
    ?.split(" ") // ["Abhishek", "singh"]
    .map((word: string) => word[0]) // ["A", "s"]
    .join("") // "As"
    .toUpperCase();

  return (
    <aside className="w-64 h-[90vh] bg-[#171718] text-[#FFFFFF] border-r border-slate-500 shadow-sm flex flex-col  justify-between p-5">
      <div className="space-y-50">
        {/* Header */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#5B6FFF] to-[#FF5BA8] flex items-center justify-center text-white font-bold text-lg shadow-md">
                {initials}
              </div>
              <div className="leading-tight">
                <div className="text-sm font-semibold ">{userName}</div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {nav.map((item) => {
              const isActive = active === item.id;
              return (
                <motion.button
                  key={item.id}
                  onClick={() => setActive(item.id)}
                  whileHover={{ scale: 1.02 }}
                  className="w-full flex items-center cursor-pointer gap-3 rounded-xl px-3 py-2 text-sm transition-colors focus:outline-none"
                  aria-current={isActive ? "page" : undefined}
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
                      <div className="text-xs" style={{ color: "#9AA0A6" }}>
                        5 new
                      </div>
                    )}
                  </div>

                  {isActive && (
                    <div
                      className="hidden md:block text-xs font-semibold"
                      style={{ color: "#5B6FFF" }}
                    >
                      Active
                    </div>
                  )}
                </motion.button>
              );
            })}
          </nav>
        </div>

        {/* Utilities */}
        <div
          className="mt-6 pt-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <button
            className="w-full flex items-center gap-3 rounded-xl px-3 py-2 text-sm"
            style={{ background: "transparent" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.03)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
          >
            <Settings size={18} />
            <span className="font-medium" style={{ color: "#FFFFFF" }}>
              Settings
            </span>
          </button>

          <button
            className="w-full mt-2 flex items-center gap-3 rounded-xl px-3 py-2 text-sm"
            style={{ background: "transparent" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.03)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
          >
            <LogOut size={18} />
            <span className="font-medium" style={{ color: "#FFFFFF" }}>
              Sign out
            </span>
          </button>
        </div>
      </div>
    </aside>
  );
}
