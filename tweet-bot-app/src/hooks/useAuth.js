import { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "../providers/AuthenticationProvider";
import AuthenticationService, { TOKEN_STORAGE_KEY } from "../services/authentication.service";

const authenticationService = AuthenticationService(
    import.meta.env.VITE_API_URL,
)

export default function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const {
        authenticationLoading,
        authenticationError,
        setAuthenticationLoading,
        setAuthenticationError,
    } = useContext(AuthenticationContext);

    const authenticate = async (credentials = {}) => {
        setAuthenticationLoading(true);

        try {
            const newToken = await authenticationService
                .authenticate(credentials);

            setAuthentication(newToken);
            setIsAuthenticated(true);
        } catch (error) {
            setAuthenticationError(error);
        } finally {
            setAuthenticationLoading(false);
        }
    }

    const logout = () => {
        setAuthentication(null);
        setIsAuthenticated(false);
    }

    const setAuthentication = (token) => {
        if (!token) {
            localStorage.removeItem(TOKEN_STORAGE_KEY);
        } else {
            localStorage.setItem(TOKEN_STORAGE_KEY, token);
        }
    }
    
    const checkAuthentication = async () => {
        setAuthenticationLoading(true);
        const token = localStorage.getItem(TOKEN_STORAGE_KEY);

        if (!token) {
            setAuthentication(null);
            setAuthenticationLoading(false);
            return;
        }

        try {
            const newToken = await authenticationService
                .checkAuthentication(token);

            setAuthentication(newToken);
            setIsAuthenticated(true);
        } catch (error) {
            setAuthenticationError(error);
        } finally {
            setAuthenticationLoading(false);
        }
    }

    useEffect(() => {
        checkAuthentication();
    }, []);


    return {
        isAuthenticated,
        authenticationError,
        authenticationLoading,
        authenticate,
        logout,
    }
}