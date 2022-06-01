import { createContext, useState } from "react";

export const AuthenticationContext = createContext({});


export default function AuthenticationProvider(props) {
    const [authenticationLoading, setAuthenticationLoading] = useState(false);
    const [authenticationError, setAuthenticationError] = useState(null);

    return <AuthenticationContext.Provider value={{
        authenticationLoading,
        authenticationError,
        setAuthenticationLoading,
        setAuthenticationError,
    }}>
        {props.children}
    </AuthenticationContext.Provider>;
}