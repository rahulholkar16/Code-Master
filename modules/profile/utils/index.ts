interface Submission {
    id: string;
    userId: string;
    problemId: string;
    sourceCode: string;
    language: string;
    stdin: string;
    stdout: string | null;
    stderr: string | null;
    compileOutput: string | null;
    status: string;
    memory: string | null;
    time: string | null;
    createdAt: string;
    updatedAt: string;
}

interface SolvedProblem {
    id: string;
    userId: string;
    problemId: string;
    createdAt: string;
}

export function calculateUserStats(submissions: Submission[], solvedProblems: SolvedProblem[]) {
    const totalSubmissions = submissions.length;
    const acceptedSubmissions = submissions.filter(s => s.status === 'Accepted').length;
    const acceptanceRate = totalSubmissions > 0 ? ((acceptedSubmissions / totalSubmissions) * 100).toFixed(1) : '0.0';

    return {
        totalSolved: solvedProblems.length,
        totalSubmissions,
        acceptedSubmissions,
        acceptanceRate: parseFloat(acceptanceRate),
    };
}

export function calculateStreak(submissions: Submission[]) {
    if (submissions.length === 0) return { currentStreak: 0, maxStreak: 0 };

    // Group submissions by date
    const submissionsByDate = new Map<string, number>();
    submissions.forEach(sub => {
        const date = new Date(sub.createdAt).toISOString().split('T')[0];
        submissionsByDate.set(date, (submissionsByDate.get(date) || 0) + 1);
    });

    const sortedDates = Array.from(submissionsByDate.keys()).sort();

    // Calculate current streak
    let currentStreak = 0;
    const today = new Date().toISOString().split('T')[0];
    const currentDate = new Date(today);

    for (let i = 0; i < 365; i++) {
        const dateString = currentDate.toISOString().split('T')[0];
        if (submissionsByDate.has(dateString)) {
            currentStreak++;
            currentDate.setDate(currentDate.getDate() - 1);
        } else {
            break;
        }
    }

    // Calculate max streak
    let maxStreak = 0;
    let tempStreak = 0;
    let prevDate: Date | null = null;

    sortedDates.forEach(dateStr => {
        const date = new Date(dateStr);
        if (prevDate) {
            const daysDiff = Math.floor((date.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24));
            if (daysDiff === 1) {
                tempStreak++;
            } else {
                maxStreak = Math.max(maxStreak, tempStreak);
                tempStreak = 1;
            }
        } else {
            tempStreak = 1;
        }
        prevDate = date;
    });
    maxStreak = Math.max(maxStreak, tempStreak);

    return { currentStreak, maxStreak };
}

export function generateCalendarData(submissions: Submission[]) {
    const submissionsByDate = new Map<string, Submission[]>();

    submissions.forEach(sub => {
        const date = new Date(sub.createdAt).toISOString().split('T')[0];
        if (!submissionsByDate.has(date)) {
            submissionsByDate.set(date, []);
        }
        submissionsByDate.get(date)!.push(sub);
    });

    const calendarData: { date: string; count: number; problems: string[] }[] = [];
    const today = new Date();

    for (let i = 365; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateString = date.toISOString().split('T')[0];

        const daySubs = submissionsByDate.get(dateString) || [];
        const uniqueProblems = Array.from(new Set(daySubs.map(s => s.problemId)));

        calendarData.push({
            date: dateString,
            count: daySubs.length,
            problems: uniqueProblems,
        });
    }

    return calendarData;
}

export function getRecentActivity(submissions: Submission[], limit = 10) {
    return submissions
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, limit);
}

export function getLanguageStats(submissions: Submission[]) {
    const languageCount = new Map<string, number>();

    submissions.forEach(sub => {
        languageCount.set(sub.language, (languageCount.get(sub.language) || 0) + 1);
    });

    return Array.from(languageCount.entries())
        .map(([language, count]) => ({ language, count }))
        .sort((a, b) => b.count - a.count);
};