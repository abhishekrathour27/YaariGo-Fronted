import React, { useEffect, useState } from "react";
import { useModal } from "@/context/ModalContext";
import { Trash2 } from "lucide-react";
import { postServices } from "@/services/postServices";

interface StoryOutputProps {
  story?: any;
  images?: string;
  previews?: string;
  onClose?: () => void;
  onStoryDeleted?: () => void;
}

const STORY_DURATION = 5000;

const StoryOutput: React.FC<StoryOutputProps> = ({ story, images, onStoryDeleted }) => {
  const { closeModal } = useModal();
  const [showConfirm, setShowConfirm] = useState(false);

  // auto close after 5 sec, paused when showConfirm is true
  useEffect(() => {
    if (showConfirm) return;

    const timer = setTimeout(() => {
      closeModal();
    }, STORY_DURATION);

    return () => clearTimeout(timer);
  }, [closeModal, showConfirm]);

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

  const userDetail = typeof window !== "undefined" ? localStorage.getItem("user") : null;
  const user = userDetail ? JSON.parse(userDetail) : null;
  const isOwner = story?.user?._id === user?._id;

  const handleDelete = async () => {
    if (!story?._id) return;
    try {
      const response = await postServices.deleteStory(story._id);
      if (response && response.status === "success") {
        if (onStoryDeleted) {
          onStoryDeleted();
        }
        closeModal();
      }
    } catch (error) {
      console.error("Error deleting story:", error);
    }
  };

  const username = story?.user?.username || story?.user?.name || "User";
  const initials = getInitials(username);
  const timeAgo = getRelativeTime(story?.createdAt);
  const mediaUrl = story?.mediaUrl || images;
  const isVideo = story?.mediaType === "video";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      {/* Story Card */}
      <div className="w-full max-w-sm bg-slate-900 rounded-xl overflow-hidden shadow-2xl relative">

        {/* Progress Bar (top) */}
        <div className="absolute top-0 left-0 w-full h-1 bg-slate-700 z-20">
          <div
            className="h-full bg-white story-progress"
            style={{ 
              animationDuration: `${STORY_DURATION}ms`,
              animationPlayState: showConfirm ? "paused" : "running"
            }}
          />
        </div>

        {/* Image/Video Wrapper */}
        <div className="relative flex items-center justify-center bg-black h-[480px]">
          {isVideo ? (
            <video
              src={mediaUrl}
              className="h-[480px] w-full object-cover"
              autoPlay
              muted
              playsInline
            />
          ) : (
            <img
              src={mediaUrl}
              alt="story"
              className="h-[480px] w-full object-cover"
            />
          )}

          {/* Gradient overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/30 pointer-events-none" />

          {/* Header over image */}
          <div className="absolute top-3 left-3 right-3 flex items-center gap-3 z-10">
            <div className="h-9 w-9 bg-gray-200 text-slate-800 rounded-full flex items-center justify-center font-semibold text-sm">
              {initials}
            </div>

            <div className="flex-1">
              <p className="text-white text-sm font-medium">
                {username}
              </p>
              <p className="text-xs text-gray-300">{timeAgo}</p>
            </div>

            {/* Delete Option */}
            {isOwner && (
              <button
                onClick={() => setShowConfirm(true)}
                className="text-red-500 hover:text-red-400 h-7 w-7 flex items-center justify-center cursor-pointer opacity-90 hover:opacity-100 rounded-lg transition"
                title="Delete Story"
              >
                <Trash2 size={16} />
              </button>
            )}

            {/* Close */}
            <button
              onClick={closeModal}
              className="text-white h-7 w-7 cursor-pointer text-lg opacity-90 hover:opacity-100 rounded-lg"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Confirmation Modal */}
        {showConfirm && (
          <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center p-6 z-30">
            <div className="bg-slate-800 rounded-xl p-6 w-full max-w-[280px] shadow-2xl border border-slate-700 text-center flex flex-col gap-4">
              <div className="mx-auto bg-red-500/10 text-red-500 p-3 rounded-full w-fit">
                <Trash2 size={28} />
              </div>
              <div>
                <h3 className="text-white font-semibold text-base">Delete Story?</h3>
                <p className="text-gray-400 text-xs mt-1">This action cannot be undone.</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 py-2 text-xs font-medium text-gray-300 hover:text-white bg-slate-700 hover:bg-slate-600 rounded-lg transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 py-2 text-xs font-medium text-white bg-red-600 hover:bg-red-500 rounded-lg transition cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Progress animation */}
        <style jsx>{`
          .story-progress {
            width: 0%;
            animation-name: fillProgress;
            animation-timing-function: linear;
            animation-fill-mode: forwards;
          }

          @keyframes fillProgress {
            from {
              width: 0%;
            }
            to {
              width: 100%;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default StoryOutput;
