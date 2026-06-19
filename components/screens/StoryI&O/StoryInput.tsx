import React, { useState } from "react";
import CustomBtn from "@/components/custom/CustomBtn/Button";
import { useModal } from "@/context/ModalContext";
import { postServices } from "@/services/postServices";

interface StoryInputProps {
  images?: string;
  previews?: string;
  file?: File;
  onStoryCreated?: () => void;
  onClose?: () => void;
  setImages?: React.Dispatch<React.SetStateAction<string[]>>;
}

const StoryInput: React.FC<StoryInputProps> = ({
  previews = "",
  file,
  onStoryCreated,
  setImages,
}) => {
  const { closeModal } = useModal();
  const [isUploading, setIsUploading] = useState(false);

  // Retrieve user details from localStorage for preview header
  const userDetail = typeof window !== "undefined" ? localStorage.getItem("user") : null;
  const user = userDetail ? JSON.parse(userDetail) : null;
  const username = user?.username || user?.name || "User";
  const initials = username
    .split(/[\s_-]+/)
    .map((word: string) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleShare = async () => {
    if (file) {
      try {
        setIsUploading(true);
        const formData = new FormData();
        formData.append("media", file);

        const response = await postServices.createStory(formData);
        if (response) {
          onStoryCreated?.();
          closeModal();
        }
      } catch (error) {
        console.error("Error creating story:", error);
      } finally {
        setIsUploading(false);
      }
    } else {
      // Fallback to local state if no file was passed
      setImages?.((prev) => [...prev, previews]);
      closeModal();
    }
  };

  return (
    <div className="w-full max-w-md bg-slate-900 rounded-xl shadow-xl overflow-hidden">
      
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-700">
        <div className="h-9 w-9 bg-gray-200 text-slate-800 rounded-full flex items-center justify-center font-semibold text-sm">
          {initials}
        </div>
        <div>
          <p className="text-sm font-medium text-white">{username}</p>
          <p className="text-xs text-gray-400">Create story</p>
        </div>
      </div>

      {/* Preview */}
      <div className="p-4">
        <div className="relative w-full h-[360px] rounded-lg overflow-hidden bg-slate-800">
          {previews ? (
            <img
              src={previews}
              alt="story preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400 text-sm">
              No preview available
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 px-4 pb-4">
        <CustomBtn
          onClick={handleShare}
          disabled={isUploading}
          className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-800 disabled:opacity-50 text-white rounded-full flex items-center justify-center min-w-[120px]"
        >
          {isUploading ? "Sharing..." : "Share Story"}
        </CustomBtn>
      </div>
    </div>
  );
};

export default StoryInput;
