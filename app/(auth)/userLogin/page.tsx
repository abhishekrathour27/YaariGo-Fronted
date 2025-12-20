"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignUpForm from "@/components/screens/Auth/Sign-up/SignUpForm";
import LoginForm from "@/components/screens/Auth/Login/LoginForm";

type AuthTabsProps = {
  initialTab?: "login" | "signUp";
};

const AuthTab = ({ initialTab = "login" }: AuthTabsProps) => {
  const [activeTab, setActiveTab] = useState<string>(initialTab);

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-fuchsia-600 to-purple-600  px-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl border border-gray-100 p-8">
        {/* Tab Container */}
        <Tabs
          defaultValue={initialTab}
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          {/* Tab Buttons */}
          <TabsList className="grid w-full grid-cols-2 rounded-lg bg-gray-100 p-1 mb-6">
            <TabsTrigger
              value="login"
              className="rounded-md cursor-pointer text-gray-600 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-indigo-700 transition-all"
            >
              Login
            </TabsTrigger>

            <TabsTrigger
              value="signUp"
              className="rounded-md cursor-pointer text-gray-600 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-indigo-700 transition-all"
            >
              Sign Up
            </TabsTrigger>
          </TabsList>

          {/* LOGIN TAB CONTENT */}
          <TabsContent value="login" className="animate-fadeIn py-20">
            <LoginForm {...({ switchToSignUp: () => setActiveTab("signUp") } as any)} />
          </TabsContent>

          {/* SIGNUP TAB CONTENT */}
          <TabsContent value="signUp" className="animate-fadeIn py-10">
            <SignUpForm switchToLogin={() => setActiveTab("login")} />
          </TabsContent>
        </Tabs>
      </div>

    </div>
  );
};

export default AuthTab;
