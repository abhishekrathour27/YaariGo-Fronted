import React, { useState, useEffect } from "react";
import { Ellipsis, MessageCircle, Share, ThumbsUp } from "lucide-react";
import { postServices } from "@/services/postServices";

export const PostSkeleton = () => (
  <div className="bg-[#171718] p-4 rounded-xl border border-gray-800 animate-pulse space-y-4">
    {/* Header skeleton */}
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 bg-slate-800 rounded-full" />
      <div className="flex-1 space-y-2">
        <div className="h-3.5 bg-slate-800 rounded w-1/3" />
        <div className="h-2.5 bg-slate-800 rounded w-1/4" />
      </div>
    </div>
    {/* Caption skeleton */}
    <div className="space-y-2">
      <div className="h-3 bg-slate-800 rounded w-full" />
      <div className="h-3 bg-slate-800 rounded w-5/6" />
    </div>
    {/* Media block skeleton */}
    <div className="h-60 bg-slate-800 rounded-lg w-full" />
    {/* Action buttons skeleton */}
    <div className="flex justify-between border-t border-gray-800 pt-3">
      <div className="h-4 bg-slate-800 rounded w-16" />
      <div className="h-4 bg-slate-800 rounded w-16" />
      <div className="h-4 bg-slate-800 rounded w-16" />
    </div>
  </div>
);

interface PostSectionProps {
  refreshTrigger?: number;
}

