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

        const dbUser = await db.findUnique({
            where: {
                id: session.user.id
            }
        });

        if (!dbUser) return NextResponse.json({
            success: false, message: "User not found"
        }, { status: 404 });

        const { problemId, playListId } = await request.json();
        if (!problemId || !playListId) return NextResponse.json({
            success: false, message: "PlaylistId and ProblemId is required."
        }, { status: 400 });

        const playlist = await db.playlist.findFirst({
            where: {
                id: playListId,
                userId: dbUser.id,

            }
        });

        if (!playlist) return NextResponse.json({
            success: false, message: "Playlist not found"
        }, { status: 404 });

        const problemInPlayList = await db.problemInPlayList.create({
            data: {
                problemId,
                playListId
            }
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