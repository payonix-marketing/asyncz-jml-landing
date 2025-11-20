// src/utils/errorHandler.ts
import axios from "axios";

export class APIError extends Error {
    constructor(
        message: string,
        public statusCode?: number,
        public details?: any
    ) {
        super(message);
        this.name = 'APIError';
    }
}

export function handleAPIError(error: any): never {
    if (axios.isAxiosError(error)) {
        throw new APIError(
            error.response?.data?.message || 'An error occurred',
            error.response?.status,
            error.response?.data
        );
    }
    throw error;
}
