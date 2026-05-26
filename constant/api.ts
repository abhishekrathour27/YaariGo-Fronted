export const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const apiEndPoints = {
    login: "/api/auth/login",
    signup: "/api/auth/register",
    forgetPassword: "/api/auth/forgot-password",
    resetPassword: (token:string) => `/api/auth/reset-password/${token}`,
    refreshToken: "/auth/refresh-token",
    logout: "/api/auth/logout",
    getUserProfile: "/auth/me",
    updateProfile: "/auth/profile",
    changePassword: "/auth/change-password",
    
};



	