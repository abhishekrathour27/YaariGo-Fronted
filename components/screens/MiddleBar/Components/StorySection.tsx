"use client";
import { useModal } from "@/context/ModalContext";
import { Plus } from "lucide-react";
import React, { useRef, useState } from "react";
import StoryInput from "../../StoryI&O/StoryInput";
import StoryOutput from "../../StoryI&O/StoryOutput";
import Button from "@/components/custom/CustomBtn/Button";

const StorySection: React.FC = () => {
  const [images, setImages] = useState<string[]>([]); // base64
  const [previews, setPreviews] = useState<string>(); // object URLs (if needed)
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { openModal } = useModal();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files!;
    if (!files || files.length === 0) return;

    const newPreviews = URL.createObjectURL(files[0]);
    setPreviews(newPreviews);
    openModal(<StoryInput previews={newPreviews} setImages={setImages} />);
    e.currentTarget.value = "";
  };

  const handleRemoveStory = (index: number) => {
    setImages((prev) => {
      if (prev?.[index]) URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  const userDetail = typeof window !== "undefined" ? localStorage.getItem("user") : null;
  const user = userDetail ? JSON.parse(userDetail) : null;

  const initials = user?.name
    ?.split(" ") // ["Abhishek", "Singh"]
    .map((word: string) => word[0]) // ["A", "S"]
    .join("") // "AS"
    .toUpperCase();

  return (
    <div className="w-full bg-[#171718] p-2 flex flex-col lg:flex-row items-start gap-8 pt-2 rounded-lg shadow-xl">
      {/* Left: user card */}
      <div className="bg-[#36363abc] pl-10 rounded-2xl  p-6 shadow-lg flex flex-col items-center justify-center gap-2">
        <div className="h-20 w-20 bg-gray-300 rounded-2xl relative flex items-center justify-center text-2xl font-semibold text-gray-800 shadow-inner">
          {initials}
        </div>

        <div className="text-center">
          <div className="text-sm text-gray-400">Share your story</div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
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
          {images.map((src, idx) => (
            <div
              key={idx}
              className="relative rounded-lg overflow-hidden shadow-md h-52 w-40 bg-gray-800 cursor-pointer shrink-0"
            >
              <div className="bg-indigo-600 h-8 w-8 rounded-full absolute left-2 top-3 flex justify-center items-center font-semibold">
                {initials}
              </div>
              <img
                src={images[idx] ?? src}
                alt={`preview-${idx}`}
                className="w-full h-full object-cover"
                onClick={() =>
                  openModal(
                    <StoryOutput
                      previews={previews}
                      images={images[idx]}
                      handleRemoveStory={() => handleRemoveStory(idx)}
                    />
                  )
                }
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StorySection;
