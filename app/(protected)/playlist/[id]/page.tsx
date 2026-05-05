import { PlaylistDetailClient } from "@/modules/create-playlist/components/PlaylistDetailClient";

interface PlaylistDetailPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function PlaylistDetailPage({
    params,
}: PlaylistDetailPageProps) {
    const { id } = await params;

    return <PlaylistDetailClient id={id} />;
}
