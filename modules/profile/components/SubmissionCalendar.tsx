"use client";

import { useMemo } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { DailySubmission } from "../data/userStats";

interface SubmissionCalendarProps {
  submissions: DailySubmission[];
}

export function SubmissionCalendar({ submissions }: SubmissionCalendarProps) {
  const weeks = useMemo(() => {
    const weeksArray: DailySubmission[][] = [];
    let currentWeek: DailySubmission[] = [];

    if (submissions.length === 0) return weeksArray;

    const firstDate = new Date(submissions[0].date);
    const firstDay = firstDate.getDay();

    for (let i = 0; i < firstDay; i++) {
      currentWeek.push({ date: "", count: 0, problems: [] });
    }

    submissions.forEach((submission) => {
      currentWeek.push(submission);

      if (currentWeek.length === 7) {
        weeksArray.push(currentWeek);
        currentWeek = [];
      }
    });

    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push({ date: "", count: 0, problems: [] });
      }
      weeksArray.push(currentWeek);
    }

    return weeksArray;
  }, [submissions]);

  const getColor = (count: number) => {
    if (count === 0) return "bg-muted";
    if (count === 1) return "bg-green-200 dark:bg-green-900";
    if (count === 2) return "bg-green-400 dark:bg-green-700";
    if (count <= 4) return "bg-green-500 dark:bg-green-600";
    return "bg-green-600 dark:bg-green-500";
  };

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const totalSubmissions = submissions.reduce((sum, day) => sum + day.count, 0);
  const activeDaysCount = submissions.filter((day) => day.count > 0).length;

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>Submission Calendar</CardTitle>
          <div className="text-sm text-foreground/60">
            <span className="font-medium">{totalSubmissions}</span> submissions in the last year
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="overflow-x-auto">
            <div className="inline-flex gap-1">
              <div className="flex flex-col gap-1 pr-2">
                {days.map((day, i) => (
                  <div
                    key={day}
                    className="flex h-3 items-center text-[10px] text-foreground/40"
                  >
                    {i % 2 === 1 ? day : ""}
                  </div>
                ))}
              </div>

              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-1">
                  {week.map((day, dayIndex) => (
                    <div
                      key={`${weekIndex}-${dayIndex}`}
                      className={`h-3 w-3 cursor-pointer rounded-sm transition-colors hover:ring-2 hover:ring-primary ${
                        day.date ? getColor(day.count) : "bg-transparent"
                      }`}
                      title={
                        day.date
                          ? `${day.date}: ${day.count} submission${day.count !== 1 ? "s" : ""}`
                          : ""
                      }
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs text-foreground/60">Less</span>
              <div className="flex gap-1">
                <div className="h-3 w-3 rounded-sm bg-muted" />
                <div className="h-3 w-3 rounded-sm bg-green-200 dark:bg-green-900" />
                <div className="h-3 w-3 rounded-sm bg-green-400 dark:bg-green-700" />
                <div className="h-3 w-3 rounded-sm bg-green-500 dark:bg-green-600" />
                <div className="h-3 w-3 rounded-sm bg-green-600 dark:bg-green-500" />
              </div>
              <span className="text-xs text-foreground/60">More</span>
            </div>
            <div className="text-xs text-foreground/60">
              <span className="font-medium">{activeDaysCount}</span> active days
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
