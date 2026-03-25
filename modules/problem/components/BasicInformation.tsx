import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BasicInformationProps, Difficulty } from "@/types";
import { X } from "lucide-react";


export function BasicInformation({
    title,
    difficulty,
    tags,
    tagInput,
    onTitleChange,
    onDifficultyChange,
    onTagInputChange,
    onAddTag,
    onRemoveTag,
    onTagKeyPress,
}: BasicInformationProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>
                    Enter the problem title, difficulty, and tags
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="title">Problem Title *</Label>
                    <Input
                        id="title"
                        placeholder="e.g., Two Sum"
                        value={title}
                        onChange={(e) => onTitleChange(e.target.value)}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="difficulty">Difficulty *</Label>
                    <Select
                        value={difficulty}
                        onValueChange={(value) => {
                            if (value) onDifficultyChange(value as Difficulty)
                        }}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="easy">Easy</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="hard">Hard</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="tags">Tags</Label>
                    <div className="flex gap-2">
                        <Input
                            id="tags"
                            placeholder="e.g., Array, Hash Table"
                            value={tagInput}
                            onChange={(e) => onTagInputChange(e.target.value)}
                            onKeyUp={onTagKeyPress}
                        />
                        <Button
                            type="button"
                            onClick={onAddTag}
                            variant="outline"
                        >
                            Add
                        </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {tags.map((tag, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                            >
                                <span>{tag}</span>
                                <button
                                    type="button"
                                    onClick={() => onRemoveTag(tag)}
                                    className="hover:text-destructive"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
