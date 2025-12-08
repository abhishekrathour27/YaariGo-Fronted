"use client"
import LeftSidebarHOC from "@/components/custom/sidebar/LeftSidebarHOC";
import MiddleBarHOC from "@/components/screens/MiddleBar/MiddleBarHOC";
import RightSidebar from "@/components/screens/RightSidebar/RightSidebar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const page = () => {
  const router = useRouter();

  const user = localStorage.getItem("user");
  useEffect(() => {

    if (!user) {
      router.push("/userLogin");
    }
  }, [user]);

  return (
    <div className="flex justify-between">
      <LeftSidebarHOC />
      <MiddleBarHOC />
      <RightSidebar />
    </div>
  );
};

export default page;
