"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { ExecutionResult } from "@/types";

interface Example {
    input: string;
    output: string;
    explanation?: string;
}

interface Problem {
    examples: Example[];
}

interface TestCasesProps {
    problem: Problem;
    results?: ExecutionResult[];
}

export default function TestCases({ problem, results }: TestCasesProps) {
    const [activeCase, setActiveCase] = useState(0);
    const [isExpanded, setIsExpanded] = useState(true);

    const currentResult = results?.find((r) => r.testCase === activeCase + 1);

    return (
        <div className="border border-border rounded-lg bg-background">
            {/* Header */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium hover:bg-muted/30"
            >
                <span>Testcase</span>
                {isExpanded ? (
                    <ChevronUp size={16} />
                ) : (
                    <ChevronDown size={16} />
                )}
            </button>

            {isExpanded && (
                <>
                    {/* Tabs */}
                    <div className="flex border-t bg-muted/30">
                        {problem.examples.map((_, index) => {
                            const res = results?.find(
                                (r) => r.testCase === index + 1,
                            );

                            return (
                                <button
                                    key={index}
                                    onClick={() => setActiveCase(index)}
                                    className={`px-4 py-2 text-sm relative ${
                                        activeCase === index
                                            ? "bg-background text-foreground"
                                            : "text-foreground/60 hover:bg-muted/50"
                                    }`}
                                >
                                    Case {index + 1}
                                    {/* ✅ Status dot */}
                                    {res && (
                                        <span
                                            className={`ml-2 inline-block w-2 h-2 rounded-full ${
                                                res.passed
                                                    ? "bg-green-500"
                                                    : "bg-red-500"
                                            }`}
                                        />
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Content */}
                    <div className="p-4 space-y-3 border-t">
                        {/* Input */}
                        <div>
                            <div className="text-xs mb-1">Input:</div>
                            <div className="bg-muted p-2 rounded font-mono text-sm">
                                {problem.examples[activeCase]?.input}
                            </div>
                        </div>

                        {/* Expected */}
                        <div>
                            <div className="text-xs mb-1">Expected:</div>
                            <div className="bg-muted p-2 rounded font-mono text-sm">
                                {currentResult?.expected ||
                                    problem.examples[activeCase]?.output}
                            </div>
                        </div>

                        {/* Your Output */}
                        {currentResult && (
                            <div>
                                <div className="text-xs mb-1">Your Output:</div>
                                <div className="bg-muted p-2 rounded font-mono text-sm">
                                    {currentResult.stdout || "No Output"}
                                </div>
                            </div>
                        )}

                        {/* ✅ Verdict */}
                        {currentResult && (
                            <div className="flex items-center gap-2">
                                <span
                                    className={`px-2 py-1 text-xs rounded ${
                                        currentResult.passed
                                            ? "bg-green-500/10 text-green-600"
                                            : "bg-red-500/10 text-red-600"
                                    }`}
                                >
                                    {currentResult.passed
                                        ? "Accepted"
                                        : currentResult.status || "Error"}
                                </span>

                                {currentResult.time && (
                                    <span className="text-xs text-muted-foreground">
                                        ⏱ {currentResult.time}
                                    </span>
                                )}

                                {currentResult.memory && (
                                    <span className="text-xs text-muted-foreground">
                                        🧠 {currentResult.memory}
                                    </span>
                                )}
                            </div>
                        )}

                        {/* ❌ Error Section */}
                        {currentResult?.stderr && (
                            <div>
                                <div className="text-xs text-red-500 mb-1">
                                    Runtime Error:
                                </div>
                                <div className="bg-red-500/10 p-2 rounded text-sm font-mono text-red-600">
                                    {currentResult.stderr}
                                </div>
                            </div>
                        )}

                        {currentResult?.compileOutput && (
                            <div>
                                <div className="text-xs text-red-500 mb-1">
                                    Compile Error:
                                </div>
                                <div className="bg-red-500/10 p-2 rounded text-sm font-mono text-red-600">
                                    {currentResult.compileOutput}
                                </div>
                            </div>
                        )}

                        {/* Explanation */}
                        {problem.examples[activeCase]?.explanation && (
                            <div>
                                <div className="text-xs mb-1">Explanation:</div>
                                <div className="text-sm text-foreground/80">
                                    {problem.examples[activeCase]?.explanation}
                                </div>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};