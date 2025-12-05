// Token management utility for client-side storage
export const TokenManager = {
    // Get token from localStorage
    getToken: (): string | null => {
        if (typeof window === 'undefined') return null;
        return localStorage.getItem('auth_token');
    },

    // Set token in localStorage
    setToken: (token: string): void => {
        if (typeof window === 'undefined') return;
        localStorage.setItem('auth_token', token);
    },

    // Remove token from localStorage
    removeToken: (): void => {
        if (typeof window === 'undefined') return;
        localStorage.removeItem('auth_token');
    },

    // Check if user is authenticated
    isAuthenticated: (): boolean => {
        const token = TokenManager.getToken();
        return !!token;
    },

    // Get authorization header for API calls
    getAuthHeader: (): Record<string, string> => {
        const token = TokenManager.getToken();
        return token ? { Authorization: `Bearer ${token}` } : {};
    }
};

// User data management
export const UserDataManager = {
    // Get user data from localStorage
    getUserData: () => {
        if (typeof window === 'undefined') return null;
        const userData = localStorage.getItem('user_data');
        return userData ? JSON.parse(userData) : null;
    },

    // Set user data in localStorage
    setUserData: (userData: any) => {
        if (typeof window === 'undefined') return;
        localStorage.setItem('user_data', JSON.stringify(userData));
    },

    // Remove user data from localStorage
    removeUserData: () => {
        if (typeof window === 'undefined') return;
        localStorage.removeItem('user_data');
    }
};