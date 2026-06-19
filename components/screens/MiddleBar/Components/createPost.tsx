"use client";
import React, { useState, useRef } from "react";
import { Image, Video, Smile, X } from "lucide-react";
import { postServices } from "@/services/postServices";

interface CreatePostProps {
  onPostCreated?: () => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ onPostCreated }) => {
  const [content, setContent] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isPosting, setIsPosting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const userDetail = typeof window !== "undefined" ? localStorage.getItem("user") : null;
  const user = userDetail ? JSON.parse(userDetail) : null;

  const getInitials = (name?: string) => {
    if (!name) return "U";
    return name
      .split(/[\s_-]+/)
      .map((word: string) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const initials = getInitials(user?.username || user?.name);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];
    setSelectedFile(file);

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleRemoveFile = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const triggerFileSelect = (acceptType: string) => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = acceptType;
      fileInputRef.current.click();
    }
  };

  const handlePost = async () => {
    if (!content.trim() && !selectedFile) return;

    try {
      setIsPosting(true);
      const formData = new FormData();
      if (content.trim()) {
        formData.append("content", content.trim());
      }
      if (selectedFile) {
        formData.append("media", selectedFile);
      }

      const response = await postServices.createPost(formData);
      if (response) {
        setContent("");
        handleRemoveFile();
        onPostCreated?.();
      }
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="bg-[#242526] rounded-xl p-4 w-full">
      {/* TOP INPUT */}
      <div className="flex items-center gap-3">
        {/* PROFILE */}
        <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-sm font-semibold text-black cursor-pointer shrink-0">
          {initials}
        </div>

        {/* INPUT */}
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          disabled={isPosting}
          className="flex-1 bg-[#3a3b3c] rounded-full px-4 py-2 text-sm text-gray-200 outline-none focus:bg-[#4a4b4c] disabled:opacity-50"
        />
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Media Preview */}
      {previewUrl && (
        <div className="relative mt-3 rounded-lg overflow-hidden border border-gray-700 bg-gray-800 flex justify-center max-h-[300px]">
          {selectedFile?.type.startsWith("video/") ? (
            <video
              src={previewUrl}
              className="max-h-[300px] object-contain w-full"
              controls
            />
          ) : (
            <img
              src={previewUrl}
              alt="selected preview"
              className="max-h-[300px] object-contain w-full"
            />
          )}
          <button
            onClick={handleRemoveFile}
            className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white rounded-full p-1 transition"
          >
            <X size={18} />
          </button>
        </div>
      )}

      {/* DIVIDER */}
      <div className="border-t border-gray-600 my-3" />

      {/* ACTION BUTTONS & POST */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => triggerFileSelect("image/*")}
            className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-[#3a3b3c] transition"
          >
            <Image className="text-green-500" size={18} />
            <span className="text-gray-300">Photo</span>
          </button>

          <button
            type="button"
            onClick={() => triggerFileSelect("video/*")}
            className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-[#3a3b3c] transition"
          >
            <Video className="text-green-500" size={18} />
            <span className="text-gray-300">Videos</span>
          </button>

          <button
            type="button"
            className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-[#3a3b3c] transition"
          >
            <Smile className="text-green-500" size={18} />
            <span className="text-gray-300">Feelings</span>
          </button>
        </div>

        <button
          type="button"
          onClick={handlePost}
          disabled={isPosting || (!content.trim() && !selectedFile)}
          className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-700 disabled:text-gray-400 disabled:cursor-not-allowed text-white rounded-full font-medium transition shrink-0"
        >
          {isPosting ? "Posting..." : "Post"}
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
