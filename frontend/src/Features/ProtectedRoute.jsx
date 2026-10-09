import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { AuthContext } from "./auth/auth.context";

import "../Features/auth/styles/Auth/AdminRoute.scss";


const ProtectedRoute = () => {

    const {
        isAuthenticated,
        isLoading,
    } = useContext(AuthContext);


    // =====================================================
    // CHECKING AUTHENTICATION
    // =====================================================

    if (isLoading) {
        return (
            <div className="admin-route-state">

                <div className="admin-route-card">

                    <div className="admin-route-spinner"></div>

                    <h3>
                        Checking Authentication
                    </h3>

                    <p>
                        Please wait while we verify your account.
                    </p>

                    <div className="admin-route-loading-line">
                        <span></span>
                    </div>

                </div>

            </div>
        );
    }


    // =====================================================
    // NOT LOGGED IN
    // =====================================================

    if (!isAuthenticated) {
        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }


    // =====================================================
    // AUTHENTICATED
    // =====================================================

    return <Outlet />;
};


export default ProtectedRoute;