"use client";
import React from "react";
import { Image, Video, Smile } from "lucide-react";

const CreatePost = () => {
  const userDetail = localStorage?.getItem("user");
  const user = userDetail ? JSON.parse(userDetail) : null;
  // console.log("uu",user._id)

  const initials = user?.name
    ?.split(" ")
    .map((word: string) => word[0])
    .join("")
    .toUpperCase();

  return (
    <div className="bg-[#242526] rounded-xl p-4 w-full ">
      {/* TOP INPUT */}
      <div className="flex items-center gap-3">
        {/* PROFILE */}
        <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-sm font-semibold text-black cursor-pointer">
          {initials}
        </div>

        {/* INPUT */}
        <input
          type="text"
          placeholder="What's on your mind?"
          className="flex-1 bg-[#3a3b3c] rounded-full px-4 py-2 text-sm text-gray-200 outline-none focus:bg-[#4a4b4c]"
        />
      </div>

      {/* DIVIDER */}
      <div className="border-t border-gray-600 my-3" />

      {/* ACTION BUTTONS */}
      <div className="flex justify-between text-sm">
        <button className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-[#3a3b3c] transition">
          <Image className="text-green-500" size={18} />
          <span className="text-gray-300">Photo</span>
        </button>

        <button className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-[#3a3b3c] transition">
          <Video className="text-green-500" size={18} />
          <span className="text-gray-300">Videos</span>
        </button>

        <button className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-[#3a3b3c] transition">
          <Smile className="text-green-500" size={18} />
          <span className="text-gray-300">Feelings</span>
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
