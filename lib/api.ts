import { TokenManager } from '@/lib/tokenManager';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;


// Create axios instance with interceptor for adding auth header
export const api = axios.create({
    baseURL: API_URL,
});

// Request interceptor to add auth header
api.interceptors.request.use((config) => {
    const authHeader = TokenManager.getAuthHeader();
    if (authHeader.Authorization) {
        config.headers.Authorization = authHeader.Authorization;
    }
    return config;
});

// Response interceptor to handle token expiration
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expired or invalid
            TokenManager.removeToken();
            if (typeof window !== 'undefined') {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default api;