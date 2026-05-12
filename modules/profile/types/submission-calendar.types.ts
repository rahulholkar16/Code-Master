export interface DailySubmission {
  date: string;
  count: number;
  problems: string[];
}

export interface SubmissionCalendarProps {
  submissions: DailySubmission[];
}
