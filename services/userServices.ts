import { apiEndPoints } from "@/constant/api";
import { authenticatedInstance } from "@/utils/axios";
import { toast } from "sonner";

export const userServices = {
    followUser: async (userIdToFollow: string) => {
        try {
            const response = await authenticatedInstance.post(
                apiEndPoints.followUser,
                { userIdToFollow }
            );
            toast.success(response?.data?.message || "User followed successfully");
            return response?.data;
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Failed to follow user");
        }
    },

    unfollowUser: async (userIdToUnFollow: string) => {
        try {
            const response = await authenticatedInstance.post(
                apiEndPoints.unfollowUser,
                { userIdToUnFollow }
            );
            toast.success(response?.data?.message || "User unfollowed successfully");
            return response?.data;
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Failed to unfollow user");
        }
    },

    deleteFriendRequest: async (requestSenderId: string) => {
        try {
            const response = await authenticatedInstance.post(
                apiEndPoints.removeFriendRequest,
                { requestSenderId }
            );
            toast.success(response?.data?.message || "Friend request removed");
            return response?.data;
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Failed to remove friend request");
        }
    },

    getFriendRequests: async () => {
        try {
            const response = await authenticatedInstance.get(
                apiEndPoints.getFriendRequests
            );
            return response?.data;
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Failed to fetch friend requests");
        }
    },

    getUsersToRequest: async () => {
        try {
            const response = await authenticatedInstance.get(
                apiEndPoints.getUsersToRequest
            );
            return response?.data;
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Failed to fetch friend suggestions");
        }
    },

    getMutualFriends: async () => {
        try {
            const response = await authenticatedInstance.get(
                apiEndPoints.getMutualFriends
            );
            return response?.data;
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Failed to fetch mutual friends");
        }
    },

    getAllUsers: async (searchQuery: string = "") => {
        try {
            const response = await authenticatedInstance.get(
                `${apiEndPoints.allUsers}${searchQuery ? `?search=${encodeURIComponent(searchQuery)}` : ""}`
            );
            return response?.data;
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Failed to fetch users");
        }
    },

    getRegisteredUsers: async () => {
        try {
            const response = await authenticatedInstance.get(
                apiEndPoints.registeredUsers
            );
            return response?.data;
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Failed to fetch registered users");
        }
    },

    getUserProfile: async (userId: string) => {
        try {
            const response = await authenticatedInstance.get(
                apiEndPoints.userProfile(userId)
            );
            return response?.data;
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Failed to fetch user profile");
        }
    },

    checkUserAuth: async () => {
        try {
            const response = await authenticatedInstance.get(
                apiEndPoints.checkAuth
            );
            return response?.data;
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Authentication check failed");
        }
    },

    updateUserBio: async (userId: string, bioData: {
        bioText?: string;
        liveIn?: string;
        relationShip?: string;
        workPlace?: string;
        education?: string;
        phone?: string;
        homeTown?: string;
    }) => {
        try {
            const response = await authenticatedInstance.put(
                apiEndPoints.updateBio(userId),
                bioData
            );
            toast.success(response?.data?.message || "Bio updated successfully");
            return response?.data;
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Failed to update bio");
        }
    },

    updateUserProfile: async (userId: string, data: FormData) => {
        try {
            const response = await authenticatedInstance.put(
                apiEndPoints.updateProfilePicture(userId),
                data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            toast.success(response?.data?.message || "Profile updated successfully");
            return response?.data;
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Failed to update profile");
        }
    },

    updateCoverPhoto: async (userId: string, data: FormData) => {
        try {
            const response = await authenticatedInstance.put(
                apiEndPoints.updateCoverPhoto(userId),
                data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            toast.success(response?.data?.message || "Cover photo updated successfully");
            return response?.data;
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Failed to update cover photo");
        }
    },
};
