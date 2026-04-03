import { ProblmStore } from "@/types";
import { create } from "zustand";

export const useProblmStore = create<ProblmStore>((set, get) => ({
    problems: [],
    selectedProblem: null,

    setProblems: (problems) => set({ problems }),

    setProblem: (problem) => {
        set((state) => ({
            problems: [...(state.problems ?? []), problem],
        }));
    },

    setSelectedProblem: (problem) => set({ selectedProblem: problem }),

    getProblemById: (id) => {
        return get().problems.find((problem) => problem.id === id);
    },

    addProblem: (problem) => {
        set((state) => {
            const exists = state.problems.some((p) => p.id === problem.id);

            if (exists) {
                return {
                    problems: state.problems.map((p) =>
                        p.id === problem.id ? { ...p, ...problem } : p
                    ),
                };
            }

            return {
                problems: [...state.problems, problem],
            };
        });
    },
}));