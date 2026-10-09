import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import toast from "react-hot-toast";

import {
  accountSettings,
  passwordSettings,
} from "../../Service/settings.service";


// ==========================================
// ACCOUNT SETTINGS
// ==========================================

export const useAccountSettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: accountSettings,

    onSuccess: (data) => {
      toast.success(
        data?.message ||
          "Account settings updated successfully!"
      );

      // Agar account/user data kisi query se aa raha hai
      queryClient.invalidateQueries({
        queryKey: ["account"],
      });

      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to update account settings!"
      );
    },
  });
};


// ==========================================
// PASSWORD SETTINGS
// ==========================================

export const usePasswordSettings = () => {
  return useMutation({
    mutationFn: passwordSettings,

    onSuccess: (data) => {
      toast.success(
        data?.message ||
          "Password updated successfully!"
      );
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to update password!"
      );
    },
  });
};