// src/api/api.ts

import axios from "../config/axiosConfig";
import {
    Booking,
    BookingFormData,
    Feedback,
    FeedbackFormData,
    Referral,
    Restaurant,
    FilterOptions,
    User,

    RegisterData,
    ShuffleBookingPayload,
    ShuffleBookingResult,
    ShuffleBookingResponse,
    LegalAgreementType,
    ApiResponse,
    LegalPolicyResponse

} from "../types";
import {Language} from "../context/LanguageContext";

// ── Auth ─────────────────────────────────────────────────────────────

export async function login(email: string, password: string, rememberMe?: boolean): Promise<User> {
    const response = await axios.post<User>("/login", { email, password });
    return response.data;
}

export async function refresh(): Promise<void> {
    await axios.post("/refresh"); // Access token will be re-set in cookie
}

export async function register(userData: RegisterData): Promise<User> {
    const apiUserData = {
        username: userData.username,
        password: userData.password,
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
        is_restaurant_owner: userData.is_restaurant_owner,
        referred_by: userData.referred_by,
    };
    const response = await axios.post<User>("/register", apiUserData);
    return response.data;
}

export async function verifyEmail(userId: number, code: string): Promise<void> {
    await axios.post("/verify-email", { userId, code });
}

export async function logout(): Promise<void> {
    await axios.post("/logout");
}

export async function loginWithGoogle(code: string): Promise<User> {
    const response = await axios.get<User>("/method/google", { params: { code } });
    return response.data;
}

export async function getAuthUser(): Promise<User | null> {
    try {
        const response = await axios.get<User>("/user");
        return response.data;
    } catch (error: any) {
        if (error.response?.status === 401) return null;
        throw error;
    }
}

// ── Profile ────────────────────────────────────────────────────────────

export async function updateProfile(userId: number, profileData: Partial<User>): Promise<User> {
    const response = await axios.patch<User>(`/users/${userId}`, profileData);
    return response.data;
}

export async function changePassword(currentPassword: string, newPassword: string): Promise<void> {
    await axios.post("/users/change-password", { currentPassword, newPassword });
}

// ── Notification Settings ──────────────────────────────────────────────

export interface NotificationSettings {
    id: number;
    user_id: number;
    email_notifications: boolean;
    booking_reminders: boolean;
    special_offers: boolean;
    referral_updates: boolean;
    newsletter: boolean;
}

export async function getNotificationSettings(): Promise<NotificationSettings> {
    const response = await axios.get<NotificationSettings>("/users/notifications");
    return response.data;
}

export async function updateNotificationSettings(settings: Partial<NotificationSettings>): Promise<NotificationSettings> {
    const response = await axios.patch<NotificationSettings>("/users/notifications", settings);
    return response.data;
}

// ── Bookings ───────────────────────────────────────────────────────────

export async function createBooking(bookingData: BookingFormData & { restaurantId: number; session_id?: string; payment_token?: string }): Promise<Booking> {
    const guests = parseInt(bookingData.guests);
    const shuffledRaw = localStorage.getItem("shuffleResult");
    if (!shuffledRaw) throw new Error("No shuffled result found in localStorage");

    const shuffledRestaurants: ShuffleBookingResult[] = JSON.parse(shuffledRaw);
    const { session_id, payment_token, ...rest } = bookingData;

    const data = {
        ...rest,
        guests,
        status: "confirmed",
        shuffledRestaurants,
        session_id,
        payment_token,

    };
    const response = await axios.post<Booking>("/bookings/initiate", data);
    return response.data;
}

export async function getBookings(userId: number): Promise<Booking[]> {
    const response = await axios.get<Booking[]>("/bookings", { params: { userId } });
    return response.data;
}

export async function getBookingById(id: number): Promise<Booking> {
    const response = await axios.get<Booking>(`/bookings/${id}`);
    return response.data;
}

export async function getBookingsByRestaurantId(restaurantId: number): Promise<Booking[]> {
    const response = await axios.get<Booking[]>("/bookings", { params: { restaurantId } });
    return response.data;
}

export async function updateBookingStatus(id: number, status: "confirmed" | "cancelled" | "completed"): Promise<Booking> {
    const { data } = await axios.patch<Booking>(`/bookings/${id}`, { status }, { withCredentials: true });
    return data;
}

export async function confirmPayment(payment_session_id: string): Promise<void> {
    await axios.post<void>("/bookings/confirm_payment", { payment_session_id }, { withCredentials: true });
}

export async function paymentFailed(payment_session_id: string): Promise<void> {
    await axios.post(`/bookings/payment_failed`, { payment_session_id }, { withCredentials: true });
}

// ── Feedback ──────────────────────────────────────────────────────────

export async function createFeedback(bookingId: number, feedbackData: FeedbackFormData): Promise<Feedback> {
    const data = { bookingId, rating: feedbackData.rating, comment: feedbackData.comment || "" };
    const response = await axios.post<Feedback>("/feedback", data);
    return response.data;
}

export async function getFeedbackByBookingId(bookingId: number): Promise<Feedback[]> {
    const response = await axios.get<Feedback[]>("/feedback", { params: { bookingId } });
    return response.data;
}

export async function getUserFeedback(userId: number): Promise<Feedback[]> {
    const response = await axios.get<Feedback[]>("/feedback", { params: { userId } });
    return response.data;
}

export async function getRestaurantFeedback(restaurantId: number): Promise<Feedback[]> {
    const response = await axios.get<Feedback[]>("/feedback", { params: { restaurantId } });
    return response.data;
}

export async function updateFeedback(id: number, feedbackData: Partial<FeedbackFormData>): Promise<Feedback> {
    const response = await axios.patch<Feedback>(`/feedback/${id}`, feedbackData);
    return response.data;
}

