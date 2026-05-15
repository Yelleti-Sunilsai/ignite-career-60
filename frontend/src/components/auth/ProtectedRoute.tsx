import { Navigate } from "@tanstack/react-router";
import { useAuthStore } from "@/store/auth.store";
import { Loader2 } from "lucide-react";

interface Props {
    children: React.ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
    const { isAuthenticated, isInitialized } = useAuthStore();

    if (!isInitialized) {
        return (
            <div className="flex h-screen w-screen items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="text-sm font-medium text-muted-foreground">
                        Restoring session...
                    </p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;