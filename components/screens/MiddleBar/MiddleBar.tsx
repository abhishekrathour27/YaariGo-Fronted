import StorySection from "./Components/StorySection";
import PostSection from "./Components/PostSection";
import CreatePost from "./Components/createPost";

const MiddleBar = () => {
  return (
    <div>
      <div className="w-[45vw] shadow-xl space-y-2 overflow-y-scroll hide-scrollbar h-[92vh] ml-40 mt-5   ">
        <CreatePost/>
        <StorySection />
        <PostSection />
      </div>
    </div>
  );
};

export default MiddleBar;
