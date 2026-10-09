import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { AuthContext } from "./auth/auth.context";

import "../Features/auth/styles/Auth/AdminRoute.scss";


const AdminRoute = () => {

    const {
        user,
        isLoading,
    } = useContext(AuthContext);

    console.log("AdminRoute user:", user);


    // =====================================================
    // CHECKING AUTHORIZATION
    // =====================================================

    if (isLoading) {
        return (
            <div className="admin-route-state">

                <div className="admin-route-card">

                    <div className="admin-route-spinner"></div>

                    <h3>
                        Checking Authorization
                    </h3>

                    <p>
                        Please wait while we verify your
                        administrator access.
                    </p>

                    <div className="admin-route-loading-line">
                        <span></span>
                    </div>

                </div>

            </div>
        );
    }


    // =====================================================
    // NOT ADMIN
    // =====================================================

    if (user?.role !== "admin") {
        return (
            <Navigate
                to="/dashboard"
                replace
            />
        );
    }


    // =====================================================
    // ADMIN ACCESS
    // =====================================================

    return <Outlet />;
};


export default AdminRoute;