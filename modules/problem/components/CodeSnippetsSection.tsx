import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CodeSnippetsSectionProps } from "@/types";
import { PlusCircle, Trash2 } from "lucide-react";

export function CodeSnippetsSection({
    codeSnippets,
    languages,
    onAddCodeSnippet,
    onRemoveCodeSnippet,
    onUpdateCodeSnippet,
}: CodeSnippetsSectionProps) {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>Code Snippets</CardTitle>
                        <CardDescription>
                            Add starter code for different programming languages
                        </CardDescription>
                    </div>
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={onAddCodeSnippet}
                    >
                        <PlusCircle className="w-4 h-4 mr-2" />
                        Add Language
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                {codeSnippets.map((snippet, index) => (
                    <div
                        key={snippet.id}
                        className="p-4 border border-border rounded-lg space-y-3"
                    >
                        <div className="flex items-center justify-between">
                            <h4 className="font-semibold">
                                Code Snippet {index + 1}
                            </h4>
                            {codeSnippets.length > 1 && (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                        onRemoveCodeSnippet(snippet.id)
                                    }
                                >
                                    <Trash2 className="w-4 h-4 text-destructive" />
                                </Button>
                            )}
                        </div>
                        <div className="space-y-3">
                            <div className="space-y-2">
                                <Label>Language *</Label>
                                <Select
                                    value={snippet.language}
                                    onValueChange={(value) => {
                                        if (value) onUpdateCodeSnippet(
                                            snippet.id,
                                            "language",
                                            value,
                                        )
                                    }}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select language" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {languages.map((lang) => (
                                            <SelectItem key={lang} value={lang}>
                                                {lang.charAt(0).toUpperCase() +
                                                    lang.slice(1)}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Starter Code *</Label>
                                <Textarea
                                    placeholder="function twoSum(nums, target) {&#10;    // Write your code here&#10;}"
                                    value={snippet.code}
                                    onChange={(e) =>
                                        onUpdateCodeSnippet(
                                            snippet.id,
                                            "code",
                                            e.target.value,
                                        )
                                    }
                                    rows={6}
                                    className="font-mono text-sm"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};