import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api/v1';

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: false,
});

api.interceptors.request.use(
    (config) => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('access_token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle unauthorized (401) and forbidden (403) responses
        // These typically indicate expired or invalid tokens
        if (error.response?.status === 401 || error.response?.status === 403) {
            if (typeof window !== 'undefined') {
                // Clear all authentication data
                localStorage.removeItem('access_token');
                localStorage.removeItem('user_data');
                localStorage.removeItem('is_admin');

                // Prevent multiple redirects
                const currentPath = window.location.pathname;
                const isLoginPage = currentPath === '/signin' || currentPath === '/admin/login';

                if (!isLoginPage) {
                    // Check if we are in admin section
                    if (currentPath.startsWith('/admin')) {
                        window.location.href = '/admin/login?expired=true';
                    } else {
                        window.location.href = '/signin?expired=true';
                    }
                }
            }
        }
        return Promise.reject(error);
    }
);
