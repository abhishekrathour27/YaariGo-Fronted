import { apiEndPoints } from "@/constant/api";
import { authenticatedInstance } from "@/utils/axios";
import { toast } from "sonner";

export const postServices = {
    createPost: async (data: FormData) => {
        try {
            const response = await authenticatedInstance.post(
                apiEndPoints.createPost,
                data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            toast.success(response?.data?.message || "Post created successfully");
            return response?.data;
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Failed to create post");
        }
    },

    deletePost: async (postId: string) => {
        try {
            const response = await authenticatedInstance.delete(
                apiEndPoints.deletePost(postId)
            );
            toast.success(response?.data?.message || "Post deleted successfully");
            return response?.data;
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Failed to delete post");
        }
    },

    getAllPosts: async () => {
        try {
            const response = await authenticatedInstance.get(
                apiEndPoints.getAllPosts
            );
            return response?.data;
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Failed to fetch posts");
        }
    },

    getPostsByUserId: async (userId: string) => {
        try {
            const response = await authenticatedInstance.get(
                apiEndPoints.getPostsByUserId(userId)
            );
            return response?.data;
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Failed to fetch user posts");
        }
    },

    likePost: async (postId: string) => {
        try {
            const response = await authenticatedInstance.post(
                apiEndPoints.likePost(postId)
            );
            toast.success(response?.data?.message);
            return response?.data;
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Failed to like/unlike post");
        }
    },

    addCommentToPost: async (postId: string, text: string) => {
        try {
            const response = await authenticatedInstance.post(
                apiEndPoints.addComment(postId),
                { text }
            );
            toast.success(response?.data?.message || "Comment added successfully");
            return response?.data;
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Failed to add comment");
        }
    },

    sharePost: async (postId: string) => {
        try {
            const response = await authenticatedInstance.post(
                apiEndPoints.sharePost(postId)
            );
            toast.success(response?.data?.message || "Post shared successfully");
            return response?.data;
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Failed to share post");
        }
    },

    createStory: async (data: FormData) => {
        try {
            const response = await authenticatedInstance.post(
                apiEndPoints.createStory,
                data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            toast.success(response?.data?.message || "Story created successfully");
            return response?.data;
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Failed to create story");
        }
    },

    getAllStories: async () => {
        try {
            const response = await authenticatedInstance.get(
                apiEndPoints.getAllStories
            );
            return response?.data;
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Failed to fetch stories");
        }
    },

    deleteStory: async (storyId: string) => {
        try {
            const response = await authenticatedInstance.delete(
                apiEndPoints.deleteStory(storyId)
            );
            toast.success(response?.data?.message || "Story deleted successfully");
            return response?.data;
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Failed to delete story");
        }
    },
};
