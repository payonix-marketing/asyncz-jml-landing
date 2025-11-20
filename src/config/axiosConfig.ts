// src/config/axiosConfig.ts
import axios from "axios";
import { handleAPIError } from "../utils/errorHandler";
import {logout, refresh} from "../api/api"; // 👈 Import refresh API

const baseURL =
    process.env.NODE_ENV === "production"
        ? process.env.REACT_APP_API_PROD_BASE_URL + "/api"
        : process.env.REACT_APP_API_LOCAL_BASE_URL + "/api";

const instance = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

// ─── CSRF Token ───────────────────────────────────────────────────────────────
instance.interceptors.request.use((config) => {
    const isRefresh = config.url?.includes("/refresh");

    const cookieKey = isRefresh ? "csrf_refresh_token" : "csrf_access_token";

    const csrfToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith(`${cookieKey}=`))
        ?.split("=")[1];

    if (csrfToken) {
        config.headers["X-CSRF-TOKEN"] = csrfToken;
    }

    return config;
});

// ─── Token Refresh Logic ──────────────────────────────────────────────────────
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) prom.reject(error);
        else prom.resolve(token);
    });
    failedQueue = [];
};

instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then(() => instance(originalRequest));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                await refresh();
                processQueue(null);
                return instance(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError, null);

                // Logout if refresh fails
                await logout();

                return Promise.reject(handleAPIError(refreshError));
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(handleAPIError(error));
    }
);

export default instance;
