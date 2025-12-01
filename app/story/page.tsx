"use client";
import { useModal } from "@/context/ModalContext";
import { Image, Undo2, UserCircle2 } from "lucide-react";
import React, { useState } from "react";

const page = () => {
  // base64 strings (for uploading)
  const [images, setImages] = useState<string[]>([]);
  // object URLs for previewing in <img>
  const [previews, setPreviews] = useState<string[]>([]);
  const {openModal} = useModal();

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
    <div className="flex">
      <div className="w-80 border-r-2 border-slate-400 h-screen p-2  ">
        <div className="flex items-center gap-5 bg-gray-800 p-2 rounded-lg">
          <div className="p-2 rounded-full hover:bg-gray-600 focus:outline-none ring-2 ring-blue-300 h-fit w-fit cursor-pointer">
            <Undo2 />
          </div>
          <div>Logo</div>
        </div>
        <div className="p-2 space-y-3">
          <p className="text-xl">Your Story</p>
          <div className=" flex gap-3 items-center">
            <UserCircle2 className="size-10" />
            <p>Abhishek Kumar Singh</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center w-full">
        <div className="h-[40vh] w-[15vw] bg-indigo-500 rounded-lg flex flex-col items-center justify-center gap-2">
          <label
            className="bg-gray-300 text-slate-600 h-10 w-10 flex items-center justify-center rounded-full cursor-pointer"
          >
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <Image  />
          </label>
          <p className="font-semibold">Create a Story</p>
        </div>
      </div>
    </div>
  );
};

export default page;
