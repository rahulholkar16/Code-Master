import { create } from "zustand";
import { Playlist } from "../types/playlist";

type PlaylistStore = {
    playlists: Playlist[];
    isCreateDialogOpen: boolean;
    editingPlaylist: Playlist | null;
    selectedPlaylistIds: Set<string>;
    setPlaylists: (playlists: Playlist[]) => void;
    openCreateDialog: () => void;
    closeDialog: () => void;
    setEditingPlaylist: (playlist: Playlist | null) => void;
    setSelectedPlaylistIds: (playlistIds: Set<string>) => void;
    toggleSelectedPlaylistId: (playlistId: string) => void;
};

export const usePlaylistStore = create<PlaylistStore>((set) => ({
    playlists: [],
    isCreateDialogOpen: false,
    editingPlaylist: null,
    selectedPlaylistIds: new Set(),

    setPlaylists: (playlists) => set({ playlists }),
    openCreateDialog: () =>
        set({ isCreateDialogOpen: true, editingPlaylist: null }),
    closeDialog: () =>
        set({
            isCreateDialogOpen: false,
            editingPlaylist: null,
            selectedPlaylistIds: new Set(),
        }),
    setEditingPlaylist: (playlist) =>
        set({ editingPlaylist: playlist, isCreateDialogOpen: false }),
    setSelectedPlaylistIds: (playlistIds) =>
        set({ selectedPlaylistIds: new Set(playlistIds) }),
    toggleSelectedPlaylistId: (playlistId) =>
        set((state) => {
            const selectedPlaylistIds = new Set(state.selectedPlaylistIds);

            if (selectedPlaylistIds.has(playlistId)) {
                selectedPlaylistIds.delete(playlistId);
            } else {
                selectedPlaylistIds.add(playlistId);
            }

            return { selectedPlaylistIds };
        }),
}));
