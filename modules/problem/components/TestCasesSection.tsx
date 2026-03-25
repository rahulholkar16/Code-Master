import { TestCasesSectionProps } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Trash2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export function TestCasesSection({
    testCases,
    onAddTestCase,
    onRemoveTestCase,
    onUpdateTestCase,
}: TestCasesSectionProps) {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>Test Cases</CardTitle>
                        <CardDescription>
                            Add test cases to validate solutions
                        </CardDescription>
                    </div>
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={onAddTestCase}
                    >
                        <PlusCircle className="w-4 h-4 mr-2" />
                        Add Test Case
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                {testCases.map((testCase, index) => (
                    <div
                        key={testCase.id}
                        className="p-4 border border-border rounded-lg space-y-3"
                    >
                        <div className="flex items-center justify-between">
                            <h4 className="font-semibold">
                                Test Case {index + 1}
                            </h4>
                            {testCases.length > 1 && (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                        onRemoveTestCase(testCase.id)
                                    }
                                >
                                    <Trash2 className="w-4 h-4 text-destructive" />
                                </Button>
                            )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="space-y-2">
                                <Label>Input *</Label>
                                <Textarea
                                    placeholder="Enter input..."
                                    value={testCase.input}
                                    onChange={(e) =>
                                        onUpdateTestCase(
                                            testCase.id,
                                            "input",
                                            e.target.value,
                                        )
                                    }
                                    rows={3}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Expected Output *</Label>
                                <Textarea
                                    placeholder="Enter expected output..."
                                    value={testCase.output}
                                    onChange={(e) =>
                                        onUpdateTestCase(
                                            testCase.id,
                                            "output",
                                            e.target.value,
                                        )
                                    }
                                    rows={3}
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Explanation (Optional)</Label>
                            <Textarea
                                placeholder="Explain this test case..."
                                value={testCase.explanation}
                                onChange={(e) =>
                                    onUpdateTestCase(
                                        testCase.id,
                                        "explanation",
                                        e.target.value,
                                    )
                                }
                                rows={2}
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    id={`visibility-${testCase.id}`}
                                    checked={!testCase.isHidden}
                                    onCheckedChange={(checked) =>
                                        onUpdateTestCase(
                                            testCase.id,
                                            "isHidden",
                                            !checked,
                                        )
                                    }
                                />
                                <label
                                    htmlFor={`visibility-${testCase.id}`}
                                    className="text-sm font-medium flex items-center gap-2 cursor-pointer"
                                >
                                    {testCase.isHidden ? (
                                        <>
                                            <EyeOff className="w-4 h-4 text-muted-foreground" />
                                            <span className="text-muted-foreground">
                                                Hidden (runs on Submit only)
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            <Eye className="w-4 h-4 text-green-500" />
                                            <span className="text-foreground">
                                                Visible (runs on Run & Submit)
                                            </span>
                                        </>
                                    )}
                                </label>
                            </div>
                            <p className="text-xs text-muted-foreground ml-6">
                                {testCase.isHidden
                                    ? "This test case will only run when user clicks Submit button"
                                    : "This test case will run when user clicks Run or Submit button"}
                            </p>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
