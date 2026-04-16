import axios from 'axios';

// Create axios instance with default config
const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add request interceptor to ensure credentials are sent with every request
axiosInstance.interceptors.request.use(
    (config) => {
        config.withCredentials = true;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor to handle 401 errors
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token is invalid or expired, redirect to login
            console.log('Token expired, redirecting to login');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
