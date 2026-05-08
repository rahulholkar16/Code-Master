import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

import { SkillStats } from "../data/userStats";

interface SkillsBreakdownProps {
  skills: SkillStats[];
}

export function SkillsBreakdown({ skills }: SkillsBreakdownProps) {
  const sortedSkills = [...skills].sort((a, b) => {
    const aPercent = (a.solved / a.total) * 100;
    const bPercent = (b.solved / b.total) * 100;
    return bPercent - aPercent;
  });

  const getProgressColor = (percentage: number) => {
    if (percentage >= 70) return "bg-green-500";
    if (percentage >= 40) return "bg-yellow-500";
    return "bg-blue-500";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Skills Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {sortedSkills.map((skill) => {
            const percentage = (skill.solved / skill.total) * 100;

            return (
              <div key={skill.category} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{skill.category}</span>
                  <span className="text-foreground/60">
                    {skill.solved} / {skill.total}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Progress value={percentage} className="h-2 flex-1 bg-muted">
                    <div
                      className={`h-full rounded-full transition-all ${getProgressColor(percentage)}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </Progress>
                  <span className="w-12 text-right text-xs text-foreground/60">
                    {percentage.toFixed(0)}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
