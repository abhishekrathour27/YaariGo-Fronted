"use client";
import { useModal } from "@/context/ModalContext";
import { Plus, Trash2 } from "lucide-react";
import React, { useRef, useState, useEffect } from "react";
import StoryInput from "../../StoryI&O/StoryInput";
import StoryOutput from "../../StoryI&O/StoryOutput";
import Button from "@/components/custom/CustomBtn/Button";
import { postServices } from "@/services/postServices";

const StorySection: React.FC = () => {
  const [stories, setStories] = useState<any[]>([]);
  const [images, setImages] = useState<string[]>([]); // fallback/local
  const [previews, setPreviews] = useState<string>(); 
  const [isLoading, setIsLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { openModal } = useModal();

  const getInitials = (name?: string) => {
    if (!name) return "U";
    return name
      .split(/[\s_-]+/)
      .map((word: string) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const loadStories = async () => {
    try {
      setIsLoading(true);
      const response = await postServices.getAllStories();
      if (response && response.status === "success") {
        setStories(response.data || []);
      }
    } catch (error) {
      console.error("Error loading stories:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadStories();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const newPreviews = URL.createObjectURL(file);
    setPreviews(newPreviews);
    openModal(
      <StoryInput
        previews={newPreviews}
        file={file}
        onStoryCreated={loadStories}
        setImages={setImages}
      />
    );
    e.currentTarget.value = "";
  };


  const userDetail = typeof window !== "undefined" ? localStorage.getItem("user") : null;
  const user = userDetail ? JSON.parse(userDetail) : null;
  const initials = getInitials(user?.username || user?.name);

  return (
    <div className="w-full bg-[#171718] p-2 flex flex-col lg:flex-row items-start gap-8 pt-2 rounded-lg shadow-xl">
      {/* Left: user card */}
      <div className="bg-[#36363abc] pl-10 rounded-2xl p-6 shadow-lg flex flex-col items-center justify-center gap-2">
        <div className="h-20 w-20 bg-gray-300 rounded-2xl relative flex items-center justify-center text-2xl font-semibold text-gray-800 shadow-inner">
          {initials}
        </div>

        <div className="text-center">
          <div className="text-sm text-gray-400">Share your story</div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,video/*"
          onChange={handleFileChange}
          className="hidden"
        />

        <Button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          aria-label="Create Story"
          className="mt-2 inline-flex items-center gap-1"
        >
          <div className="bg-indigo-600/90 p-1 rounded-full">
            <Plus size={16} />
          </div>
          <span className="font-medium">Create Story</span>
        </Button>
      </div>

      {/* Right: previews (horizontal scroll) */}
      <div className="flex-1 overflow-x-auto hide-scrollbar scroll-smooth">
        <div className="flex gap-4 pb-2">
          {isLoading ? (
            <div className="flex gap-4">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="relative rounded-lg overflow-hidden shadow-md h-52 w-40 bg-slate-800 animate-pulse shrink-0"
                >
                  <div className="bg-slate-700 h-8 w-8 rounded-full absolute left-2 top-3" />
                </div>
              ))}
            </div>
          ) : stories.length === 0 ? (
            <div className="flex items-center justify-center py-10 w-full text-gray-500 text-sm">
              No active stories. Be the first to share one!
            </div>
          ) : (
            stories.map((story, idx) => {
              const storyInitials = getInitials(story.user?.username || story.user?.email);
              return (
                <div
                  key={story._id || idx}
                  className="relative rounded-lg overflow-hidden shadow-md h-52 w-40 bg-gray-800 cursor-pointer shrink-0"
                >
                  <div className="bg-indigo-600 text-white h-8 w-8 rounded-full absolute left-2 top-3 flex justify-center items-center font-semibold text-xs z-10 shadow-md">
                    {storyInitials}
                  </div>
                  {story.mediaType === "video" ? (
                    <video
                      src={story.mediaUrl}
                      className="w-full h-full object-cover"
                      onClick={() =>
                        openModal(
                          <StoryOutput
                            story={story}
                            onStoryDeleted={loadStories}
                          />
                        )
                      }
                    />
                  ) : (
                    <img
                      src={story.mediaUrl}
                      alt={`story-${idx}`}
                      className="w-full h-full object-cover"
                      onClick={() =>
                        openModal(
                          <StoryOutput
                            story={story}
                            onStoryDeleted={loadStories}
                          />
                        )
                      }
                    />
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default StorySection;
