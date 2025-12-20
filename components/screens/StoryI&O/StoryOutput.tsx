import React, { useEffect } from "react";
import { useModal } from "@/context/ModalContext";

interface StoryInputProps {
  images?: string;
  previews?: string;
  onClose?: () => void;
  setImages?: React.Dispatch<React.SetStateAction<string[]>>;
  handleRemoveStory?: (index: number) => void;
}

const STORY_DURATION = 5000;

const StoryOutput: React.FC<StoryInputProps> = ({ images }) => {
  const { closeModal } = useModal();

  // auto close after 5 sec
  useEffect(() => {
    const timer = setTimeout(() => {
      closeModal();
    }, STORY_DURATION);

    return () => clearTimeout(timer);
  }, [closeModal]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      {/* Story Card */}
      <div className="w-full max-w-sm bg-slate-900 rounded-xl overflow-hidden shadow-2xl relative">

        {/* Progress Bar (top) */}
        <div className="absolute top-0 left-0 w-full h-1 bg-slate-700 z-20">
          <div
            className="h-full bg-white story-progress"
            style={{ animationDuration: `${STORY_DURATION}ms` }}
          />
        </div>

        {/* Image Wrapper */}
        <div className="relative">
          {/* Story Image */}
          <img
            src={images}
            alt="story"
            className="h-[480px] w-full object-cover"
          />

          {/* Gradient overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/30" />

          {/* Header over image */}
          <div className="absolute top-3 left-3 right-3 flex items-center gap-3 z-10">
            <div className="h-9 w-9 bg-gray-200 text-slate-800 rounded-full flex items-center justify-center font-semibold text-sm">
              AS
            </div>

            <div className="flex-1">
              <p className="text-white text-sm font-medium">
                Abhishek Singh
              </p>
              <p className="text-xs text-gray-300">Just now</p>
            </div>

            {/* Close */}
            <button
              onClick={closeModal}
              className="text-white h-7 w-7 cursor-pointer text-lg opacity-90 hover:opacity-100 rounded-lg"
            >
              ✕
            </button>
          </div>
        </div>

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
