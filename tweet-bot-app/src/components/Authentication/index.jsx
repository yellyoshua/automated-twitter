import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";

export default function Authentication({ children }) {
    const { isAuthenticated, authenticationLoading } = useAuth();

    useEffect(() => {
        if (!isAuthenticated && !authenticationLoading) {
            window.location.href = "/login";
        }
    }, [isAuthenticated, authenticationLoading]);

    if (authenticationLoading) {
        return <div>Loading...</div>;
    }

    return isAuthenticated ? children : null;
}