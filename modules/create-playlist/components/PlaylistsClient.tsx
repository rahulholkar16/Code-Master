"use client";

import { useMemo } from "react";
import { Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    useCreatePlaylist,
    useDeletePlaylist,
    usePlaylists,
    useUpdatePlaylist,
} from "../hooks/use-playlists";
import { PlaylistPayload } from "../types/playlist";
import { usePlaylistStore } from "../stores/playlist-store";
import { CreateEditPlaylistDialog } from "./CreateEditPlaylistDialog";
import { PlaylistCard } from "./PlaylistCard";

export default function PlaylistsClient() {
    const playlists = usePlaylistStore((state) => state.playlists);
    const isCreateDialogOpen = usePlaylistStore(
        (state) => state.isCreateDialogOpen,
    );
    const editingPlaylist = usePlaylistStore((state) => state.editingPlaylist);
    const openCreateDialog = usePlaylistStore(
        (state) => state.openCreateDialog,
    );
    const closeDialog = usePlaylistStore((state) => state.closeDialog);
    const setEditingPlaylist = usePlaylistStore(
        (state) => state.setEditingPlaylist,
    );

    const { isLoading } = usePlaylists();
    const createPlaylistMutation = useCreatePlaylist();
    const updatePlaylistMutation = useUpdatePlaylist();
    const deletePlaylistMutation = useDeletePlaylist();

    const totalProblemCount = useMemo(
        () =>
            playlists.reduce(
                (count, playlist) => count + (playlist.problems?.length ?? 0),
                0,
            ),
        [playlists],
    );

    const handleCreatePlaylist = async (playlistData: PlaylistPayload) => {
        await createPlaylistMutation.mutateAsync(playlistData).catch(() => {});
    };

    const handleUpdatePlaylist = async (playlistData: PlaylistPayload) => {
        if (!editingPlaylist) return;

        await updatePlaylistMutation.mutateAsync({
            playlistId: editingPlaylist.id,
            playlistData,
        }).catch(() => {});
    };

    const handleDeletePlaylist = async (playlistId: string) => {
        await deletePlaylistMutation.mutateAsync(playlistId).catch(() => {});
    };

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
                <div className="text-center">
                    <Loader2 className="mx-auto mb-4 size-8 animate-spin text-primary" />
                    <p className="text-foreground/70">Loading playlists...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="mb-4 text-4xl font-bold">
                            Playlists
                        </h1>
                        <p className="text-foreground/70">
                            Organize and track your problem-solving journey
                        </p>
                    </div>
                    <Button
                        onClick={openCreateDialog}
                        className="gap-2 sm:self-start"
                    >
                        <Plus className="size-4" />
                        Create Playlist
                    </Button>
                </div>

                <div className="mb-6 flex gap-2 border-b border-border pb-4">
                    <Button variant="default" className="gap-2">
                        My Playlists
                        <span className="text-xs opacity-70">
                            ({playlists.length})
                        </span>
                    </Button>
                    <Button variant="ghost" className="gap-2" disabled>
                        Problems Saved
                        <span className="text-xs opacity-70">
                            ({totalProblemCount})
                        </span>
                    </Button>
                </div>

                {playlists.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {playlists.map((playlist) => (
                            <PlaylistCard
                                key={playlist.id}
                                playlist={playlist}
                                onEdit={setEditingPlaylist}
                                onDelete={handleDeletePlaylist}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="py-16 text-center">
                        <p className="mb-4 text-lg text-foreground/50">
                            You have not created any playlists yet
                        </p>
                        <Button
                            onClick={openCreateDialog}
                            className="gap-2"
                        >
                            <Plus className="size-4" />
                            Create Your First Playlist
                        </Button>
                    </div>
                )}

                <CreateEditPlaylistDialog
                    open={isCreateDialogOpen || !!editingPlaylist}
                    onOpenChange={(open) => {
                        if (!open) {
                            closeDialog();
                        }
                    }}
                    onSave={
                        editingPlaylist
                            ? handleUpdatePlaylist
                            : handleCreatePlaylist
                    }
                    playlist={editingPlaylist}
                />
            </div>
        </div>
    );
}
