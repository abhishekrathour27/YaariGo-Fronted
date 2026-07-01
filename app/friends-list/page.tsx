"use client";

import Button from "@/components/custom/CustomBtn/Button";
import React, { useEffect, useState } from "react";
import { userServices } from "@/services/userServices";
import { Loader2, UserMinus, UserCheck, UserPlus, Users } from "lucide-react";

interface UserProfile {
  _id: string;
  username: string;
  email: string;
  profilePicture?: string;
  followerCount: number;
}

const Page = () => {
  const [requests, setRequests] = useState<UserProfile[]>([]);
  const [suggestions, setSuggestions] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  const fetchFriendsData = async () => {
    setLoading(true);
    try {
      const requestsRes = await userServices.getFriendRequests();
      const suggestionsRes = await userServices.getUsersToRequest();

      if (requestsRes?.data) {
        setRequests(requestsRes.data);
      }
      if (suggestionsRes?.data) {
        setSuggestions(suggestionsRes.data);
      }
    } catch (error) {
      console.error("Error fetching friends data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFriendsData();
  }, []);

  const handleConfirmRequest = async (senderId: string) => {
    setActionLoadingId(senderId);
    try {
      // Confirming request is follow back
      const res = await userServices.followUser(senderId);
      if (res) {
        setRequests((prev) => prev.filter((r) => r._id !== senderId));
      }
    } catch (error) {
      console.error("Error confirming friend request:", error);
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleDeleteRequest = async (senderId: string) => {
    setActionLoadingId(senderId);
    try {
      const res = await userServices.deleteFriendRequest(senderId);
      if (res) {
        setRequests((prev) => prev.filter((r) => r._id !== senderId));
      }
    } catch (error) {
      console.error("Error deleting friend request:", error);
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleSendRequest = async (userId: string) => {
    setActionLoadingId(userId);
    try {
      const res = await userServices.followUser(userId);
      if (res) {
        setSuggestions((prev) => prev.filter((s) => s._id !== userId));
      }
    } catch (error) {
      console.error("Error sending friend request:", error);
    } finally {
      setActionLoadingId(null);
    }
  };

  const getInitials = (username: string) => {
    return username
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "U";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B1220] text-white flex flex-col items-center justify-center ml-15">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-500 mb-2" />
        <p className="text-gray-400 text-sm">Loading people and requests...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B1220] text-white p-8 ml-15">
      {/* Friend Requests Section */}
      <div className="mb-12">
        <div className="flex items-center gap-2.5 mb-6">
          <Users className="w-6 h-6 text-indigo-500" />
          <h1 className="text-2xl font-bold tracking-tight">Friend Requests</h1>
          {requests.length > 0 && (
            <span className="bg-indigo-600 text-xs px-2.5 py-1 rounded-full font-semibold">
              {requests.length}
            </span>
          )}
        </div>

        {requests.length === 0 ? (
          <div className="bg-[#121B2E] border border-slate-800 rounded-xl p-8 max-w-2xl">
            <div className="text-gray-400 mb-4 text-3xl">👤✕</div>
            <h2 className="text-xl font-semibold mb-2 text-slate-100">No Friend Requests</h2>
            <p className="text-slate-400 text-sm max-w-md">
              Looks like you are all caught up! Why not explore suggestions and connect with new people?
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {requests.map((item) => (
              <div
                key={item._id}
                className="bg-[#1A2332] rounded-xl p-5 border border-slate-800 flex flex-col items-center shadow-lg hover:shadow-2xl transition duration-200"
              >
                {item.profilePicture ? (
                  <img
                    src={item.profilePicture}
                    alt={item.username}
                    className="w-24 h-24 rounded-full object-cover border-2 border-slate-700 mb-4 shadow"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-slate-700 border-2 border-slate-600 flex items-center justify-center text-2xl font-bold text-slate-300 mb-4">
                    {getInitials(item.username)}
                  </div>
                )}

                <h3 className="font-semibold text-lg text-slate-100 capitalize mb-1">{item.username}</h3>
                <p className="text-xs text-slate-400 mb-5">{item.email}</p>

                <div className="w-full flex gap-3">
                  <Button
                    onClick={() => handleConfirmRequest(item._id)}
                    disabled={actionLoadingId === item._id}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2"
                  >
                    {actionLoadingId === item._id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <UserCheck className="w-4 h-4" />
                    )}
                    Confirm
                  </Button>
                  <button
                    onClick={() => handleDeleteRequest(item._id)}
                    disabled={actionLoadingId === item._id}
                    className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 font-medium rounded-lg text-sm px-4 py-2.5 text-center flex items-center justify-center gap-1.5 transition cursor-pointer"
                  >
                    {actionLoadingId === item._id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <UserMinus className="w-4 h-4" />
                    )}
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Friend Suggestions Section */}
      <div>
        <div className="flex items-center gap-2.5 mb-6">
          <UserPlus className="w-6 h-6 text-indigo-500" />
          <h2 className="text-2xl font-bold tracking-tight">Friend Suggestions</h2>
        </div>

        {suggestions.length === 0 ? (
          <div className="bg-[#121B2E] border border-slate-800 rounded-xl p-8 max-w-2xl">
            <h2 className="text-xl font-semibold mb-2 text-slate-100">No Suggestions Available</h2>
            <p className="text-slate-400 text-sm max-w-md">
              There are no new suggestions at the moment. Try checking back later or searching for friends directly.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {suggestions.map((item) => (
              <div
                key={item._id}
                className="bg-[#1A2332] rounded-xl p-5 border border-slate-800 flex flex-col items-center shadow-lg hover:shadow-2xl transition duration-200"
              >
                {item.profilePicture ? (
                  <img
                    src={item.profilePicture}
                    alt={item.username}
                    className="w-24 h-24 rounded-full object-cover border-2 border-slate-700 mb-4 shadow"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-slate-700 border-2 border-slate-600 flex items-center justify-center text-2xl font-bold text-slate-300 mb-4">
                    {getInitials(item.username)}
                  </div>
                )}

                <h3 className="font-semibold text-lg text-slate-100 capitalize mb-1">{item.username}</h3>
                <p className="text-xs text-slate-400 mb-5">{item.email}</p>

                <Button
                  onClick={() => handleSendRequest(item._id)}
                  disabled={actionLoadingId === item._id}
                  className="w-full flex items-center justify-center gap-1.5 py-2"
                >
                  {actionLoadingId === item._id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <UserPlus className="w-4 h-4" />
                  )}
                  Add Friend
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
