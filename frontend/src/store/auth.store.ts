import { create } from "zustand";

interface User {
    id: string;
    email: string;
    name: string;
    initials?: string;
    [key: string]: any;
}

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isInitialized: boolean;

    setAuth: (user: User, token: string) => void;
    logout: () => void;
    loadUser: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    token: null,
    isAuthenticated: false,
    isInitialized: false,

    setAuth: (user, token) => {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        set({
            user,
            token,
            isAuthenticated: true,
            isInitialized: true,
        });
    },

    logout: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        set({
            user: null,
            token: null,
            isAuthenticated: false,
            isInitialized: true,
        });
    },

    loadUser: () => {
        try {
            const token = localStorage.getItem("token");
            const userStr = localStorage.getItem("user");

            if (token && userStr) {
                const user = JSON.parse(userStr);
                set({
                    token,
                    user,
                    isAuthenticated: true,
                    isInitialized: true,
                });
            } else {
                set({
                    token: null,
                    user: null,
                    isAuthenticated: false,
                    isInitialized: true,
                });
            }
        } catch (error) {
            console.error("Failed to load user from session", error);
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            set({
                token: null,
                user: null,
                isAuthenticated: false,
                isInitialized: true,
            });
        }
    },
}));