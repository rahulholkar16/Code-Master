"use client";

import { useState } from "react";
import { ListPlus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AddToPlaylistDialog } from "@/modules/create-playlist/components/AddToPlaylistDialog";
import { ProblemHeaderProps } from "@/types";

export function ProblemHeader({ problem }: ProblemHeaderProps) {
    const [isPlaylistDialogOpen, setIsPlaylistDialogOpen] = useState(false);

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case "EASY":
                return "bg-green-500/10 text-green-500 border-green-500/20";
            case "MEDIUM":
                return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
            case "HARD":
                return "bg-red-500/10 text-red-500 border-red-500/20";
            default:
                return "";
        }
    };

    return (
        <div className="mb-6 border-b border-border pb-6">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <h1 className="min-w-0 text-2xl font-bold">
                    {problem.title}
                </h1>
                <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 sm:shrink-0"
                    onClick={() => setIsPlaylistDialogOpen(true)}
                >
                    <ListPlus className="size-4" />
                    Save to Playlist
                </Button>
            </div>

            <div className="mb-4 flex flex-wrap items-center gap-3">
                <Badge className={getDifficultyColor(problem.difficulty)}>
                    {problem.difficulty}
                </Badge>

                {(problem.tags ?? []).map((tagItem) => (
                    <Badge
                        key={tagItem.tag.id}
                        variant="outline"
                        className="text-xs"
                    >
                        {tagItem.tag.name}
                    </Badge>
                ))}
            </div>

            <AddToPlaylistDialog
                open={isPlaylistDialogOpen}
                onOpenChange={setIsPlaylistDialogOpen}
                problemId={problem.id}
                problemTitle={problem.title}
            />
        </div>
    );
};
