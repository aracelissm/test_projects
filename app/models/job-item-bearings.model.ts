import { JobItemReaction } from  './job-Item-reactions.model'

export interface JobItemBearings {
    id: number;
    jobItem_RecId: number;
    job_Key?: string;
    tag?: string;
    size?: number;
    xpt?: number;
    ypt?: number;
    ref_edge?: number;
    type?: number;
    bearing_plate_type?: number;
    bearing_plate_size?: number;
    bearing_plate_mems?: number;
    maxGravity?: number;
    maxUplift?: number;
    gravityJointID?: number;
    upliftJointID?: number;
    flippedX?: boolean;
    flippedY?: boolean;
}



export interface ReactionDataResponse {
    jobItemReaction: JobItemReaction;
    jobItemBearings: JobItemBearings[];
}