const PostSection: React.FC<PostSectionProps> = ({ refreshTrigger }) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openComments, setOpenComments] = useState<Record<string, boolean>>({});
  const [commentTexts, setCommentTexts] = useState<Record<string, string>>({});

  const userDetail = typeof window !== "undefined" ? localStorage.getItem("user") : null;
  const loggedInUser = userDetail ? JSON.parse(userDetail) : null;

  const getInitials = (name?: string) => {
    if (!name) return "U";
    return name
      .split(/[\s_-]+/)
      .map((word: string) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const getRelativeTime = (dateString?: string) => {
    if (!dateString) return "Just now";
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString();
  };

  const loadPosts = async () => {
    try {
      setIsLoading(true);
      const response = await postServices.getAllPosts();
      if (response && response.status === "success") {
        setPosts(response.data || []);
      }
    } catch (error) {
      console.error("Error loading posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, [refreshTrigger]);

  const handleLike = async (postId: string) => {
    try {
      const response = await postServices.likePost(postId);
      if (response && response.status === "success") {
        setPosts((prevPosts) =>
          prevPosts.map((p) => (p._id === postId ? response.data : p))
        );
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleAddComment = async (postId: string) => {
    const text = commentTexts[postId] || "";
    if (!text.trim()) return;

    try {
      const response = await postServices.addCommentToPost(postId, text);
      if (response && response.status === "success") {
        setPosts((prevPosts) =>
          prevPosts.map((p) => (p._id === postId ? response.data : p))
        );
        setCommentTexts((prev) => ({ ...prev, [postId]: "" }));
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleShare = async (postId: string) => {
    try {
      const response = await postServices.sharePost(postId);
      if (response && response.status === "success") {
        setPosts((prevPosts) =>
          prevPosts.map((p) => (p._id === postId ? response.data : p))
        );
      }
    } catch (error) {
      console.error("Error sharing post:", error);
    }
  };

  const toggleComments = (postId: string) => {
    setOpenComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const handleCommentTextChange = (postId: string, text: string) => {
    setCommentTexts((prev) => ({
      ...prev,
      [postId]: text,
    }));
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 my-3">
        <PostSkeleton />
        <PostSkeleton />
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="flex items-center justify-center py-20 text-gray-500 text-sm">
        No posts available. Be the first to post something!
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 my-3">
      {posts.map((post) => {
        const creatorName = post.user?.username || post.user?.email || "User";
        const creatorInitials = getInitials(creatorName);
        const relativeTime = getRelativeTime(post.createdAt);
        const hasLiked = loggedInUser && post.likes?.includes(loggedInUser._id);

        return (
          <div
            key={post._id}
            className="bg-[#171718] text-gray-200 rounded-xl shadow-md border border-gray-700 relative"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-indigo-500 rounded-full flex items-center justify-center font-semibold text-white">
                  {creatorInitials}
                </div>
                <div>
                  <p className="font-semibold leading-tight">{creatorName}</p>
                  <p className="text-xs text-gray-400">{relativeTime}</p>
                </div>
              </div>
              <Ellipsis className="text-gray-400 cursor-pointer" />
            </div>

            {/* Caption */}
            {post.content && (
              <div className="px-4 pb-3">
                <p className="text-sm">{post.content}</p>
              </div>
            )}

            {/* Media */}
            {post.mediaUrl && (
              <div className="w-full flex items-center justify-center bg-black/40 border-y border-gray-800">
                {post.mediaType === "video" ? (
                  <video
                    src={post.mediaUrl}
                    controls
                    className="max-h-[500px] w-full object-contain"
                  />
                ) : (
                  <img
                    src={post.mediaUrl}
                    alt="post media"
                    className="max-h-[500px] w-full object-contain"
                    loading="lazy"
                  />
                )}
              </div>
            )}

            {/* Stats */}
            <div className="flex justify-between px-4 pt-3 text-sm text-gray-400">
              <p>{post.likeCount || 0} likes</p>
              <div className="flex gap-4">
                <p>{post.commentCount || 0} comments</p>
                <p>{post.shareCount || 0} shares</p>
              </div>
            </div>

            <div className="mx-4 my-2 border-t border-gray-700" />

            {/* Actions */}
            <div className="flex justify-around px-4 py-2 text-sm">
              <button
                onClick={() => handleLike(post._id)}
                className="flex items-center gap-2 hover:bg-gray-700 px-4 py-2 rounded-md transition"
              >
                <ThumbsUp
                  size={18}
                  className={hasLiked ? "text-blue-500 fill-blue-500" : ""}
                />
                <span className={hasLiked ? "text-blue-500" : ""}>Like</span>
              </button>

              <button
                onClick={() => toggleComments(post._id)}
                className="flex items-center gap-2 hover:bg-gray-700 px-4 py-2 rounded-md transition"
              >
                <MessageCircle size={18} />
                <span>Comment</span>
              </button>

              <button
                onClick={() => handleShare(post._id)}
                className="flex items-center gap-2 hover:bg-gray-700 px-4 py-2 rounded-md transition"
              >
                <Share size={18} />
                <span>Share</span>
              </button>
            </div>

            {/* Comment Section (Inline) */}
            {openComments[post._id] && (
              <div className="px-4 pb-4 space-y-3 border-t border-gray-800 pt-3">
                {/* Comment List */}
                <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                  {(post.comments || []).map((c: any, i: number) => {
                    const commentUser = c.user?.username || c.user?.email || "User";
                    const commentInitials = getInitials(commentUser);
                    return (
                      <div key={c._id || i} className="flex gap-2 items-start text-sm">
                        <div className="h-7 w-7 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold text-[10px] shrink-0">
                          {commentInitials}
                        </div>
                        <div className="flex-1 bg-gray-800 p-2 rounded-xl">
                          <div className="flex justify-between items-center mb-1">
                            <p className="font-semibold text-gray-200 text-xs">{commentUser}</p>
                            <p className="text-[10px] text-gray-500">{getRelativeTime(c.createdAt)}</p>
                          </div>
                          <p className="text-gray-300 text-sm">{c.text}</p>
                        </div>
                      </div>
                    );
                  })}
                  {(post.comments || []).length === 0 && (
                    <p className="text-xs text-gray-500 text-center py-2">No comments yet. Write one below!</p>
                  )}
                </div>

                {/* Add Comment */}
                <div className="flex gap-2 pt-2 border-t border-gray-800">
                  <input
                    type="text"
                    placeholder="Write a comment..."
                    className="flex-1 bg-gray-800 px-3 py-2 rounded-md outline-none text-sm text-gray-200 border border-gray-700 focus:border-indigo-600"
                    value={commentTexts[post._id] || ""}
                    onChange={(e) => handleCommentTextChange(post._id, e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleAddComment(post._id);
                      }
                    }}
                  />
                  <button
                    onClick={() => handleAddComment(post._id)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition"
                  >
                    Post
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default PostSection;
