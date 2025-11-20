import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { login, register, logout, getAuthUser } from "../api/api";
import { useToast } from "../hooks/use-toast";
import {LoginCredentials, RegisterData, User} from "../types";

type UserWithoutPassword = Omit<User, "password">;

type AuthContextType = {
    user: UserWithoutPassword | null;
    isLoading: boolean;
    error: Error | null;
    isAuthenticated: boolean;
    loginUser: (credentials: LoginCredentials) => Promise<void>;
    registerUser: (data: RegisterData) => Promise<User>;
    logoutUser: () => Promise<void>;
    // loginWithGoogle: (code: string) => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const { toast } = useToast();
    const [user, setUser] = useState<UserWithoutPassword | null>(null);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        // getAuthUser()
        //     .then((u) => setUser(u))
        //     .catch((err) => setError(err))
        //     .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (isLoading || user) return;

        // const startGoogle = () => {
        //     const g = (window as any).google;
        //     if (!g?.accounts?.oauth2) return;
        //     const client = g.accounts.oauth2.initCodeClient({
        //         client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID as string,
        //         scope: 'openid email profile',
        //         ux_mode: 'popup',
        //         callback: (resp: any) => {
        //             if (resp.code) {
        //                 loginWithGoogleFn(resp.code);
        //             }
        //         },
        //     });
        //     client.requestCode();
        // };

        // if (!(window as any).google) {
        //     const script = document.createElement('script');
        //     script.src = 'https://accounts.google.com/gsi/client';
        //     script.async = true;
        //     script.defer = true;
        //     script.onload = startGoogle;
        //     document.body.appendChild(script);
        //     return () => {
        //         document.body.removeChild(script);
        //     };
        // } else {
        //     startGoogle();
        // }
    }, [isLoading, user]);

    const loginUser = async (credentials: LoginCredentials) => {
        try {
            const user = await login(credentials.email, credentials.password, credentials.remember_me);
            console.log(user);
            setUser(user);
            toast({
                title: "Login successful",
                description: `Welcome back, ${user.first_name || user.username}!`,
            });
        } catch (error: any) {
            setError(error);
            toast({
                title: "Login failed",
                description: error.message,
                variant: "destructive",
            });
        }
    };

    const registerUser = async (data: RegisterData) => {
        try {
            const user = await register(data);
            toast({
                title: "Registration successful",
                description: `Welcome to SurpriseTable, ${user.first_name || user.username}!`,
            });
            return user;
        } catch (error: any) {
            setError(error);
            toast({
                title: "Registration failed",
                description: error.message,
                variant: "destructive",
            });
            throw error;
        }
    };

    const logoutUser = async () => {
        try {
            await logout();
            setUser(null);
            toast({
                title: "Logged out",
                description: "You have been logged out.",
            });
        } catch (error: any) {
            toast({
                title: "Logout failed",
                description: error.message,
                variant: "destructive",
            });
        }
    };

    // const loginWithGoogleFn = async (code: string) => {
    //     try {
    //         const user = await loginWithGoogle(code);
    //         setUser(user);
    //         toast({
    //             title: "Login successful",
    //             description: `Welcome back, ${user.first_name || user.username}!`,
    //         });
    //     } catch (error: any) {
    //         setError(error);
    //         toast({
    //             title: "Google login failed",
    //             description: error.message,
    //             variant: "destructive",
    //         });
    //     }
    // };

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                error,
                isAuthenticated: !!user,
                loginUser,
                registerUser,
                logoutUser,
                // loginWithGoogle: loginWithGoogleFn,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
