"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface FilterBarProps {
    onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
    searchQuery: string;
    difficulty: string[];
    topics: string[];
}

const DIFFICULTIES = ["Easy", "Medium", "Hard"];
const TOPICS = [
    "Array",
    "String",
    "Hash Table",
    "Dynamic Programming",
    "Math",
    "Sorting",
    "Greedy",
    "Depth-First Search",
    "Binary Search",
    "Tree",
    "Breadth-First Search",
    "Two Pointers",
];

export default function FilterBar({ onFilterChange }: FilterBarProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>(
        [],
    );
    const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

    const handleSearchChange = (value: string) => {
        setSearchQuery(value);
        onFilterChange({
            searchQuery: value,
            difficulty: selectedDifficulties,
            topics: selectedTopics,
        });
    };

    const toggleDifficulty = (difficulty: string) => {
        const newDifficulties = selectedDifficulties.includes(difficulty)
            ? selectedDifficulties.filter((d) => d !== difficulty)
            : [...selectedDifficulties, difficulty];

        setSelectedDifficulties(newDifficulties);
        onFilterChange({
            searchQuery,
            difficulty: newDifficulties,
            topics: selectedTopics,
        });
    };

    const toggleTopic = (topic: string) => {
        const newTopics = selectedTopics.includes(topic)
            ? selectedTopics.filter((t) => t !== topic)
            : [...selectedTopics, topic];

        setSelectedTopics(newTopics);
        onFilterChange({
            searchQuery,
            difficulty: selectedDifficulties,
            topics: newTopics,
        });
    };

    const clearAllFilters = () => {
        setSearchQuery("");
        setSelectedDifficulties([]);
        setSelectedTopics([]);
        onFilterChange({
            searchQuery: "",
            difficulty: [],
            topics: [],
        });
    };

    const hasActiveFilters =
        searchQuery ||
        selectedDifficulties.length > 0 ||
        selectedTopics.length > 0;

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case "Easy":
                return "bg-green-500/10 text-green-500 border-green-500/20 hover:bg-green-500/20";
            case "Medium":
                return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20 hover:bg-yellow-500/20";
            case "Hard":
                return "bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500/20";
            default:
                return "";
        }
    };

    return (
        <div className="bg-card border border-border rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Filters</h2>
                {hasActiveFilters && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearAllFilters}
                        className="text-foreground/60 hover:text-foreground"
                    >
                        <X className="w-4 h-4 mr-1" />
                        Clear All
                    </Button>
                )}
            </div>

            <div className="mb-6">
                <label className="text-sm font-medium mb-2 block">Search</label>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                    <Input
                        type="text"
                        placeholder="Search problems by title..."
                        value={searchQuery}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        className="pl-10"
                    />
                </div>
            </div>

            <div className="mb-6">
                <label className="text-sm font-medium mb-2 block">
                    Difficulty
                </label>
                <div className="flex flex-wrap gap-2">
                    {DIFFICULTIES.map((difficulty) => (
                        <Badge
                            key={difficulty}
                            className={`cursor-pointer transition-all ${
                                selectedDifficulties.includes(difficulty)
                                    ? getDifficultyColor(difficulty)
                                    : "bg-muted/50 text-foreground/60 border-border hover:bg-muted"
                            }`}
                            onClick={() => toggleDifficulty(difficulty)}
                        >
                            {difficulty}
                        </Badge>
                    ))}
                </div>
            </div>

            <div>
                <label className="text-sm font-medium mb-2 block">Topics</label>
                <div className="flex flex-wrap gap-2">
                    {TOPICS.map((topic) => (
                        <Badge
                            key={topic}
                            variant="outline"
                            className={`cursor-pointer transition-all ${
                                selectedTopics.includes(topic)
                                    ? "bg-primary/10 text-primary border-primary/30"
                                    : "hover:bg-muted"
                            }`}
                            onClick={() => toggleTopic(topic)}
                        >
                            {topic}
                        </Badge>
                    ))}
                </div>
            </div>
        </div>
    );
};