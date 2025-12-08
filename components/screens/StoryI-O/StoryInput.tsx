import React from "react";
import CustomBtn from "@/components/custom/CustomBtn/Button";
import { useModal } from "@/context/ModalContext";

interface StoryInputProps {
  images?: string; // base64 strings (optional)
  previews?: string; // object URLs for preview (optional)
  onClose?: () => void; // optional callback to close modal
  setImages?: React.Dispatch<React.SetStateAction<string[]>>;
}

const StoryInput: React.FC<StoryInputProps> = ({
  previews = "",
  onClose,
  setImages,
}) => {
  // share handler (placeholder) — replace with actual upload logic

  const {closeModal}=useModal()

  const handleShare = () => {
    // Example: send `images` (base64) to your API
    // fetch("/api/stories", { method: "POST", body: JSON.stringify({ images }) })
    setImages?.((prev) => [...prev, previews]);

    closeModal()
  };


  return (
    <div className="max-w-md w-full bg-slate-700 rounded-lg p-4 shadow-md">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center font-semibold">
          AS
        </div>
        <div>
          <div className="font-medium">Abhishek Singh</div>
          <div className="text-xs text-gray-500">Share your story</div>
        </div>
      </div>

      {/* Preview area */}
      <div className="mb-4">
          <div className="grid grid-cols-2 gap-2">
              <img
                src={previews}
                alt='story image'
                className="h-28 w-full object-cover rounded"
                onError={(e) => {
                  // if object URL fails, try fallback to images[index] if available
                  const el = e.currentTarget as HTMLImageElement;
                }}
              />
          </div>
      </div>
      <div className="flex justify-end">
        {/* Using label prop for CustomBtn — change if your CustomBtn uses children */}
        <CustomBtn onClick={handleShare} className="px-6 py-2">
          share
        </CustomBtn>
      </div>
    </div>
  );
};

export default StoryInput;
