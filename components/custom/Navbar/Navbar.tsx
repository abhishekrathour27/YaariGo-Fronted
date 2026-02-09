"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Bell,
  HomeIcon,
  LogOut,
  MessageCircle,
  Search,
  SquarePlay,
  Store,
  Sun,
  UserRound,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const [modal, setModal] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const { logout } = useAuth();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setModal(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const userDetail = localStorage?.getItem("user");
  const user = userDetail ? JSON.parse(userDetail) : null;
  // console.log("uu",user._id)

  const initials = user?.name
    ?.split(" ")
    .map((word: string) => word[0])
    .join("")
    .toUpperCase();

  const router = useRouter();

  const logoutUser = async () => {
    try {
      await logout();
      localStorage.removeItem("user");
      router.push("/userLogin");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const navbar = [
    {
      id: HomeIcon,
      path: "/",
    },
    {
      id: SquarePlay,
      path: "/video",
    },
    {
      id: Store,
      path: "/store",
    },
    {
      id: Users,
      path: "/users",
    },
  ];

  return (
    <header className="w-full bg-[#171718] border-b border-slate-600 sticky top-0 left-0  z-50 ">
      <div className=" px-6 py-3 flex items-center justify-between">
        {/* LEFT */}
        <div className="flex items-center gap-15">
          <a href="/" className="flex items-center">
            <img
              src="/logo.png"
              alt="YaariGo"
              className="h-8 w-auto mt-2 object-contain scale-200 origin-left select-none"
            />
          </a>

          <div className="relative hidden md:block">
            <input
              type="search"
              placeholder="Search"
              className="rounded-xl w-[22vw] bg-[#1f1f20] text-sm text-gray-200 border border-gray-600 px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
          </div>
        </div>

        {/* CENTER */}
        <nav className="flex gap-10">
          {navbar.map((item, i) => {
            const Icon = item.id;
            return (
              <button
                onAuxClick={() => router.push(item.path)}
                key={i}
                className="p-2 rounded-lg hover:bg-gray-600 transition cursor-pointer"
                onClick={() => router.push(item.path)}
              >
                <Icon className="w-6 h-6" />
              </button>
            );
          })}
        </nav>

        {/* RIGHT */}
        <div className="flex items-center gap-3 relative">
          <button className="p-2 rounded-full hover:bg-gray-600 transition">
            <MessageCircle />
          </button>

          <button className="p-2 rounded-full hover:bg-gray-600 transition">
            <Bell />
          </button>

          <div
            onClick={() => setModal(!modal)}
            className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center text-sm font-semibold cursor-pointer hover:scale-105 transition"
          >
            {initials}
          </div>

          {modal && (
            <div
              ref={modalRef}
              className="absolute right-0 top-12 w-75 bg-black text-white rounded-xl shadow-xl overflow-hidden z-50"
            >
              <div className="flex items-center gap-3 p-4  text-sm cursor-pointer border-b border-slate-400">
                <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center">
                  {initials}
                </div>
                <div>
                  <p className="font-semibold">{user?.name}</p>
                  <p className="text-sm text-gray-400">{user?.email}</p>
                </div>
              </div>
              <div className="space-y-2 py-3 border-b border-slate-400">
                <div
                  onClick={() => {
                    setModal(!modal);
                    router.push(`profile/${user?._id}`);
                  }}
                  className="flex items-center gap-5 pl-5 text-sm cursor-pointer hover:bg-gray-700 p-1 rounded-lg"
                >
                  <UserRound className="text-slate-200 " />
                  <p className="font-semibold text-slate-200">Profile</p>
                </div>
                <div className="flex items-center gap-5 pl-5 text-sm cursor-pointer hover:bg-gray-700 p-1 rounded-lg">
                  <MessageCircle className="text-slate-200 " />
                  <p className="font-semibold text-slate-200">Message</p>
                </div>
              </div>
              <div className="space-y-2 py-3">
                <div className="flex items-center gap-5 pl-5 text-sm cursor-pointer hover:bg-gray-700 p-1 rounded-lg">
                  <Sun className="text-slate-200 " />
                  <p className="font-semibold text-slate-200">Light mode</p>
                </div>
                <div
                  onClick={logoutUser}
                  className="flex items-center gap-5 pl-5 text-sm cursor-pointer hover:bg-gray-700 p-1 rounded-lg"
                >
                  <LogOut className="text-slate-200 " />
                  <p className="font-semibold text-slate-200">Logout</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
