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
    
    // User routes
    followUser: "/api/users/follow",
    unfollowUser: "/api/users/unfollow",
    removeFriendRequest: "/api/users/remove/friend-request",
    getFriendRequests: "/api/users/friend-request",
    getUsersToRequest: "/api/users/users-to-request",
    getMutualFriends: "/api/users/mutual-friends",
    allUsers: "/api/users/all-users",
    registeredUsers: "/api/users/registered-users",
    userProfile: (userId: string) => `/api/users/profile/${userId}`,
    checkAuth: "/api/users/check-auth",
    updateBio: (userId: string) => `/api/users/bio/${userId}`,
    updateProfilePicture: (userId: string) => `/api/users/profile/${userId}`,
    updateCoverPhoto: (userId: string) => `/api/users/profile/cover-photo/${userId}`,

    // Post routes
    createPost: "/api/users/posts",
    deletePost: (postId: string) => `/api/users/posts/${postId}`,
    getAllPosts: "/api/users/posts",
    getPostsByUserId: (userId: string) => `/api/users/posts/user/${userId}`,
    likePost: (postId: string) => `/api/users/posts/likes/${postId}`,
    addComment: (postId: string) => `/api/users/posts/comments/${postId}`,
    sharePost: (postId: string) => `/api/users/posts/share/${postId}`,
    createStory: "/api/users/story",
    getAllStories: "/api/users/story",

    // Message routes
    sendMessage: (receiverId: string) => `/api/message/send/${receiverId}`,
    getMessages: (chatUserId: string) => `/api/message/get/${chatUserId}`,
    deleteForMe: "/api/message/deleteForMe",
    deleteForEveryOne: "/api/message/deleteForEveryOne",

    // Notification routes
    getAllNotifications: "/api/notification/get-all-notification",
    deleteNotification: (notificationId: string) => `/api/notification/delete-notification/${notificationId}`,
};



	