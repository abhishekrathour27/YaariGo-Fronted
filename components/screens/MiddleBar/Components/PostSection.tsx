import React, { useState } from "react";
import { posts } from "@/data/PostData";
import { Ellipsis, MessageCircle, Share, ThumbsUp, X } from "lucide-react";

const PostSection = () => {
  const [likedPosts, setLikedPosts] = useState<Record<number, boolean>>({});
  const [likeCounts, setLikeCounts] = useState<Record<number, number>>({});
  const [openComment, setOpenComment] = useState<boolean>(false);
  const [comments, setComments] = useState<Record<number, string[]>>({});
  const [newComment, setNewComment] = useState("");

  const handleLike = (index: number) => {
    const isLiked = likedPosts[index] ?? false;

    setLikedPosts((prev) => ({
      ...prev,
      [index]: !isLiked,
    }));

    setLikeCounts((prev) => ({
      ...prev,
      [index]: isLiked ? (prev[index] ?? 0) - 1 : (prev[index] ?? 0) + 1,
    }));
  };

  const handleAddComment = (index: number) => {
    if (!newComment.trim()) return;

    setComments((prev) => ({
      ...prev,
      [index]: [...(prev[index] || []), newComment],
    }));

    setNewComment("");
  };

  return (
    <div className="flex flex-col gap-4 my-3">
      {posts.map((data, index) => (
        <div
          key={index}
          className="bg-[#171718] text-gray-200 rounded-xl shadow-md border border-gray-700 relative"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-indigo-500 rounded-full flex items-center justify-center font-semibold">
                AS
              </div>
              <div>
                <p className="font-semibold leading-tight">
                  {data?.user?.name}
                </p>
                <p className="text-xs text-gray-400">{data?.createdAt}</p>
              </div>
            </div>
            <Ellipsis className="text-gray-400 cursor-pointer" />
          </div>

          {/* Image */}
          <div className="w-full flex items-center justify-center">
            <img
              src="post-image.jpg"
              alt={data?.content?.image?.alt}
              className="object-cover rounded-lg"
              height={"500px"}
              width={"300px"}
              loading="lazy"
            />
          </div>

          {/* Caption */}
          <div className="px-4 py-3">
            <p className="text-sm">{data?.content?.caption}</p>
          </div>

          {/* Stats */}
          <div className="flex justify-between px-4 text-sm text-gray-400">
            <p>{likeCounts[index] || 0} likes</p>
            <div className="flex gap-4">
              <p>{comments[index]?.length || 0} comments</p>
              <p>{data?.stats?.shares} shares</p>
            </div>
          </div>

          <div className="mx-4 my-2 border-t border-gray-700" />

          {/* Actions */}
          <div className="flex justify-around px-4 py-2 text-sm">
            <button
              onClick={() => handleLike(index)}
              className="flex items-center gap-2 hover:bg-gray-700 px-4 py-2 rounded-md transition"
            >
              <ThumbsUp
                size={18}
                className={
                  likedPosts[index] ? "text-blue-500 fill-blue-500" : ""
                }
              />
              <span className={likedPosts[index] ? "text-blue-500" : ""}>
                Like
              </span>
            </button>

            <button
              onClick={() => setOpenComment(!openComment)}
              className="flex items-center gap-2 hover:bg-gray-700 px-4 py-2 rounded-md transition"
            >
              <MessageCircle size={18} />
              <span>Comment</span>
            </button>

            <button className="flex items-center gap-2 hover:bg-gray-700 px-4 py-2 rounded-md transition">
              <Share size={18} />
              <span>Share</span>
            </button>
          </div>

          {/* Comment Modal */}
          {/* Comment Section (Inline) */}
          {openComment && (
            <div className="px-4 pb-4 space-y-3 animate-fadeIn">
              {/* Comment List */}
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {(comments[index] || []).map((c, i) => (
                  <div key={i} className="bg-gray-800 p-2 rounded-md text-sm">
                    <p className="font-semibold text-lg mb-2">Comments:</p>
                    {c}
                  </div>
                ))}
              </div>

              {/* Add Comment */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Write a comment..."
                  className="flex-1 bg-gray-800 px-3 py-2 rounded-md outline-none text-sm"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <button
                  onClick={() => handleAddComment(index)}
                  className="bg-blue-600 px-4 py-2 rounded-md text-sm"
                >
                  Post
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PostSection;
