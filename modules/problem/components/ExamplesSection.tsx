import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Trash2 } from "lucide-react";
import { Example } from "@/types";
import { useUiProblmStore } from "../stores/problem-ui-store";

function ExamplesSection() {
    const examples = useUiProblmStore((s) => s.examples);
    const addExample = useUiProblmStore((s) => s.addExample);
    const removeExample = useUiProblmStore((s) => s.removeExample);
    const updateExample = useUiProblmStore((s) => s.updateExample);

    const [localExamples, setLocalExamples] = useState<Example[]>(examples);

    useEffect(() => {
        setLocalExamples(examples);
    }, [examples]);

    useEffect(() => {
        const timer = setTimeout(() => {
            localExamples.forEach((example) => {
                const original = examples.find((e) => e.id === example.id);

                if (!original) return;

                if (original.input !== example.input) {
                    updateExample(example.id, "input", example.input);
                }

                if (original.output !== example.output) {
                    updateExample(example.id, "output", example.output);
                }

                if (original.explanation !== example.explanation) {
                    updateExample(
                        example.id,
                        "explanation",
                        example.explanation,
                    );
                }
            });
        }, 500);

        return () => clearTimeout(timer);
    }, [localExamples, examples, updateExample]);

    const onAddExample = () => {
        addExample();
    };

    const onRemoveExample = (id: string) => {
        removeExample(id);
    };

    const onUpdateLocalExample = (
        id: string,
        field: keyof Omit<Example, "id">,
        value: string,
    ) => {
        setLocalExamples((prev) =>
            prev.map((example) =>
                example.id === id ? { ...example, [field]: value } : example,
            ),
        );
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>Examples</CardTitle>
                        <CardDescription>
                            Add examples to illustrate the problem
                        </CardDescription>
                    </div>

                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={onAddExample}
                    >
                        <PlusCircle className="w-4 h-4 mr-2" />
                        Add Example
                    </Button>
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                {localExamples.map((example, index) => (
                    <div
                        key={example.id}
                        className="p-4 border border-border rounded-lg space-y-3"
                    >
                        <div className="flex items-center justify-between">
                            <h4 className="font-semibold">
                                Example {index + 1}
                            </h4>

                            {localExamples.length > 1 && (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => onRemoveExample(example.id)}
                                >
                                    <Trash2 className="w-4 h-4 text-destructive" />
                                </Button>
                            )}
                        </div>

                        <div className="space-y-3">
                            <div className="space-y-2">
                                <Label>Input *</Label>
                                <Textarea
                                    placeholder="nums = [2,7,11,15], target = 9"
                                    value={example.input}
                                    onChange={(e) =>
                                        onUpdateLocalExample(
                                            example.id,
                                            "input",
                                            e.target.value,
                                        )
                                    }
                                    rows={2}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Output *</Label>
                                <Textarea
                                    placeholder="[0,1]"
                                    value={example.output}
                                    onChange={(e) =>
                                        onUpdateLocalExample(
                                            example.id,
                                            "output",
                                            e.target.value,
                                        )
                                    }
                                    rows={2}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Explanation</Label>
                                <Textarea
                                    placeholder="Because nums[0] + nums[1] == 9, we return [0, 1]."
                                    value={example.explanation}
                                    onChange={(e) =>
                                        onUpdateLocalExample(
                                            example.id,
                                            "explanation",
                                            e.target.value,
                                        )
                                    }
                                    rows={2}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};

export default ExamplesSection;