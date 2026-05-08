import { UserProfileData } from "@/types";
import { getCurrentUserData } from "../actions/indext";
import { useQuery } from "@tanstack/react-query";

export function useProfileQuery() {
  return useQuery<UserProfileData>({
    queryKey: ["user-profile"],
    queryFn: async () => {
      const userData = await getCurrentUserData();
      if (!userData) throw new Error("Failed to fetch user data");
      return userData;
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 1,
  });
}