export interface BatchJobRequest {
    jobKey: string;
    jobItemIds: number[];
    marks: string[];
    jobBatchQty: number;
    batchDupJobs: string;
    batchLocation: string;
    jacksCombined: boolean;
    bladeOneFile: boolean;
    batchAll: boolean;
    batchSelected: boolean;
    cutByTruss: boolean;
    allInAls: boolean;
    newFloorRules: number;
    sqCutBevels: boolean;
    num2Sub: boolean;
    hundeggerStacking: boolean;
    als4: boolean;
}

export interface GenerateSMP2Request {
  jobKey: string;
}

export interface BatchJobRequestPanel {
  jobKey: string;
  jobItemIds: number[];
  Location: string;
  batchAll: boolean;
  batchSelected: boolean;
  stdStudsCombined: boolean;
  excludeStdStuds: boolean;
  panelPlatesCombined: number;
  similarPiecesLabels: boolean;
  excludeVtp: boolean;
}

export interface BatchClearBatchRequest{
  jobKey: string;
}

export interface BatchClearBatchByMarksRequest{
  jobKey: string;
  marks: string[];
}

export interface BatchJobResponse {
    statusId: number;
    statusMessage: string;
}

export interface GenerateSMP2FilesResponse {
  success: boolean;
}

export interface BatchSummaryResponse {
    batchSummary: BatchSummary;
    batchSummaryWorkOrders: BatchSummaryWorkOrder[];
    timeElapsedMilliseconds?: number | null;
    smp2TimeElapsedMilliseconds?: number | null;
}

export interface BatchPrintSummaryResponse {
  roofLabelCnt: number;
  floorLabelCnt: number;
  roofMarkAndCnt: BatchMarkAndCnt[];
  floorMarkAndCnt: BatchMarkAndCnt[];
}

export interface BatchMarkAndCnt
{
  mark: string;
  count: number;
}

export interface BatchSummary {
  totalTrusses: number;
  totalTrussPieces: number;
  totalPieceCuts: number;
  totalPlateFetch: number;
  totalLumberFetch: number;
}

export interface BatchSummaryWorkOrder {
  name: string;
  count: number;
}


export interface JobCopyDownRequest {
  jobKey: string;
  copyToJob: string;
  copyToPath: string;
  bCopyJob: boolean;
  bCopyItems: boolean;
  qtyX: number;
  jobItemIds: number[];
  bFullCopySourceDirectory: boolean;
  bAppend: boolean;
  bCopyAllJobItems: boolean;
  bBatchingWizard: boolean;
  dupJobs: string;
}

export interface PushJobItemsRequest extends JobCopyDownRequest {
  copyToJobs:string[]
}






export interface JobHeadBatchingOptions {
  id: number;
  jobKey: string;
  batchOptionSelectAll: boolean;
  batchOptionTotalBdFt: number;
  batchOptionsNumDups: number;
  batchOptionsDupJobs: string;
  noCutStuds: boolean;
  batchDupJobs: string;
}

export interface BatchedMarks {
  mark : string;
  bInShop: boolean;
}

export interface JobCopyDownResponse {
  jobItemCount: number;
}

export interface SendToShopRequest {
  jobKey: string;
  locationName: string;
  locationId: number;
  marks: string[];
}

export interface SendToShopResponse {
  success: boolean;
  errorMessage: string;
}


