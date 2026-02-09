import ForgetPassword from "@/components/screens/Auth/forget-password/ForgetPassword";
import React from "react";

const page = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-r from-fuchsia-600 to-purple-600"> 
      <ForgetPassword />
    </div>
  );
};

export default page;
