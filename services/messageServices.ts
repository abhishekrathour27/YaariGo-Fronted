import { apiEndPoints } from "@/constant/api";
import { authenticatedInstance } from "@/utils/axios";
import { toast } from "sonner";

export const messageServices = {
    sendMessage: async (receiverId: string, message: string) => {
        try {
            const response = await authenticatedInstance.post(
                apiEndPoints.sendMessage(receiverId),
                { message }
            );
            return response?.data;
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Failed to send message");
        }
    },

    getMessages: async (chatUserId: string) => {
        try {
            const response = await authenticatedInstance.get(
                apiEndPoints.getMessages(chatUserId)
            );
            return response?.data;
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Failed to fetch messages");
        }
    },

    deleteForMe: async (messageId: string, userId: string) => {
        try {
            const response = await authenticatedInstance.post(
                apiEndPoints.deleteForMe,
                { messageId, userId }
            );
            toast.success(response?.data?.message || "Message deleted for you");
            return response?.data;
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Failed to delete message");
        }
    },

    deleteForEveryOne: async (messageId: string, senderId: string) => {
        try {
            const response = await authenticatedInstance.post(
                apiEndPoints.deleteForEveryOne,
                { messageId, senderId }
            );
            toast.success(response?.data?.message || "Message deleted for everyone");
            return response?.data;
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Failed to delete message for everyone");
        }
    },
};
