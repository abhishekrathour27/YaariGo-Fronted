"use client";
import React from "react";

type CustomBtnProps = {
  onClick?: () => void;
  children: React.ReactNode;
  className: string;
  disabled?: boolean; // ✅ correct spelling
  type?: "button" | "submit" | "reset"; // ✅ button type options
};

const Button = ({
  children,
  className = "",
  onClick,
  disabled,
  type,
}: CustomBtnProps) => {
  return (
    <button
      onClick={onClick}
      className={`text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5 rounded-lg cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
