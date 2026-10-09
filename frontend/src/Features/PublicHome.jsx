import { Navigate } from "react-router";
import { useContext } from "react";
import Home from "./main/pages/Home";
import { AuthContext } from "./auth/auth.context";

export const PublicHome = () => {

    const {user} = useContext(AuthContext);

    if (user) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Home />;
};

