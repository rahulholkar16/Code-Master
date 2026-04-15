"use client";

import { useEffect, useMemo, useState } from "react";
import { Language, Problem, ExecuteResponse, ExecutionResult} from "@/types";
import { useProblmStore } from "../../stores/problem-store";
import { TestResultPanel } from "./TestResultPanel";
import { CodeEditor } from "./CodeEditor";
import { getJudge0LanguageId } from "@/lib/judge0";
import { executeCode } from "../../actions/problem.action";
import { toast } from "sonner";
import TestCases from "./TestCase";

interface ProblemWorkspaceProps {
    initialProblem: Problem;
}

export function ProblemWorkspace({ initialProblem }: ProblemWorkspaceProps) {
    const { selectedProblem, setSelectedProblem, getProblemById, addProblem } =
        useProblmStore();

    const [results, setResults] = useState<ExecutionResult[]>([]);
    const [testResult, setTestResult] = useState<"pass" | "fail" | null>(null);

    useEffect(() => {
        const existingProblem = getProblemById(initialProblem.id);

        if (!existingProblem) addProblem(initialProblem);
        setSelectedProblem(initialProblem);

        return () => setSelectedProblem(null);
    }, [initialProblem]);

    const problem = selectedProblem ?? initialProblem;

    const availableLanguages = useMemo(
        () => problem.snippets?.map((s) => s.language as Language) ?? [],
        [problem.snippets],
    );

    const [selectedLanguage, setSelectedLanguage] = useState<Language>(
        () => (problem.snippets?.[0]?.language as Language) ?? "Javascript",
    );

    const snippetCode = useMemo(
        () =>
            problem.snippets?.find((s) => s.language === selectedLanguage)
                ?.code ?? "",
        [problem.snippets, selectedLanguage],
    );

    const [editorCode, setEditorCode] = useState(snippetCode);

    useEffect(() => {
        setEditorCode(snippetCode);
    }, [snippetCode]);

    const handleRunCode = async () => {
        try {
            const language_id = getJudge0LanguageId(selectedLanguage);

            const stdin = problem?.testCases?.map((tc) => tc.input) ?? [];
            const expected_outputs =
                problem?.testCases?.map((tc) => tc.output) ?? [];

            const res: ExecuteResponse = await executeCode(
                editorCode,
                language_id,
                stdin,
                expected_outputs,
                problem?.id,
            );

            if (!res?.success) {
                toast.error("Execution failed");
                return;
            }

            const testResults = res?.submission?.testCaseResult;

            setResults(testResults ?? []);

            const allPassed = testResults?.every((r) => r.passed);

            if (allPassed) {
                toast.success("All test cases passed 🚀");
                setTestResult("pass");
            } else {
                toast.error("Some test cases failed ❌");
                setTestResult("fail");
            }
        } catch (error) {
            console.log(error);
            toast.error("Execution failed");
        }
    };

    const handleSubmit = () => {
        setTestResult(Math.random() > 0.2 ? "pass" : "fail");
    };

    return (
        <>
            {/* Editor */}
            <div className="flex-1 m-4 rounded-lg border border-border overflow-hidden bg-background">
                <CodeEditor
                    language={selectedLanguage}
                    code={editorCode}
                    availableLanguages={availableLanguages}
                    onLanguageChange={setSelectedLanguage}
                    onCodeChange={setEditorCode}
                    onRunCode={handleRunCode}
                    onSubmit={handleSubmit}
                />
            </div>

            {/* Test Cases + Result */}
            <div className="mx-4 mb-4 space-y-4">
                <TestCases
                    problem={{ ...problem, examples: problem.examples ?? [] }}
                    results={results}
                />
                <TestResultPanel result={testResult} />
            </div>
        </>
    );
};