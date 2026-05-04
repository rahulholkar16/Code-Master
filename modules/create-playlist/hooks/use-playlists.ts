"use client";

import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
    addProblemToPlaylist,
    createPlaylist,
    deletePlaylist,
    getPlaylists,
    removeProblemFromPlaylist,
    updatePlaylist,
} from "../api/playlist.api";
import { PlaylistPayload } from "@/types";
import { usePlaylistStore } from "../stores/playlist-store";

export const playlistQueryKey = ["playlists"] as const;

export const usePlaylists = (enabled = true) => {
    const setPlaylists = usePlaylistStore((state) => state.setPlaylists);

    const query = useQuery({
        queryKey: playlistQueryKey,
        queryFn: getPlaylists,
        enabled,
        staleTime: 1000 * 60,
    });

    useEffect(() => {
        if (query.data) {
            setPlaylists(query.data);
        }
    }, [query.data, setPlaylists]);

    return query;
};

export const useCreatePlaylist = () => {
    const queryClient = useQueryClient();
    const closeDialog = usePlaylistStore((state) => state.closeDialog);

    return useMutation({
        mutationFn: (playlistData: PlaylistPayload) =>
            createPlaylist(playlistData),
        onSuccess: async () => {
            toast.success("Playlist created successfully.");
            closeDialog();
            await queryClient.invalidateQueries({ queryKey: playlistQueryKey });
        },
        onError: () => {
            toast.error("Failed to create playlist. Please try again.");
        },
    });
};

export const useUpdatePlaylist = () => {
    const queryClient = useQueryClient();
    const closeDialog = usePlaylistStore((state) => state.closeDialog);

    return useMutation({
        mutationFn: ({
            playlistId,
            playlistData,
        }: {
            playlistId: string;
            playlistData: PlaylistPayload;
        }) => updatePlaylist(playlistId, playlistData),
        onSuccess: async () => {
            toast.success("Playlist updated successfully.");
            closeDialog();
            await queryClient.invalidateQueries({ queryKey: playlistQueryKey });
        },
        onError: () => {
            toast.error("Failed to update playlist. Please try again.");
        },
    });
};

export const useDeletePlaylist = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deletePlaylist,
        onSuccess: async () => {
            toast.success("Playlist deleted successfully.");
            await queryClient.invalidateQueries({ queryKey: playlistQueryKey });
        },
        onError: () => {
            toast.error("Failed to delete playlist. Please try again.");
        },
    });
};

export const useUpdateProblemPlaylists = (problemTitle: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            problemId,
            playlistsToAdd,
            playlistsToRemove,
        }: {
            problemId: string;
            playlistsToAdd: string[];
            playlistsToRemove: string[];
        }) =>
            Promise.all([
                ...playlistsToAdd.map((playlistId) =>
                    addProblemToPlaylist(playlistId, problemId),
                ),
                ...playlistsToRemove.map((playlistId) =>
                    removeProblemFromPlaylist(playlistId, problemId),
                ),
            ]),
        onSuccess: async () => {
            toast.success(`Updated playlists for "${problemTitle}".`);
            await queryClient.invalidateQueries({ queryKey: playlistQueryKey });
        },
        onError: () => {
            toast.error("Failed to update playlists. Please try again.");
        },
    });
};
