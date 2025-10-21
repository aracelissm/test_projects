export interface BatchingReport {
    name: string;
    content: string;
}

export interface PrintAllBatchesRequest {
    id: string;
    includeSummary: boolean;
    includePlateFetch: boolean;
    plateFetchByTruss: boolean;
    includeMaterial: boolean;
    printAllBatches: boolean;    
}

export interface LaserCutReportRequest {
    jobItemRecIds: number[];
    marks: string[];
}

export interface ShopDrawingReportRequest {
    jobItemRecIds: number[];
    marks: string[];
}