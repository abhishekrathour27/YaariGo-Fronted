import React from "react";
import StorySection from "./Components/StorySection";
import PostSection from "./Components/PostSection";

const MiddleBar = () => {
  return (
    <div>
      <div className="w-[45vw] shadow-xl space-y-2 overflow-y-scroll hide-scrollbar h-[92vh]   ">
        <StorySection />
        <PostSection/>
      </div>
    </div>
  );
};

export default MiddleBar;
