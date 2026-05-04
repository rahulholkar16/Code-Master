"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Playlist, PlaylistPayload } from "../types/playlist";

interface CreateEditPlaylistDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSave: (playlist: PlaylistPayload) => Promise<void>;
    playlist?: Playlist | null;
}

export function CreateEditPlaylistDialog({
    open,
    onOpenChange,
    onSave,
    playlist,
}: CreateEditPlaylistDialogProps) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (playlist) {
            setName(playlist.name);
            setDescription(playlist.description ?? "");
            return;
        }

        setName("");
        setDescription("");
    }, [playlist, open]);

    const handleSave = async () => {
        if (!name.trim() || isSaving) return;

        try {
            setIsSaving(true);
            await onSave({
                name: name.trim(),
                description: description.trim(),
            });

            if (!playlist) {
                setName("");
                setDescription("");
            }
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>
                        {playlist ? "Edit Playlist" : "Create New Playlist"}
                    </DialogTitle>
                    <DialogDescription>
                        {playlist
                            ? "Update your playlist details."
                            : "Create a new playlist to organize problems."}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-2">
                    <div className="space-y-2">
                        <Label htmlFor="playlist-name">Playlist Name *</Label>
                        <Input
                            id="playlist-name"
                            placeholder="e.g., Array Mastery"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            disabled={isSaving}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="playlist-description">
                            Description
                        </Label>
                        <Textarea
                            id="playlist-description"
                            placeholder="Describe what this playlist is about..."
                            value={description}
                            onChange={(event) =>
                                setDescription(event.target.value)
                            }
                            rows={3}
                            disabled={isSaving}
                        />
                    </div>
                </div>

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        disabled={isSaving}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSave}
                        disabled={!name.trim() || isSaving}
                    >
                        {isSaving && (
                            <Loader2 className="mr-2 size-4 animate-spin" />
                        )}
                        {playlist ? "Save Changes" : "Create Playlist"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
