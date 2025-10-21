import { JobMarkType } from "../enums/job-mark-type";

export interface BatchMark {
    jobKey: string;
    mark: string;
    markType: JobMarkType;
    jobItemIds: number[];
}