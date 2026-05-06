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
import { CreateEditPlaylistDialogProps } from "@/types";

export function CreateEditPlaylistDialog({
    open,
    onOpenChange,
    onSave,
    playlist,
}: CreateEditPlaylistDialogProps) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [isPublic, setIsPublic] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (playlist) {
            setName(playlist.name);
            setDescription(playlist.description ?? "");
            setIsPublic(playlist.isPublic);
            return;
        }

        setName("");
        setDescription("");
        setIsPublic(true);
    }, [playlist, open]);

    const handleSave = async () => {
        if (!name.trim() || isSaving) return;

        try {
            setIsSaving(true);
            await onSave({
                name: name.trim(),
                description: description.trim(),
                isPublic,
            });

            if (!playlist) {
                setName("");
                setDescription("");
                setIsPublic(true);
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

                    <div className="flex items-center justify-between py-2">
                        <div className="space-y-0.5">
                            <Label htmlFor="playlist-public">
                                Public Playlist
                            </Label>
                            <p className="text-sm text-muted-foreground">
                                Allow others to view and use this playlist
                            </p>
                        </div>
                        <button
                            id="playlist-public"
                            type="button"
                            role="switch"
                            aria-checked={isPublic}
                            disabled={isSaving}
                            onClick={() => setIsPublic((current) => !current)}
                            className="relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full bg-muted transition-colors outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 aria-checked:bg-primary"
                        >
                            <span className="sr-only">Public playlist</span>
                            <span
                                className={`size-4 rounded-full bg-background shadow transition-transform ${
                                    isPublic
                                        ? "translate-x-4"
                                        : "translate-x-0.5"
                                }`}
                            />
                        </button>
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
