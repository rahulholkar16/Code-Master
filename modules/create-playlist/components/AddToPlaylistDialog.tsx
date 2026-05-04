"use client";

import { useEffect, useMemo } from "react";
import { Check, Globe, Loader2, Lock, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    usePlaylists,
    useUpdateProblemPlaylists,
} from "../hooks/use-playlists";
import { usePlaylistStore } from "../stores/playlist-store";
import { AddToPlaylistDialogProps } from "@/types";

export function AddToPlaylistDialog({
    open,
    onOpenChange,
    problemId,
    problemTitle,
}: AddToPlaylistDialogProps) {
    const playlists = usePlaylistStore((state) => state.playlists);
    const selectedPlaylistIds = usePlaylistStore(
        (state) => state.selectedPlaylistIds,
    );
    const setSelectedPlaylistIds = usePlaylistStore(
        (state) => state.setSelectedPlaylistIds,
    );
    const toggleSelectedPlaylistId = usePlaylistStore(
        (state) => state.toggleSelectedPlaylistId,
    );

    const { isLoading } = usePlaylists(open);
    const updateProblemPlaylistsMutation =
        useUpdateProblemPlaylists(problemTitle);
    const isSaving = updateProblemPlaylistsMutation.isPending;

    const currentPlaylistIds = useMemo(
        () =>
            new Set(
                playlists
                    .filter((playlist) =>
                        playlist.problems?.some(
                            (item) => item.problemId === problemId,
                        ),
                    )
                    .map((playlist) => playlist.id),
            ),
        [playlists, problemId],
    );

    useEffect(() => {
        if (open) {
            setSelectedPlaylistIds(currentPlaylistIds);
        }
    }, [currentPlaylistIds, open, setSelectedPlaylistIds]);

    const handleTogglePlaylist = (playlistId: string) => {
        if (isSaving) return;

        toggleSelectedPlaylistId(playlistId);
    };

    const handleSave = async () => {
        if (isSaving) return;

        const playlistsToAdd = playlists.filter(
            (playlist) =>
                selectedPlaylistIds.has(playlist.id) &&
                !currentPlaylistIds.has(playlist.id),
        );
        const playlistsToRemove = playlists.filter(
            (playlist) =>
                !selectedPlaylistIds.has(playlist.id) &&
                currentPlaylistIds.has(playlist.id),
        );

        const result = await updateProblemPlaylistsMutation
            .mutateAsync({
                problemId,
                playlistsToAdd: playlistsToAdd.map((playlist) => playlist.id),
                playlistsToRemove: playlistsToRemove.map(
                    (playlist) => playlist.id,
                ),
            })
            .catch(() => null);

        if (!result) return;

        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add to Playlist</DialogTitle>
                    <DialogDescription>
                        Save &quot;{problemTitle}&quot; to your playlists.
                    </DialogDescription>
                </DialogHeader>

                <div className="py-2">
                    {isLoading ? (
                        <div className="flex items-center justify-center py-16">
                            <Loader2 className="size-8 animate-spin text-primary" />
                        </div>
                    ) : playlists.length > 0 ? (
                        <ScrollArea className="h-[300px] pr-4">
                            <div className="space-y-2">
                                {playlists.map((playlist) => {
                                    const isSelected = selectedPlaylistIds.has(
                                        playlist.id,
                                    );

                                    return (
                                        <button
                                            key={playlist.id}
                                            type="button"
                                            className="flex w-full cursor-pointer items-start gap-3 rounded-lg border p-3 text-left transition-colors hover:bg-accent"
                                            onClick={() =>
                                                handleTogglePlaylist(
                                                    playlist.id,
                                                )
                                            }
                                            disabled={isSaving}
                                        >
                                            <Checkbox
                                                checked={isSelected}
                                                className="mt-1"
                                                disabled={isSaving}
                                                onClick={(event) =>
                                                    event.preventDefault()
                                                }
                                            />
                                            <span className="min-w-0 flex-1 space-y-1">
                                                <span className="flex items-center gap-2">
                                                    {playlist.isPublic ? (
                                                        <Globe className="size-3 text-green-500" />
                                                    ) : (
                                                        <Lock className="size-3 text-yellow-500" />
                                                    )}
                                                    <span className="truncate font-medium leading-none">
                                                        {playlist.name}
                                                    </span>
                                                    {isSelected && (
                                                        <Check className="ml-auto size-4 text-green-500" />
                                                    )}
                                                </span>
                                                <span className="block text-sm text-muted-foreground">
                                                    {playlist.problems
                                                        ?.length ?? 0}{" "}
                                                    problems
                                                </span>
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </ScrollArea>
                    ) : (
                        <div className="text-center py-8">
                            <p className="mb-4 text-muted-foreground">
                                You do not have any playlists yet.
                            </p>
                            <Button
                                variant="outline"
                                className="gap-2"
                                onClick={() => onOpenChange(false)}
                            >
                                <Plus className="size-4" />
                                Create Your First Playlist
                            </Button>
                        </div>
                    )}
                </div>

                {playlists.length > 0 && !isLoading && (
                    <div className="flex justify-end gap-2">
                        <Button
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            disabled={isSaving}
                        >
                            Cancel
                        </Button>
                        <Button onClick={handleSave} disabled={isSaving}>
                            {isSaving && (
                                <Loader2 className="mr-2 size-4 animate-spin" />
                            )}
                            Save Changes
                        </Button>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
