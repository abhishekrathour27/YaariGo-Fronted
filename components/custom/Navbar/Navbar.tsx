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
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { notificationServices } from "@/services/notificationServices";

export default function Navbar() {
  const [modal, setModal] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const [notifications, setNotifications] = useState<any[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationsRef = useRef<HTMLDivElement | null>(null);

  const { logout } = useAuth();

  const fetchNotifications = async () => {
    try {
      const data = await notificationServices.getAllNotifications();
      if (data?.data) {
        setNotifications(data.data);
      }
    } catch (err) {
      console.error("Error fetching notifications in Navbar:", err);
    }
  };

  const deleteNotif = async (id: string) => {
    try {
      const data = await notificationServices.deleteNotification(id);
      if (data) {
        setNotifications((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (err) {
      console.error("Error deleting notification:", err);
    }
  };

  useEffect(() => {
    const userDetail = localStorage?.getItem("user");
    if (userDetail) {
      fetchNotifications();
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setModal(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const userDetail = localStorage?.getItem("user");
  const user = userDetail ? JSON.parse(userDetail) : null;
  // console.log("dett", user);
  // console.log("uu",user._id)

  const initials = user?.username
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
      path: "/friends-list",
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

          <div ref={notificationsRef} className="relative">
            <button 
              onClick={() => {
                setShowNotifications(!showNotifications);
                if (!showNotifications) {
                  fetchNotifications();
                }
              }}
              className="p-2 rounded-full hover:bg-gray-600 transition relative cursor-pointer"
            >
              <Bell className="w-6 h-6 text-slate-200" />
              {notifications.length > 0 && (
                <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-[#171718]">
                  {notifications.length}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 top-12 w-[340px] bg-[#1a1a1b] text-white rounded-xl shadow-2xl border border-slate-700 overflow-hidden z-50 animate-in fade-in slide-in-from-top-3 duration-200">
                <div className="p-4 border-b border-slate-700 flex items-center justify-between">
                  <h3 className="font-semibold text-base text-slate-100">Notifications</h3>
                  {notifications.length > 0 && (
                    <span className="text-xs text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">
                      {notifications.length} Unread
                    </span>
                  )}
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-slate-800 custom-scrollbar">
                  {notifications.length === 0 ? (
                    <div className="p-8 text-center text-slate-400 flex flex-col items-center gap-2">
                      <Bell className="w-8 h-8 text-slate-600" />
                      <p className="text-sm">All caught up!</p>
                      <p className="text-xs text-slate-500">No new notifications.</p>
                    </div>
                  ) : (
                    notifications.map((notif) => {
                      const notifInitials = notif.sender?.username
                        ?.split(" ")
                        .map((word: string) => word[0])
                        .join("")
                        .toUpperCase()
                        .slice(0, 2);
                      
                      return (
                        <div key={notif._id} className="p-3.5 flex items-start gap-3 hover:bg-slate-900 transition duration-150 group">
                          {notif.sender?.profilePicture ? (
                            <img
                              src={notif.sender.profilePicture}
                              alt={notif.sender.username}
                              className="w-9 h-9 rounded-full object-cover border border-slate-700"
                            />
                          ) : (
                            <div className="w-9 h-9 rounded-full bg-slate-700 flex items-center justify-center text-xs font-semibold text-slate-300 border border-slate-600">
                              {notifInitials || "U"}
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-slate-200">
                              <span className="font-semibold text-slate-100">{notif.sender?.username || "Someone"}</span>{" "}
                              {notif.message}
                            </p>
                            <span className="text-[10px] text-slate-500 mt-1 block">
                              {new Date(notif.createdAt).toLocaleDateString(undefined, {
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit"
                              })}
                            </span>
                          </div>
                          <button
                            onClick={() => deleteNotif(notif._id)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-slate-800 transition opacity-0 group-hover:opacity-100 focus:opacity-100 duration-150 cursor-pointer"
                            title="Dismiss notification"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}
          </div>

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
                  <p className="font-semibold">
                    {user?.username?.charAt(0).toUpperCase() +
                      user?.username?.slice(1)}
                  </p>
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
