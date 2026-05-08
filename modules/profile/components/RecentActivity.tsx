import Link from "next/link";
import { CheckCircle, Clock, XCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { RecentActivity as RecentActivityType } from "../data/userStats";

interface RecentActivityProps {
  activities: RecentActivityType[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Accepted":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "Wrong Answer":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "Time Limit Exceeded":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "border-green-500/20 bg-green-500/10 text-green-500";
      case "Medium":
        return "border-yellow-500/20 bg-yellow-500/10 text-yellow-500";
      case "Hard":
        return "border-red-500/20 bg-red-500/10 text-red-500";
      default:
        return "";
    }
  };

  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return "Just now";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-accent/50"
            >
              <div className="flex min-w-0 flex-1 items-center gap-4">
                <div className="shrink-0">{getStatusIcon(activity.status)}</div>

                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <Link
                      href={`/problems/${activity.problemId}`}
                      className="truncate font-medium hover:text-primary"
                    >
                      {activity.problemTitle}
                    </Link>
                    <Badge className={getDifficultyColor(activity.difficulty)}>
                      {activity.difficulty}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-foreground/60">
                    <span>{activity.language}</span>
                    {activity.status === "Accepted" && (
                      <>
                        <span>•</span>
                        <span>{activity.runtime}</span>
                        <span>•</span>
                        <span>{activity.memory}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-3">
                <Badge
                  variant={activity.status === "Accepted" ? "default" : "destructive"}
                  className="hidden sm:inline-flex"
                >
                  {activity.status}
                </Badge>
                <span className="whitespace-nowrap text-xs text-foreground/40">
                  {formatTime(activity.timestamp)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
