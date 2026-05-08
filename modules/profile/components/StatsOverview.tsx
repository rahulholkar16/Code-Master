import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Calendar, Flame, TrendingUp, Trophy } from "lucide-react";

import { UserStats } from "../data/userStats";

interface StatsOverviewProps {
  stats: UserStats;
}

export function StatsOverview({ stats }: StatsOverviewProps) {
  const easyPercentage = (stats.easySolved / stats.easyQuestions) * 100;
  const mediumPercentage = (stats.mediumSolved / stats.mediumQuestions) * 100;
  const hardPercentage = (stats.hardSolved / stats.hardQuestions) * 100;
  const overallPercentage = (stats.totalSolved / stats.totalQuestions) * 100;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Problems Solved"
          value={stats.totalSolved}
          detail={`of ${stats.totalQuestions} total`}
          icon={<Trophy className="h-10 w-10 text-yellow-500" />}
        />
        <StatCard
          label="Acceptance Rate"
          value={`${stats.acceptanceRate}%`}
          detail="across all submissions"
          icon={<TrendingUp className="h-10 w-10 text-green-500" />}
        />
        <StatCard
          label="Current Streak"
          value={stats.streak}
          detail={`Max: ${stats.maxStreak} days`}
          icon={<Flame className="h-10 w-10 text-orange-500" />}
        />
        <StatCard
          label="Active Days"
          value={stats.activeDays}
          detail="in the last year"
          icon={<Calendar className="h-10 w-10 text-blue-500" />}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Problems Solved by Difficulty</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <DifficultyProgress
            label="Easy"
            solved={stats.easySolved}
            total={stats.easyQuestions}
            percentage={easyPercentage}
            barClassName="bg-green-500"
            trackClassName="bg-green-500/20"
          />
          <DifficultyProgress
            label="Medium"
            solved={stats.mediumSolved}
            total={stats.mediumQuestions}
            percentage={mediumPercentage}
            barClassName="bg-yellow-500"
            trackClassName="bg-yellow-500/20"
          />
          <DifficultyProgress
            label="Hard"
            solved={stats.hardSolved}
            total={stats.hardQuestions}
            percentage={hardPercentage}
            barClassName="bg-red-500"
            trackClassName="bg-red-500/20"
          />

          <div className="flex items-center justify-between border-t pt-4">
            <span className="font-semibold">Overall Progress</span>
            <span className="text-lg font-bold">{overallPercentage.toFixed(1)}%</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({
  label,
  value,
  detail,
  icon,
}: {
  label: string;
  value: string | number;
  detail: string;
  icon: React.ReactNode;
}) {
  return (
    <Card>
      <CardContent className="pt-2">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-foreground/60">{label}</p>
            <p className="text-3xl font-bold">{value}</p>
            <p className="mt-1 text-xs text-foreground/40">{detail}</p>
          </div>
          {icon}
        </div>
      </CardContent>
    </Card>
  );
}

function DifficultyProgress({
  label,
  solved,
  total,
  percentage,
  barClassName,
  trackClassName,
}: {
  label: string;
  solved: number;
  total: number;
  percentage: number;
  barClassName: string;
  trackClassName: string;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">{label}</span>
        <span className="text-foreground/60">
          {solved} / {total}
        </span>
      </div>
      <Progress value={percentage} className={trackClassName}>
        <div className={`h-full rounded-full ${barClassName}`} style={{ width: `${percentage}%` }} />
      </Progress>
    </div>
  );
}
