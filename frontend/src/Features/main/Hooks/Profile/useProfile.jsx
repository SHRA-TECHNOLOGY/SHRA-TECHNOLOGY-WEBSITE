import { useQuery,useQueryClient,useMutation } from "@tanstack/react-query";
import { getProfileDashboard, updateProfileImage } from "../../Service/profile.service";

// ==========================================
// GET PROFILE DASHBOARD HOOK
// ==========================================

export const useProfileDashboard = () => {
  return useQuery({
    queryKey: ["profile-dashboard"],
    queryFn: getProfileDashboard,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};

// ==========================================
// UPDATE PROFILE IMAGE HOOK
// ==========================================

export const useUpdateProfileImage = () => {

  const queryClient = useQueryClient();

  return useMutation({

    mutationFn: updateProfileImage,

    onSuccess: (data) => {

      // Profile/dashboard data refresh
      queryClient.invalidateQueries({
        queryKey: ["profile-dashboard"]
      });

    },

    onError: (error) => {

      console.error(
        "Profile Image Upload Error:",
        error?.response?.data?.message ||
        error?.message
      );

    }

  });
};