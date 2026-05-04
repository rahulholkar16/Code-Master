"use client";

import Link from "next/link";
import {
    Calendar,
    Edit,
    ListChecks,
    Lock,
    MoreVertical,
    Trash2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PlaylistCardProps } from "@/types";

export function PlaylistCard({
    playlist,
    onEdit,
    onDelete,
}: PlaylistCardProps) {
    const problemCount = playlist.problems?.length ?? 0;
    const updatedAt = playlist.updateAt ?? playlist.createdAt;

    const formattedDate = new Date(updatedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });

    return (
        <Card className="transition-shadow hover:shadow-lg">
            <CardHeader>
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                        <div className="mb-2 flex items-center gap-2">
                            <Lock className="size-4 text-yellow-500" />
                            <CardTitle className="truncate text-xl">
                                <Link
                                    href={`/playlist/${playlist.id}`}
                                    className="hover:underline"
                                >
                                    {playlist.name}
                                </Link>
                            </CardTitle>
                        </div>
                        <CardDescription className="line-clamp-2 min-h-10">
                            {playlist.description || "No description provided"}
                        </CardDescription>
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                aria-label="Playlist actions"
                            >
                                <MoreVertical className="size-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem
                                onClick={() => onEdit(playlist)}
                            >
                                <Edit className="mr-2 size-4" />
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => onDelete(playlist.id)}
                                variant="destructive"
                            >
                                <Trash2 className="mr-2 size-4" />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>

            <CardContent>
                <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-foreground/60">
                    <ListChecks className="size-4" />
                    <span>{problemCount} problems</span>
                    <span className="text-foreground/30">.</span>
                    <Calendar className="size-4" />
                    <span>Updated {formattedDate}</span>
                </div>

                <Badge variant="secondary" className="text-xs">
                    Private
                </Badge>
            </CardContent>

            <CardFooter>
                <Link href={`/playlist/${playlist.id}`} className="w-full">
                    <Button variant="outline" className="w-full">
                        View Playlist
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
}
