"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useProblmStore } from "../stores/problem-store";
import { getAllProblem } from "../actions/problem.action";

export const useGetAllProblems = () => {
    const setProblems = useProblmStore((state) => state.setProblems);

    const query = useQuery({
        queryKey: ["problems"],
        queryFn: getAllProblem,
        staleTime: 1000 * 60 * 5, // 5 min cache
    });

    useEffect(() => {
        if (query.data?.success && query.data.data) {
            setProblems(query.data.data);
        }
    }, [query.data, setProblems]);

    return query;
};