export async function deleteFeedback(id: number): Promise<void> {
    await axios.delete(`/feedback/${id}`);
}

// ── Referrals ──────────────────────────────────────────────────────────

function normalizeReferral(raw: any): Referral {
    return {
        id: raw.id,
        referrer_id: raw.referrer_id,
        referred_id: raw.referred_id,
        reward_amount: raw.reward_amount,
        status: raw.status,
        created_at: raw.created_at,
        completed_at: raw.completed_at ?? null,
    };
}

export async function getReferrals(userId: number): Promise<Referral[]> {
    const response = await axios.get<any[]>("/referrals", { params: { userId } });
    return response.data.map(normalizeReferral);
}

export async function createReferral(referrerId: number, referredId: number): Promise<Referral> {
    const response = await axios.post<any>("/referrals", {
        referrer_id: referrerId,
        referred_id: referredId,
        reward_amount: 10,
        status: "pending",
    });
    return normalizeReferral(response.data);
}

export async function completeReferral(id: number): Promise<Referral> {
    const response = await axios.patch<any>(`/referrals/${id}`, {
        status: "completed",
        completed_at: new Date().toISOString(),
    });
    return normalizeReferral(response.data);
}

export async function getReferralStats(userId: number): Promise<{
    total_referrals: number;
    pending_referrals: number;
    completed_referrals: number;
    total_rewards: number;
    available_rewards: number;
}> {
    const referrals = await getReferrals(userId);
    const completed = referrals.filter((r) => r.status === "completed");
    const pending = referrals.filter((r) => r.status === "pending");
    const total_rewards = completed.reduce((sum, r) => sum + r.reward_amount, 0);
    return {
        total_referrals: referrals.length,
        pending_referrals: pending.length,
        completed_referrals: completed.length,
        total_rewards,
        available_rewards: total_rewards,
    };
}

export async function validateReferralCode(code: string): Promise<boolean> {
    const response = await axios.get<{ valid: boolean }>("/referrals/validate", { params: { code } });
    return response.data.valid;
}

// ── Restaurants ────────────────────────────────────────────────────────

export async function getRestaurants(filters?: FilterOptions): Promise<Restaurant[]> {
    const params: Record<string, any> = {};
    if (filters?.cuisine && filters.cuisine !== "all") params.cuisine = filters.cuisine;
    if (filters?.search) params.search = filters.search;
    if (filters?.price_range) {
        params.minPrice = filters.price_range.min;
        params.maxPrice = filters.price_range.max;
    }
    if (filters?.sort_by && filters.sort_by !== "none") {
        params.sortBy = filters.sort_by;
        params.sortOrder = filters.sort_order || "asc";
    }
    if (filters?.min_rating) params.minRating = filters.min_rating;
    if (filters?.max_distance) params.maxDistance = filters.max_distance;

    const response = await axios.get<Restaurant[]>("/restaurants", { params });
    return response.data;
}

export async function getRestaurantById(id: number): Promise<Restaurant> {
    const response = await axios.get<Restaurant>(`/restaurants/${id}`);
    return response.data;
}

export async function getRestaurantsByOwnerId(ownerId: number): Promise<Restaurant[]> {
    const response = await axios.get<Restaurant[]>("/restaurants", { params: { ownerId } });
    return response.data;
}

export async function createRestaurant(restaurantData: Omit<Restaurant, "id" | "created_at">): Promise<Restaurant> {
    const response = await axios.post<Restaurant>("/restaurants", restaurantData);
    return response.data;
}

export async function updateRestaurant(id: number, restaurantData: Partial<Restaurant>): Promise<Restaurant> {
    const response = await axios.patch<Restaurant>(`/restaurants/${id}`, restaurantData);
    return response.data;
}

export async function deleteRestaurant(id: number): Promise<void> {
    await axios.delete(`/restaurants/${id}`);
}

export async function updateRestaurantSettings(
    restaurantId: number,
    settings: { acceptBookings?: boolean; automaticConfirmation?: boolean; emailNotifications?: boolean; }
): Promise<Restaurant> {
    const response = await axios.patch<Restaurant>(`/restaurants/${restaurantId}/settings`, settings);
    return response.data;
}

export async function getRestaurantStats(restaurantId: number): Promise<{
    totalBookings: number;
    totalRevenue: number;
    averageRating: number;
    occupancyRate: number;
}> {
    const response = await axios.get(`/restaurants/${restaurantId}/stats`);
    return response.data;
}

export async function getRestaurantBookingAvailability(restaurantId: number, date: string): Promise<{
    availableSlots: { time: string; capacity: number }[];
}> {
    const response = await axios.get(`/restaurants/${restaurantId}/availability`, { params: { date } });
    return response.data;
}

export async function updateAvailability(
    restaurantId: number,
    availabilityData: {
        date: string;
        slots: { time: string; capacity: number }[];
    }
): Promise<void> {
    await axios.post(`/restaurants/${restaurantId}/availability`, availabilityData);
}

export async function fetchShuffleBooking(payload: ShuffleBookingPayload): Promise<ShuffleBookingResponse> {
    const response = await axios.post<ShuffleBookingResponse>("/restaurants/shuffle", payload);
    return response.data;
}

export async function createAnalyticsLog(source: string, language: Language): Promise<void> {
    await axios.post("/analytics/log", { source, language });
}

export async function getLegalPolicy(type: LegalAgreementType, language: Language): Promise<any> {
    const response = await axios.get<ApiResponse<LegalPolicyResponse>>(`/legal/policy`, {
        params: { type, language }
    });
    return response.data;
}