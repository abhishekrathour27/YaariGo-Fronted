import React, { useEffect } from "react";
import { useModal } from "@/context/ModalContext";

interface StoryInputProps {
  images?: string;
  previews?: string;
  onClose?: () => void;
  setImages?: React.Dispatch<React.SetStateAction<string[]>>;
  handleRemoveStory?: (index: number) => void;
}

const STORY_DURATION = 5000; // 

const StoryOutput: React.FC<StoryInputProps> = ({ previews = "" , images }) => {
  const { closeModal } = useModal();

  // auto close after 5 sec
  useEffect(() => {
    const timer = setTimeout(() => {
      closeModal();
    }, STORY_DURATION);

    return () => clearTimeout(timer);
  }, [closeModal]);

  return (
    <div className="max-w-md w-full bg-slate-800 rounded-lg overflow-hidden shadow-md">
      
      {/* ✅ Progress Bar */}
      <div className="h-1 w-full bg-slate-600">
        <div
          className="h-full bg-white story-progress"
          style={{ animationDuration: `${STORY_DURATION}ms` }}
        />
      </div>

      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3">
        <div className="h-10 w-10 bg-gray-200 text-slate-700 rounded-full flex items-center justify-center font-semibold">
          AS
        </div>
        <div>
          <div className="font-medium text-white">Abhishek Singh</div>
        </div>
      </div>

      {/* Image */}
      <div className="px-4 pb-4">
        <img
          src={images}
          alt="story image"
          className="h-72 w-full object-cover rounded-md"
        />
      </div>

      {/* ✅ Progress animation */}
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
  );
};

export default StoryOutput;
