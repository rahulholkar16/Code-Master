import { ProblemDetailView } from "@/modules/problem/components/ui/ProblemDetailView";
import { ProblemDetailPageProps } from "@/types";

export default async function ProblemDetailPage({
    params,
}: ProblemDetailPageProps) {
    const { id } = await params;
    return <ProblemDetailView id={id} />;
};
