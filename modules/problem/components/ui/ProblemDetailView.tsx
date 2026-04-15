"use client";

import { useGetProblemById } from "../../hooks/useGetProblemById";
import { notFound } from "next/navigation";
import { useProblmStore } from "../../stores/problem-store";
import { ProblemDescription } from "../problem-details/ProblemDescription";
import { ProblemWorkspace } from "../problem-details/ProblemWorkSpace";
import { ProblemHeader } from "../problem-details/ProblemHerder";

interface ProblemDetailViewProps {
    id: string;
}

export function ProblemDetailView({ id }: ProblemDetailViewProps) {
    const { isLoading } = useGetProblemById(id);

    const problem = useProblmStore((s) => s.problems.find((p) => p.id === id));

    if (isLoading) {
        return (
            <div className="h-[calc(100vh-4rem)] flex items-center justify-center">
                <p className="text-foreground/50 text-sm">Loading...</p>
            </div>
        );
    }

    if (!problem) return notFound();

    return (
        <div className="h-[calc(100vh-4rem)] flex border-t border-border bg-muted/20">
            {/* Left Panel */}
            <div className="w-1/2 border-r border-border overflow-y-auto">
                <div className="p-6 bg-background m-4 rounded-lg border border-border">
                    <ProblemHeader problem={problem} />
                    <ProblemDescription problem={problem} />
                </div>
            </div>

            {/* Right Panel */}
            <div className="w-1/2 flex flex-col">
                <ProblemWorkspace initialProblem={problem} />
            </div>
        </div>
    );
};