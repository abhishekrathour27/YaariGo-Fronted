import { apiEndPoints } from "@/constant/api";
import { authenticatedInstance } from "@/utils/axios";
import { toast } from "sonner";

export const notificationServices = {
    getAllNotifications: async () => {
        try {
            const response = await authenticatedInstance.get(
                apiEndPoints.getAllNotifications
            );
            return response?.data;
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Failed to fetch notifications");
        }
    },

    deleteNotification: async (notificationId: string) => {
        try {
            const response = await authenticatedInstance.get(
                apiEndPoints.deleteNotification(notificationId)
            );
            toast.success(response?.data?.message || "Notification deleted");
            return response?.data;
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Failed to delete notification");
        }
    },
};
