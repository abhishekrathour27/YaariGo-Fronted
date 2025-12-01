"use client";
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";

const Story: React.FC = () => {
  // base64 strings (for uploading)
  const [images, setImages] = useState<string[]>([]);
  // object URLs for previewing in <img>
  const [previews, setPreviews] = useState<string[]>([]);

  // handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // create object URLs for previews
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    // append new previews (you can also replace if you want)
    setPreviews((prev) => [...prev, ...newPreviews]);

    // convert to base64 strings for uploading
    const base64Promises = files.map(
      (file) =>
        new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = (err) => reject(err);
        })
    );

    Promise.all(base64Promises)
      .then((base64Array) => {
        setImages((prev) => [...prev, ...base64Array]);
      })
      .catch((err) => {
        console.error("Failed to read files as base64", err);
      });

    // clear the input value so selecting the same file again will trigger change
    e.currentTarget.value = "";
  };

  // cleanup object URLs on unmount or when previews change
  // useEffect(() => {
  //   return () => {
  //     previews.forEach((url) => URL.revokeObjectURL(url));
  //   };
  // }, [previews]);

  return (
    <div className="w-[40vw] flex h-fit items-center gap-20">
      <div className="bg-[#1e2735] flex flex-col items-center rounded-lg my-5 w-fit">
        <div className="bg-gray-400 h-40 w-40 rounded-lg relative z-50 text-4xl flex items-center justify-center">
          AS
        </div>

        <div className="flex flex-col items-center gap-2 mt-1">
          <label className="flex items-center gap-2 cursor-pointer">
            <div className="bg-indigo-600 h-9 w-9 rounded-full flex items-center justify-center">
              <Plus />
            </div>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <span className="text-sm">Create Story</span>
          </label>
        </div>
      </div>

      {/* previews grid */}
      <div className="grid grid-cols-4 gap-2">
        {previews.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`preview-${idx}`}
            className=" object-cover rounded"
          />
        ))}
      </div>

      {/* (optional) show that base64 strings exist for upload */}
      {/* <pre style={{ maxHeight: 120, overflow: "auto" }}>{JSON.stringify(images, null, 2)}</pre> */}
    </div>
  );
};

export default Story;
