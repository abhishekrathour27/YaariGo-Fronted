"use client";

import { useParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useModal } from "@/context/ModalContext";
import { useRef, useState } from "react";
import { MoreVertical } from "lucide-react";

const Page = () => {
  const { id } = useParams();

  

  const coverInputRef = useRef<HTMLInputElement | null>(null);

  const [coverPreview, setCoverPreview] = useState<string>("");
  const [profileImg, setProfileImg] = useState<string>("");

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const previewURL = URL.createObjectURL(files[0]);
    setCoverPreview(previewURL);

    // Modal open with preview

    e.currentTarget.value = "";
  };
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const previewURL = URL.createObjectURL(files[0]);
    setProfileImg(previewURL);

    // Modal open with preview

    e.currentTarget.value = "";
  };

  const userDetail = localStorage?.getItem("user");
  const user = userDetail ? JSON.parse(userDetail) : null;
  // console.log("uu",user._id)

  const initials = user?.name
    ?.split(" ")
    .map((word: string) => word[0])
    .join("")
    .toUpperCase();

  return (
    <div className="flex flex-col items-center">
      <div className="w-[70vw] min-h-screen bg-[#1f202286] ml-10 text-white">
        {/* ================= COVER PHOTO ================= */}
        <div className="relative w-full h-[300px] overflow-hidden">
          <img
            src={coverPreview || "/cover.jpg"}
            alt="cover"
            className="w-full h-full object-cover z-0 pointer-events-none"
          />

          <button
            onClick={() => coverInputRef.current?.click()}
            className="absolute bottom-4 right-4 z-20
               bg-black/60 px-4 py-2 rounded-md text-sm
               hover:bg-black/80"
          >
            Change Cover
          </button>

          <input
            ref={coverInputRef}
            type="file"
            accept="image/*"
            onChange={handleCoverChange}
            className="hidden"
          />
        </div>

        {/* ================= PROFILE INFO ================= */}
        <div className="max-w-6xl mx-auto px-4">
          <div className="relative flex items-end gap-5 -mt-20">
            {/* PROFILE IMAGE */}
            <div className="relative w-[170px] h-[170px] rounded-full border-4 border-indigo-800 overflow-hidden">
              <img
                src={profileImg || "/IMG_4274.JPG"}
                alt="profile"
                className="w-full h-full object-cover rounded-full"
              />
            </div>

            <div className="pb-4">
              <h1 className="text-3xl font-bold capitalize">{user?.name}</h1>
            </div>
            <button
              onClick={() => coverInputRef.current?.click()}
              className="absolute bottom-4 right-4 z-20
               bg-black/60 px-4 py-2 rounded-md text-sm
               hover:bg-black/80"
            >
              Change Profile
            </button>

            <input
              ref={coverInputRef}
              type="file"
              accept="image/*"
              onChange={handleProfileChange}
              className="hidden"
            />
          </div>
        </div>

        {/* ================= TABS ================= */}
        <div className="my-10 border-t border-gray-700">
          <Tabs defaultValue="posts" className="w-full">
            <TabsList className="flex justify-start gap-10 bg-transparent px-4">
              {["posts", "about", "friends", "photos"].map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="text-white data-[state=active]:bg-[#18191A]
                  data-[state=active]:border-b-indigo-500 border-3 rounded-lg pb-3 cursor-pointer"
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="mt-6 px-4">
              <TabsContent value="posts">
                <div className="space-y-4">
                  {/* Create Post */}
                  <div className="bg-[#242526] p-4 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center">
                        {initials}
                      </div>
                      <input
                        placeholder="What's on your mind?"
                        className="flex-1 bg-[#3a3b3c] rounded-full px-4 py-2 text-sm outline-none"
                      />
                    </div>
                  </div>

                  {/* Sample Post */}
                  <div className="bg-[#242526] p-4 rounded-xl">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center">
                        {initials}
                      </div>
                      <div>
                        <p className="font-semibold">{user?.name}</p>
                        <p className="text-xs text-gray-400">2 hrs ago</p>
                      </div>
                    </div>

                    <p className="text-sm my-3">Enjoying building YaariGo 🚀</p>

                    <div className="flex justify-between text-gray-400 text-sm border-t border-gray-600 pt-2">
                      <span className="cursor-pointer">👍 Like</span>
                      <span className="cursor-pointer">💬 Comment</span>
                      <span className="cursor-pointer">↗ Share</span>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="about">
                <div className="bg-[#242526] rounded-xl p-5 space-y-4">
                  <h2 className="text-lg font-semibold">About</h2>

                  <div className="space-y-2 text-sm text-gray-300">
                    <p>👨‍💻 Frontend Developer</p>
                    <p>🎓 Computer Science Student</p>
                    <p>📍 India</p>
                    <p>❤️ Building YaariGo</p>
                  </div>

                  <button className="w-full bg-[#3a3b3c] py-2 rounded-md text-sm hover:bg-[#4a4b4c]">
                    Edit Details
                  </button>
                </div>
              </TabsContent>
              <TabsContent value="friends">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                      key={i}
                      className="relative bg-[#242526] p-3 rounded-xl flex flex-col items-center gap-2"
                    >
                      {/* 3 DOT MENU */}
                      <button className="absolute top-2 right-2 p-1 rounded-full hover:bg-[#3a3b3c] cursor-pointer">
                        <MoreVertical size={16} className="text-gray-300" />
                      </button>

                      {/* PROFILE IMAGE */}
                      <div className="w-20 h-20 rounded-full bg-indigo-500 flex items-center justify-center text-lg">
                        A
                      </div>

                      {/* NAME */}
                      <p className="font-semibold text-sm">Friend {i}</p>

                      {/* ACTION */}
                      <button className="text-xs bg-[#3a3b3c] px-3 py-1 rounded-md hover:bg-[#4a4b4c]">
                        View Profile
                      </button>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="photos">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                      key={i}
                      className="w-full h-40 bg-[#3a3b3c] rounded-lg overflow-hidden"
                    >
                      <img
                        src="/cover.jpg"
                        alt="photo"
                        className="w-full h-full object-cover hover:scale-105 transition"
                      />
                    </div>
                  ))}
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Page;
