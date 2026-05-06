"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useProblmStore } from "../stores/problem-store";
import { getAllProblem } from "../actions/problem.action";
import { Problem } from "@/types";

export const useGetAllProblems = () => {
    const addProblem = useProblmStore((state) => state.addProblem);

    const query = useQuery({
        queryKey: ["problems"],
        queryFn: getAllProblem,
        staleTime: 1000 * 60 * 5,
    });

    useEffect(() => {
        if (query.data?.success && query.data.data) {
            query.data.data.forEach((problem: Problem) => addProblem(problem));
        }
    }, [query.data, addProblem]);

    return query;
};