import {
    useQuery,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import toast from "react-hot-toast";

import {
    register,
    login,
    forgotPassword,
    resetPassword,
    logout,
    getMe,
    googleLogin,
} from "../Service/auth.service";


// ==========================================
// REGISTER
// ==========================================

export const useRegister = () => {

    return useMutation({

        mutationFn: register,

        onSuccess: (data) => {

            toast.success(
                data?.message ||
                "Registration successful"
            );

        },

        onError: (error) => {

            toast.error(
                error?.response?.data?.message ||
                "Registration failed"
            );

        },

    });

};


// ==========================================
// LOGIN
// ==========================================

export const useLogin = () => {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: login,

        onSuccess: async (data) => {

            toast.success(
                data?.message ||
                "Login successful"
            );


            // ======================================
            // REFRESH USER DATA
            // ======================================

            await queryClient.invalidateQueries({
                queryKey: ["me"],
            });

        },

        onError: (error) => {

            toast.error(
                error?.response?.data?.message ||
                "Login failed"
            );

        },

    });

};


// ==========================================
// FORGOT PASSWORD
// ==========================================

export const useForgotPassword = () => {

    return useMutation({

        mutationFn: forgotPassword,

        onSuccess: (data) => {

            toast.success(
                data?.message ||
                "Password reset link sent"
            );

        },

        onError: (error) => {

            toast.error(
                error?.response?.data?.message ||
                "Failed to send reset link"
            );

        },

    });

};


// ==========================================
// RESET PASSWORD
// ==========================================

export const useResetPassword = () => {

    return useMutation({

        mutationFn: resetPassword,

        onSuccess: (data) => {

            toast.success(
                data?.message ||
                "Password reset successfully"
            );

        },

        onError: (error) => {

            toast.error(
                error?.response?.data?.message ||
                "Password reset failed"
            );

        },

    });

};


// ==========================================
// LOGOUT
// ==========================================

export const useLogout = () => {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: logout,

        onSuccess: (data) => {

            toast.success(
                data?.message ||
                "Logout successful"
            );


            // ======================================
            // REMOVE USER CACHE
            // ======================================

            queryClient.removeQueries({
                queryKey: ["me"],
            });

        },

        onError: (error) => {

            toast.error(
                error?.response?.data?.message ||
                "Logout failed"
            );

        },

    });

};


// ==========================================
// GET ME
// ==========================================

export const useGetMe = () => {

    return useQuery({

        queryKey: ["me"],

        queryFn: getMe,

        retry: false,

        staleTime: 1000 * 60 * 5,

        refetchOnWindowFocus: false,

    });

};


// ==========================================
// GOOGLE LOGIN
// ==========================================

export const useGoogleLogin = () => {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: googleLogin,

        onSuccess: async (data) => {

            toast.success(
                data?.message ||
                "Google login successful"
            );


            // ======================================
            // REFRESH AUTH USER
            // ======================================

            await queryClient.invalidateQueries({
                queryKey: ["me"],
            });

        },

        onError: (error) => {

            toast.error(
                error?.response?.data?.message ||
                "Google login failed"
            );

        },

    });

};