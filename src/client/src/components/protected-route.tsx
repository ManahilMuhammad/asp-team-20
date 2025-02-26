import { useAuth } from "@/hooks/use-auth";
import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { isAuthenticated } = useAuth();

    if ( isAuthenticated() === null ) return <>
        Nutrifit<br/>Loading Screen<br/>
    </>;

    return isAuthenticated() ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
