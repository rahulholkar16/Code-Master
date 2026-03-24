import { SUBMISSION } from '@/types';
import axios from 'axios';
import { base64 } from 'better-auth';

export function getJudge0LanguageId(language: string): number {
    const languageMap: Record<string, number> = {
        "PYTHON": 71,
        "JAVASCRIPT": 63,
        "JAVA": 62,
        "CPP": 54,
        "GO": 60
    };

    return languageMap[language.toUpperCase()];
};

export async function submitBatch(submission: Array<SUBMISSION>) {
    const { data } = await axios.post(
        `${process.env.JUDGE0_API}/submissions/batch?base64_encoded=false`,
        {
            submissions: submission,
        }
    );
    console.log("data");
    return data;
}

export async function pollBatchResults(tokens: Array<string>) {
    while (true) {
        const { data } = await axios.get(`${process.env.JUDGE0_API}/submissions/batch`, {
            params: {
                tokens: tokens.join(","),
                base64_encoded: false,
            }
        });

        console.log(data);

        const results = data.submissions;
        if (results.length === tokens.length) return results;
        const isAllDone = results.every((r) => r.status.id !== 1 && r.status.id !== 2);
        if (isAllDone) return results;
        await sleep(1000);
    }
};

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));