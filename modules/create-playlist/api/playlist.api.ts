import { PlaylistPayload, PlaylistResponse } from "@/types";

const parsePlaylistResponse = async (response: Response) => {
    const data = (await response.json()) as PlaylistResponse;

    if (!response.ok || !data.success) {
        throw new Error(data.message ?? "Playlist request failed");
    }

    return data;
};

export const getPlaylists = async () => {
    const response = await fetch("/api/playlist", {
        method: "GET",
        credentials: "include",
    });
    const data = await parsePlaylistResponse(response);
    return data.playlists ?? [];
};

export const createPlaylist = async (payload: PlaylistPayload) => {
    const response = await fetch("/api/playlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
    });
    return parsePlaylistResponse(response);
};

export const updatePlaylist = async (
    playlistId: string,
    payload: PlaylistPayload,
) => {
    const response = await fetch(`/api/playlist?id=${playlistId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
    });
    return parsePlaylistResponse(response);
};

export const deletePlaylist = async (playlistId: string) => {
    const response = await fetch(`/api/playlist?id=${playlistId}`, {
        method: "DELETE",
        credentials: "include",
    });
    return parsePlaylistResponse(response);
};

export const addProblemToPlaylist = async (
    playlistId: string,
    problemId: string,
) => {
    const response = await fetch("/api/playlist/add-problem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ playlistId, problemId }),
    });

    const data = await response.json();
    if (!response.ok || !data.success) {
        throw new Error(data.message ?? "Failed to add problem to playlist");
    }

    return data;
};

export const removeProblemFromPlaylist = async (
    playlistId: string,
    problemId: string,
) => {
    const response = await fetch("/api/playlist/add-problem", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ playlistId, problemId }),
    });

    const data = await response.json();
    if (!response.ok || !data.success) {
        throw new Error(data.message ?? "Failed to remove problem from playlist");
    }

    return data;
};
