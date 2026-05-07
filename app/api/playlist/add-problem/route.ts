import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        const dbUser = await db.user.findUnique({
            where: {
                id: session.user.id
            }
        });

        if (!dbUser) return NextResponse.json({
            success: false, message: "User not found"
        }, { status: 404 });

        const { problemId, playlistId, playListId } = await request.json();
        const normalizedPlaylistId = playlistId ?? playListId;

        if (!problemId || !normalizedPlaylistId) return NextResponse.json({
            success: false, message: "PlaylistId and ProblemId is required."
        }, { status: 400 });

        const playlist = await db.playList.findFirst({
            where: {
                id: normalizedPlaylistId,
                userId: dbUser.id,

            }
        });

        if (!playlist) return NextResponse.json({
            success: false, message: "Playlist not found"
        }, { status: 404 });

        const problemInPlayList = await db.problemsInPlayList.upsert({
            where: {
                problemId_playlistId: {
                    problemId,
                    playlistId: normalizedPlaylistId,
                },
            },
            update: {},
            create: {
                problemId,
                playlistId: normalizedPlaylistId,
            },
        });

        return NextResponse.json({
            success: true, data: problemInPlayList
        });
    } catch (error) {
        console.error("Error adding problem to playlist:", error);
        return NextResponse.json({
            success: false, error: "failed to add problem"
        }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        const dbUser = await db.user.findUnique({
            where: {
                id: session.user.id
            }
        });

        if (!dbUser) return NextResponse.json({
            success: false, message: "User not found"
        }, { status: 404 });

        const { problemId, playlistId, playListId } = await request.json();
        const normalizedPlaylistId = playlistId ?? playListId;

        if (!problemId || !normalizedPlaylistId) return NextResponse.json({
            success: false, message: "PlaylistId and ProblemId is required."
        }, { status: 400 });

        const playlist = await db.playList.findFirst({
            where: {
                id: normalizedPlaylistId,
                userId: dbUser.id,
            }
        });

        if (!playlist) return NextResponse.json({
            success: false, message: "Playlist not found"
        }, { status: 404 });

        await db.problemsInPlayList.deleteMany({
            where: {
                problemId,
                playlistId: normalizedPlaylistId,
            },
        });

        return NextResponse.json({
            success: true,
            message: "Problem removed from playlist.",
        });
    } catch (error) {
        console.error("Error removing problem from playlist:", error);
        return NextResponse.json({
            success: false, error: "failed to remove problem"
        }, { status: 500 });
    }
}
