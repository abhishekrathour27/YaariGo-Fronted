"use client";
import LeftSidebarHOC from "@/components/custom/sidebar/LeftSidebarHOC";
import MiddleBarHOC from "@/components/screens/MiddleBar/MiddleBarHOC";
import RightSidebar from "@/components/screens/RightSidebar/RightSidebar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const page = () => {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage?.getItem("user");
    if (!user) {
      router.push("/userLogin");
    }
  }, [router]);

  return (
    <div className="flex justify-between overflow-y-hidden">
      <div className="">
        <MiddleBarHOC />
      </div>
      <div>
        <RightSidebar />
      </div>
    </div>
    
  );
};

export default page;
