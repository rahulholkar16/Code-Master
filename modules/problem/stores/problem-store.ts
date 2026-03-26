import { ProblmStore } from "@/types";
import { create } from "zustand";

export const useProblmStore = create<ProblmStore>((set) => ({
    problems: null,
    setProblems: (problems) => set({ problems }),
    setProblem: (problem) => {
        set((state) => ({
            problems: [...(state.problems ?? []), problem]
        }))
    }
}));