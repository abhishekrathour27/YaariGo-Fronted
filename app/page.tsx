import LeftSidebarHOC from "@/components/custom/sidebar/LeftSidebarHOC";
import MiddleBarHOC from "@/components/screens/MiddleBar/MiddleBarHOC";
import RightSidebar from "@/components/screens/RightSidebar/RightSidebar";

const page = () => {
  return (
    <div className="flex justify-between">
      <LeftSidebarHOC />
      <MiddleBarHOC />
      <RightSidebar/>
    </div>
  );
};

export default page;
