import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Example } from "@/types";
import { PlusCircle, Trash2 } from "lucide-react";

interface InternalExample extends Example {
    id: string;
}

interface ExamplesSectionProps {
    examples: InternalExample[];
    onAddExample: () => void;
    onRemoveExample: (id: string) => void;
    onUpdateExample: (id: string, field: keyof Example, value: string) => void;
}

export function ExamplesSection({
    examples,
    onAddExample,
    onRemoveExample,
    onUpdateExample,
}: ExamplesSectionProps) {
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
                {examples.map((example, index) => (
                    <div
                        key={example.id}
                        className="p-4 border border-border rounded-lg space-y-3"
                    >
                        <div className="flex items-center justify-between">
                            <h4 className="font-semibold">
                                Example {index + 1}
                            </h4>
                            {examples.length > 1 && (
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
                                        onUpdateExample(
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
                                        onUpdateExample(
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
                                        onUpdateExample(
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
}
