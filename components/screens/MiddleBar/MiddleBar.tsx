"use client";
import { useModal } from "@/context/ModalContext";
import { Plus, Trash2, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import StoryInput from "../StoryInput/StoryInput";

const Story: React.FC = () => {
  const [images, setImages] = useState<string[]>([]); // base64
  const [previews, setPreviews] = useState<string>(); // object URLs (if needed)
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { openModal } = useModal();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files!;
    if (files?.length === 0) return;

    const newPreviews = URL.createObjectURL(files[0]);
    setPreviews(newPreviews);
    openModal(<StoryInput previews={newPreviews} setImages={setImages} />);

    // const base64Promises = files.map(
    //   (file) =>
    //     new Promise<string>((resolve, reject) => {
    //       const reader = new FileReader();
    //       reader.readAsDataURL(file);
    //       reader.onloadend = () => resolve(reader.result as string);
    //       reader.onerror = (err) => reject(err);
    //     })
    // );

    // Promise.all(base64Promises)
    //   .then((base64Array) => {
    //     setImages((prev) => [...prev, ...base64Array]);

    //     // open modal and pass images & previews (use whichever your StoryInput expects)
    //   })
    //   .catch((err) => {
    //     console.error("Failed to read files as base64", err);
    //   });

    e.currentTarget.value = "";
  };

  const handleRemoveStory = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImages((prev) => {
      // revoke the removed preview URL
      if (prev?.[index]) URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  return (
    <div className="w-full flex flex-col lg:flex-row items-start  gap-8 p-6">
      {/* Left: user card */}
      <div className=" bg-[#0f1724] pl-10 rounded-2xl p-6 shadow-lg flex flex-col items-center gap-4">
        <div className="h-28 w-28 bg-gray-300 rounded-2xl relative flex items-center justify-center text-2xl font-semibold text-gray-800 shadow-inner">
          AS
        </div>

        <div className="text-center">
          <div className="text-white font-medium text-lg">Abhishek Singh</div>
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

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          aria-label="Create Story"
          className="mt-2 inline-flex items-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 text-white rounded-full shadow-md transition"
        >
          <div className="bg-indigo-600/90 p-1 rounded-full">
            <Plus size={16} />
          </div>
          <span className="font-medium">Create Story</span>
        </button>
      </div>

      {/* Right: previews */}

      {images.map((src, idx) => (
        <div
          key={idx}
          className="relative rounded-lg overflow-hidden shadow-md h-40 w-40 bg-gray-800"
        >
          <Trash2
            onClick={() => handleRemoveStory(idx)}
            className="absolute cursor-pointer z-50"
          />
          <img
            src={images[idx] ?? src}
            alt={`preview-${idx}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export default Story;
