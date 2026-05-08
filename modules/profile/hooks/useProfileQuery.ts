"use client";

import { useQuery } from "@tanstack/react-query";
import { getCurrentUserData } from "../actions/indext";

export function useProfileQuery() {
  return useQuery({
    queryKey: ["user-profile"],
    queryFn: async () => {
      const userData = await getCurrentUserData();
      if (!userData) {
        throw new Error("Failed to fetch user data");
      }
      return userData;
    },
    staleTime: 1000 * 60 * 5, 
    gcTime: 1000 * 60 * 10,
    retry: 1,
  });
}
