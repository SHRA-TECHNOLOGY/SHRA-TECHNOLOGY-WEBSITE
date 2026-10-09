import { useQuery } from "@tanstack/react-query";
import { getDashboard } from "../../Service/dashboard.service";

export const useDashboard = () => {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboard,
    staleTime: 2 * 60 * 1000,
  });
};