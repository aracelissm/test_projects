export interface JobStatusLog {
    recId: number;
    jobId: number;
    jobStatusCode: string;
    start: string | null;
    stop: string | null;
}
