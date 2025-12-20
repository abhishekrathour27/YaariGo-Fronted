import React from "react";
import CustomBtn from "@/components/custom/CustomBtn/Button";
import { useModal } from "@/context/ModalContext";

interface StoryInputProps {
  images?: string;
  previews?: string;
  onClose?: () => void;
  setImages?: React.Dispatch<React.SetStateAction<string[]>>;
}

const StoryInput: React.FC<StoryInputProps> = ({
  previews = "",
  setImages,
}) => {
  const { closeModal } = useModal();

  const handleShare = () => {
    setImages?.((prev) => [...prev, previews]);
    closeModal();
  };

  return (
    <div className="w-full max-w-md bg-slate-900 rounded-xl shadow-xl overflow-hidden">
      
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-700">
        <div className="h-9 w-9 bg-gray-200 text-slate-800 rounded-full flex items-center justify-center font-semibold text-sm">
          AS
        </div>
        <div>
          <p className="text-sm font-medium text-white">Abhishek Singh</p>
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
          className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full"
        >
          Share Story
        </CustomBtn>
      </div>
    </div>
  );
};

export default StoryInput;
