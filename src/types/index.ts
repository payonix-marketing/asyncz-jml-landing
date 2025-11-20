export type User = Omit<SchemaUser, "password">;

export type Restaurant = SchemaRestaurant;

export type Booking = SchemaBooking & {
    restaurant?: Restaurant;
} & {
    payment_session_id?: string;
    payment_url?: string;
    message?: string;
};

export type Referral = SchemaReferral & {
    referrer?: User;
    referred?: User;
};

export type Feedback = SchemaFeedback & {
    user?: User;
    booking?: Booking;
};

export type LoginCredentials = {
    email: string;
    password: string;
    remember_me?: boolean;
};

export type RegisterData = {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    username: string;
    is_restaurant_owner?: boolean;
    referred_by?: string;
};

export type BookingFormData = {
    date: string;
    time: string;
    guests: string;
    dietary_restrictions?: string[];
    special_requests?: string;
    notes?: string;
    total_price?: string;
};

export type FeedbackFormData = {
    rating: number;
    comment?: string;
};

export type FilterOptions = {
    search?: string;
    cuisine?: string | "all";
    price_range?: {
        min: number;
        max: number;
    };
    sort_by?: "rating" | "distance" | "name" | "none";
    sort_order?: "asc" | "desc";
    min_rating?: number;
    max_distance?: number;
};

export type ApiResponse<T> = {
    data: T;
    error?: string;
};

export interface ShuffleBookingPayload {
    location: string;
    date: string;
    time: string;
    guests: string; // or number, depends on frontend
    dietary_restrictions?: string[];
}

export type ShuffleResponse = {
    payment_session_id: string;
} & ShuffleBookingResult[]

export interface ShuffleBookingResult {
    // Adjust based on your backend Restaurant schema
    id: number;
    name: string;
    city: string;
    address: string;
    [key: string]: any;
}

export interface ShuffleBookingResponse {
    session_id: string;
    restaurants: ShuffleBookingResult[];
}

export type SchemaUser = {
    id: number;
    username: string;
    email: string;
    avatar?: string;
    first_name: string;
    last_name: string;
    is_restaurant_owner?: boolean;
    referral_code?: string;
    referred_by?: string;
    created_at: string;
    is_email_verified?: boolean;
};

export type SchemaRestaurant = {
    id: number;
    name: string;
    description: string;
    image: string;
    cuisine: string;
    location: string;
    distance: number; // in km
    rating: number;
    price: number; // in EUR
    owner_id: number;
    created_at: string;
    times_chosen?: number;
    karma_power?: number;
    is_active?: boolean;
    is_auto_accept?: boolean;
    is_email_enabled?: boolean;
};

export type SchemaBooking = {
    id: number;
    user_id: number;
    restaurant_id: number;
    date: string;
    time: string;
    guests: number;
    dietary?: string;
    status: "confirmed" | "completed" | "cancelled" | "awaiting_restaurant_response";
    total_price: number;
    created_at: string;
    code_to_verify?: number;

    // Optional frontend-only extensions:
    restaurant?: Restaurant;
    payment_token?: string;
    payment_url?: string;
    message?: string;
};

export type SchemaReferral = {
    id: number;
    referrer_id: number;
    referred_id: number;
    status: "pending" | "completed";
    reward_amount: number;
    created_at: string;
    completed_at?: string;

    // Optional frontend-only extensions:
    referrer?: User;
    referred?: User;
};

export type SchemaFeedback = {
    id: number;
    user_id: number;
    booking_id: number;
    rating: number;
    comment?: string;
    created_at: string;
    user?: User;
    booking?: Booking;
};

export interface RestaurantFiltersProps {
    on_filter_change: (filters: FilterOptions) => void;
    on_reset_filters?: () => void;
    total_results?: number;
    filters: FilterOptions;
}

export type ReferralStats = {
    total_referrals: number;
    pending_referrals: number;
    completed_referrals: number;
    total_rewards: number;
    available_rewards: number;
};

export enum LegalAgreementType {
    PRIVACY_POLICY = "privacy-policy",
    COOKIE_POLICY = "cookie-policy",
    TERMS_CONDITIONS = "terms-conditions"
}

export type LegalPolicyResponse = {
    code: number,
    content?: string
    created_at?: string,
    message: string
}