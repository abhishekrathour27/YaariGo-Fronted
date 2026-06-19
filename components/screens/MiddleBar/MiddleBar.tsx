import React, { useState } from "react";
import StorySection from "./Components/StorySection";
import PostSection from "./Components/PostSection";
import CreatePost from "./Components/createPost";

const MiddleBar = () => {
  const [refreshPosts, setRefreshPosts] = useState(0);

  const handlePostCreated = () => {
    setRefreshPosts((prev) => prev + 1);
  };

  return (
    <div>
      <div className="w-[45vw] shadow-xl space-y-2 overflow-y-scroll hide-scrollbar h-[92vh] ml-40">
        <CreatePost onPostCreated={handlePostCreated} />
        <StorySection />
        <PostSection refreshTrigger={refreshPosts} />
      </div>
    </div>
  );
};

export default MiddleBar;
