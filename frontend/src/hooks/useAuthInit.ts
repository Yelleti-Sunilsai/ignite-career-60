import { useEffect } from "react";
import { useAuthStore } from "@/store/auth.store";

export const useAuthInit = () => {
    const loadUser = useAuthStore((state) => state.loadUser);
    const isInitialized = useAuthStore((state) => state.isInitialized);

    useEffect(() => {
        loadUser();
    }, [loadUser]);

    return { isInitialized };
};
