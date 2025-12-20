import React from "react";
import { posts } from "@/data/PostData";
import { Ellipsis, MessageCircle, Share, ThumbsUp } from "lucide-react";

const PostSection = () => {
  return (
    <div className="flex flex-col gap-4 my-3">
      {posts.map((data, index) => (
        <div
          key={index}
          className="bg-[#171718] text-gray-200 rounded-xl shadow-md border border-gray-700"
        >
          {/* ===== Header ===== */}
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-indigo-500 rounded-full flex items-center justify-center font-semibold">
                AS
              </div>
              <div>
                <p className="font-semibold leading-tight">
                  {data?.user?.name}
                </p>
                <p className="text-xs text-gray-400">
                  {data?.createdAt}
                </p>
              </div>
            </div>
            <Ellipsis className="text-gray-400 cursor-pointer" />
          </div>

          {/* ===== Image ===== */}
          <div className="w-full flex items-center justify-center">
            <img
              src="IMG_4274.JPG"
              alt={data?.content?.image?.alt}
              className=" object-cover rounded-lg"
              height={"500px"}
              width={"300px"}
            />
          </div>

          {/* ===== Caption ===== */}
          <div className="px-4 py-3">
            <p className="text-sm">{data?.content?.caption}</p>
          </div>

          {/* ===== Stats ===== */}
          <div className="flex justify-between px-4 text-sm text-gray-400">
            <p>{data?.stats?.likes} likes</p>
            <div className="flex gap-4">
              <p>{data?.stats?.comments} comments</p>
              <p>{data?.stats?.shares} shares</p>
            </div>
          </div>

          {/* Divider */}
          <div className="mx-4 my-2 border-t border-gray-700" />

          {/* ===== Actions ===== */}
          <div className="flex justify-around px-4 py-2 text-sm">
            <button className="flex items-center gap-2 hover:bg-gray-700 px-4 py-2 rounded-md transition">
              <ThumbsUp size={18} />
              <span>Like</span>
            </button>

            <button className="flex items-center gap-2 hover:bg-gray-700 px-4 py-2 rounded-md transition">
              <MessageCircle size={18} />
              <span>Comment</span>
            </button>

            <button className="flex items-center gap-2 hover:bg-gray-700 px-4 py-2 rounded-md transition">
              <Share size={18} />
              <span>Share</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostSection;
