import { Badge } from "@/components/ui/badge";
import { Problem } from "@/types";
import Link from "next/link";
import { getDifficultyColor } from "../constant";

interface ProblemsTableProps {
    problems: Problem[];
}

export default function ProblemsTable({ problems }: ProblemsTableProps) {

    if (problems.length === 0) {
        return (
            <div className="bg-card border border-border rounded-lg p-12 text-center">
                <p className="text-foreground/60">
                    No problems found matching your filters.
                </p>
            </div>
        );
    }

    return (
        <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-border bg-muted/50">
                            <th className="text-left p-4 font-semibold">#</th>
                            <th className="text-left p-4 font-semibold">
                                Title
                            </th>
                            <th className="text-left p-4 font-semibold">
                                Difficulty
                            </th>
                            <th className="text-left p-4 font-semibold">
                                Topics
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {problems.map((problem, index) => (
                            <tr
                                key={problem.id}
                                className="border-b border-border hover:bg-muted/30 transition-colors"
                            >
                                <td className="p-4 text-foreground/60">
                                    {index+1}
                                </td>
                                <td className="p-4">
                                    <Link
                                        href={`/problems/${problem.id}`}
                                        className="text-primary hover:text-primary/80 font-medium"
                                    >
                                        {problem.title}
                                    </Link>
                                </td>
                                {/* <td className="p-4 text-foreground/60">
                                    {problem.acceptance}%
                                </td> */}
                                <td className="p-4">
                                    <Badge
                                        className={getDifficultyColor(
                                            problem.difficulty,
                                        )}
                                    >
                                        {problem.difficulty}
                                    </Badge>
                                </td>
                                <td className="p-4">
                                    <div className="flex flex-wrap gap-2">
                                        {(problem.tags ?? []).map(
                                            (topic, index) => (
                                                <Badge
                                                    key={index}
                                                    variant="outline"
                                                    className="text-xs"
                                                >
                                                    {topic.tag.name}
                                                </Badge>
                                            ),
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};