import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { PlusCircle, Trash2 } from "lucide-react";
import { useUiProblmStore } from "../stores/problem-ui-store";
import { useEffect, useRef, useState } from "react";
import { Language, ReferenceSolution } from "@/types";
import { getPlaceholder } from "../constant";

const LANGUAGES: Language[] = ["Javascript", "Java", "Cpp", "Python"];

export function ReferenceSolutionSection() {
    const referenceSolutions = useUiProblmStore((s) => s.referenceSolutions);
    const addReferenceSolution = useUiProblmStore(
        (s) => s.addReferenceSolution,
    );
    const removeReferenceSolution = useUiProblmStore(
        (s) => s.removeReferenceSolution,
    );
    const updateReferenceSolution = useUiProblmStore(
        (s) => s.updateReferenceSolution,
    );

    const [localSolutions, setLocalSolutions] =
        useState<ReferenceSolution[]>(referenceSolutions);
    const knownIdsRef = useRef<Set<string>>(
        new Set(referenceSolutions.map((s) => s.id)),
    );

    useEffect(() => {
        setLocalSolutions((prev) => {
            const prevIds = new Set(prev.map((s) => s.id));
            const storeIds = new Set(referenceSolutions.map((s) => s.id));

            const added = referenceSolutions.filter((s) => !prevIds.has(s.id));
            const filtered = prev.filter((s) => storeIds.has(s.id));

            added.forEach((s) => knownIdsRef.current.add(s.id));

            return added.length || filtered.length !== prev.length
                ? [...filtered, ...added]
                : prev;
        });
    }, [referenceSolutions]);

    useEffect(() => {
        const timer = setTimeout(() => {
            localSolutions.forEach((local) => {
                const original = referenceSolutions.find(
                    (s) => s.id === local.id,
                );
                if (!original) return;

                (["language", "code"] as const).forEach((field) => {
                    if (original[field] !== local[field]) {
                        updateReferenceSolution(local.id, field, local[field]);
                    }
                });
            });
        }, 300);

        return () => clearTimeout(timer);
    }, [localSolutions, referenceSolutions, updateReferenceSolution]);

    const onUpdate = <K extends keyof Omit<ReferenceSolution, "id">>(
        id: string,
        field: K,
        value: ReferenceSolution[K],
    ) => {
        setLocalSolutions((prev) =>
            prev.map((s) => (s.id === id ? { ...s, [field]: value } : s)),
        );
    };

    const usedLanguages = (currentId: string) =>
        new Set(
            localSolutions
                .filter((s) => s.id !== currentId)
                .map((s) => s.language),
        );

    const allLanguagesUsed = localSolutions.length >= LANGUAGES.length;

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>Reference Solutions</CardTitle>
                        <CardDescription>
                            Add official solution for each language
                        </CardDescription>
                    </div>
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addReferenceSolution}
                        disabled={allLanguagesUsed}
                    >
                        <PlusCircle className="w-4 h-4 mr-2" />
                        Add Solution
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                {localSolutions.map((solution, index) => {
                    const taken = usedLanguages(solution.id);

                    return (
                        <div
                            key={solution.id}
                            className="p-4 border border-border rounded-lg space-y-3"
                        >
                            <div className="flex items-center justify-between">
                                <h4 className="font-semibold">
                                    Solution {index + 1}
                                </h4>
                                {localSolutions.length > 1 && (
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() =>
                                            removeReferenceSolution(solution.id)
                                        }
                                    >
                                        <Trash2 className="w-4 h-4 text-destructive" />
                                    </Button>
                                )}
                            </div>

                            {/* Language selector */}
                            <div className="space-y-2">
                                <Label>Language *</Label>
                                <Select
                                    value={solution.language}
                                    onValueChange={(val) =>
                                        onUpdate(
                                            solution.id,
                                            "language",
                                            val as Language,
                                        )
                                    }
                                >
                                    <SelectTrigger className="w-48">
                                        <SelectValue placeholder="Select language" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {LANGUAGES.map((lang) => (
                                            <SelectItem
                                                key={lang}
                                                value={lang}
                                                disabled={taken.has(lang)}
                                            >
                                                {lang}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Code editor */}
                            <div className="space-y-2">
                                <Label>Solution Code *</Label>
                                <Textarea
                                    placeholder={getPlaceholder(
                                        solution.language,
                                    )}
                                    value={solution.code}
                                    onChange={(e) =>
                                        onUpdate(
                                            solution.id,
                                            "code",
                                            e.target.value,
                                        )
                                    }
                                    rows={12}
                                    className="font-mono text-sm"
                                    required
                                />
                            </div>
                        </div>
                    );
                })}
            </CardContent>
        </Card>
    );
};