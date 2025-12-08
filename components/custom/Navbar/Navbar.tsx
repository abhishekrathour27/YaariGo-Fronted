import React from "react";
import {
  Bell,
  HomeIcon,
  MessageCircle,
  Search,
  SquarePlay,
  Store,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const userDetail = localStorage.getItem("user");
  const user = userDetail ? JSON.parse(userDetail) : null;

  const userName = user.name;

  const initials = user?.name
    ?.split(" ") // ["Abhishek", "singh"]
    .map((word: string) => word[0]) // ["A", "s"]
    .join("") // "As"
    .toUpperCase();

  const router = useRouter();
  return (
    <header className="w-full bg-[#171718] border-b border-slate-500">
      <div className="max-w-8xl mx-auto px-6 py-3 flex items-center justify-around">
        <div className="flex items-center gap-4">
          <a
            href="/"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-400 border shadow-sm shrink-0"
            aria-label="YaariGo home"
          >
            <p>Y</p>
          </a>

          <div className="relative">
            <input
              type="search"
              placeholder="Search"
              className=" rounded-xl border w-[20vw] border-gray-100 px-4 py-2 text-sm shadow-sm focus:ring-2 focus:ring-indigo-200 outline-none"
            />
            <div className="absolute right-3 top-2 text-gray-400 text-xs">
              /
            </div>
          </div>

          {/* small-screen search button */}
          <button
            className="md:hidden inline-flex items-center justify-center p-2 rounded-full hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
            aria-label="Open search"
            title="Search"
          >
            <Search className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* CENTER: main nav icons */}
        <nav aria-label="Primary" className="flex-1 flex justify-center">
          <ul className="flex items-center gap-15">
            {/* Home (active) */}
            <li>
              <button
                className="flex flex-col cursor-pointer items-center px-3 pb-3 py-2 rounded-md hover:bg-gray-600 focus:outline-none"
                aria-label="Home"
                title="Home"
              >
                <HomeIcon
                  onClick={() => router.push("/")}
                  className="w-6 h-6"
                />
              </button>
            </li>

            {/* Reels / Video */}
            <li>
              <button
                className="flex flex-col cursor-pointer items-center px-3 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-indigo-400"
                aria-label="Reels"
                title="Reels"
              >
                <SquarePlay className="w-6 h-6" />
                <span className="mt-1 block h-1 w-8 rounded-full bg-transparent" />
              </button>
            </li>

            {/* Store / Marketplace */}
            <li>
              <button
                className="flex flex-col cursor-pointer items-center px-3 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-indigo-400"
                aria-label="Marketplace"
                title="Marketplace"
              >
                <Store className="w-6 h-6" />
                <span className="mt-1 block h-1 w-8 rounded-full bg-transparent" />
              </button>
            </li>

            {/* Community / Groups */}
            <li>
              <button
                className="flex flex-col cursor-pointer items-center px-3 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-indigo-400"
                aria-label="Community"
                title="Community"
              >
                <Users className="w-6 h-6" />
                <span className="mt-1 block h-1 w-8 rounded-full bg-transparent" />
              </button>
            </li>
          </ul>
        </nav>

        {/* RIGHT: action icons + avatar */}
        <div className="flex items-center gap-3">
          {/* menu button */}
          {/* messages */}
          <button
            className="p-2 rounded-full hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            aria-label="Messages"
            title="Messages"
          >
            <MessageCircle />
          </button>

          {/* notifications with badge */}
          <button
            className="p-2 rounded-full hover:bg-gray-600 relative focus:outline-none focus:ring-2 focus:ring-blue-300"
            aria-label="Notifications"
            title="Notifications"
          >
            <Bell />
          </button>

          {/* avatar */}

          <div className="w-9 h-9 rounded-full bg-gray-600 flex items-center justify-center text-sm">
            {initials}
          </div>
        </div>
      </div>
    </header>
  );
}
