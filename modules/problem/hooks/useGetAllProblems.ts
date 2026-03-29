"use client";

import { useQuery } from "@tanstack/react-query";
import { useProblmStore } from "@/modules/problem/stores/problem-store";
import { getAllProblem } from "../actions/problem.action";

export const useGetAllProblems = () => {
    const setProblems = useProblmStore((state) => state.setProblems);

    return useQuery({
        queryKey: ["problems"],
        queryFn: async () => {
            const res = await getAllProblem();
            if (res?.success && res.data) {
                setProblems(res.data);
            }
            return res;
        },
        staleTime: 1000 * 60 * 5,
    });
};