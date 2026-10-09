import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import toast from "react-hot-toast";

import {
  addContactDetails,
  getAllContactDetails,
} from "../../Service/contact.service";


// ==========================================
// ADD CONTACT DETAILS
// ==========================================

export const useAddContactDetails = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addContactDetails,

    onSuccess: (data) => {
        console.log(data)
      toast.success(
        data?.message || "Contact details added successfully!"
      );

      // Contacts list ko fresh data milega
      queryClient.invalidateQueries({
        queryKey: ["contacts"],
      });
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
        "Failed to add contact details!"
      );
    },
  });
};


// ==========================================
// FETCH ALL CONTACT DETAILS
// ==========================================

export const useAllContactDetails = () => {
  return useQuery({
    queryKey: ["contacts"],
    queryFn: getAllContactDetails,

    // Optional
    staleTime: 5 * 60 * 1000,

    // Optional retry
    retry: 1,
  });
};