export interface JobItem {
    recId: number;
    jobKey: string | null;
    customSKU: string | null;
    jiQuant: number | null;
    jiItemKey: string | null;
    jiItemDesc: string | null;
    jiPitch: string | null;
    jiSpan: string | null;
    jiTcSize: string | null;
    jiBcSize: string | null;
    jiOhL: string | null;
    jiOhR: string | null;
    jiStubL: string | null;
    jiStubR: string | null;
    jiCantL: string | null;
    jiCantR: string | null;
    lumBdft: number | null;
    lumCost: number | null;
    plateCost: number | null;
    laborCost: number | null;
    bp: number | null;
    addOnDesc: string | null;
    addOnPrice: number | null;
    unitPrice: number | null;
    jiMark: string | null;
    jiTag: string | null;
    manHours: number | null;
    jiFlag: string | null;
    jiProfit: number | null;
    jiOverhead: number | null;
    miscCost: number | null;
    hardwareItems: number | null;
    beamItems: number | null;
    jiLastCost: number | null;
    sawsupport: number | null;
    sawdirect: number | null;
    tablesupport: number | null;
    tabledirect: number | null;
    totalpcs: number | null;
    jiDeposit: string | null;
    jiQuantToPrice: number | null;
    jiBatch: string | null;
    jiNumPly: number | null;
    jiTotalLinealFt: number | null;
    jiTotalPlateSqin: number | null;
    jiNumjoints: number | null;
    jiSeqnumber: number | null;
    jiAlpineJob: string | null;
    jiFamily: string | null;
    chkQuantity: string | null;
    jiStatus: string | null;
    jiMarkOrder: number | null;
    bundle: string | null;
    bundleTrussQty: string | null;
    statusId: number | null;
    oaspan: number | null;
    indexsheetorder: number | null;
    jiBmark: string | null;
    jiBmarkOrder: number | null;
    jiEmark: string | null;
    jiEmarkOrder: number | null;
    rCodes: string | null;
    oaheight: number | null;
    supplier: string | null;
   
}

export interface BatchedWorkOrder
{
    woid: string;
    jobKey: string;
    mark: string;
    activity: string;    
    designer: string;
    status: string;
    due: Date;
    start: Date;
    done: Date;
    hours: number;
    estH: number;
    schedStart: Date;
    schedStop: Date;
}

export interface JobItemBatchingOrder {
    recId: number;
    jobKey: string | null;
    jiMarkOrder: number | null;
    jiBmarkOrder: number | null;
    JiEmarkOrder: number | null;
}

export interface JobItemBatching {
    recId: number;
    jobKey: string | null;
    type: string | null;
    jiQuant: number | null;
    jiItemKey: string | null;
    jiItemDesc: string | null;
    jiPitch: string | null;
    jiSpan: string | null;
    jiTcSize: string | null;
    jiBcSize: string | null;
    jiOhL: string | null;
    jiOhR: string | null;
    jiStubL: string | null;
    jiStubR: string | null;
    jiCantL: string | null;
    jiCantR: string | null;
    lumBdft: number | null;
    lumCost: number | null;
    plateCost: number | null;
    laborCost: number | null;
    bp: number | null;
    addOnDesc: string | null;
    addOnPrice: number | null;
    unitPrice: number | null;
    jiMark: string | null;
    jiTag: string | null;
    manHours: number | null;
    jiFlag: string | null;
    jiProfit: number | null;
    jiOverhead: number | null;
    miscCost: number | null;
    hardwareItems: number | null;
    beamItems: number | null;
    jiLastCost: number | null;
    sawsupport: number | null;
    sawdirect: number | null;
    tablesupport: number | null;
    tabledirect: number | null;
    totalpcs: number | null;
    jiDeposit: string | null;
    jiQuantToPrice: number | null;
    jiBatch: string | null;
    jiNumPly: number | null;
    jiTotalLinealFt: number | null;
    jiTotalPlateSqin: number | null;
    jiNumjoints: number | null;
    jiSeqnumber: number | null;
    jiAlpineJob: string | null;
    jiFamily: string | null;
    chkQuantity: string | null;
    jiStatus: string | null;
    jiMarkOrder: number | null;
    bundle: string | null;
    bundleTrussQty: string | null;
    statusId: number | null;
    oaspan: number | null;
    indexsheetorder: number | null;
    jiBmark: string | null;
    jiBmarkOrder: number | null;
    jiEmark: string | null;
    jiEmarkOrder: number | null;
    rCodes: string | null;
    oaheight: number | null;
    validBackplatingDevices: string | null;
}

export interface GetJobItemsRequest {
    jobKey?: string | null;
    jiTagNotEqualToNullOrEmpty?: boolean | null;
    orderByJiBmark?: boolean | null;
    orderByJiBmarkOrder?: boolean | null;
    doNotReturnStatus404NotFoundIfNoDataFound?: boolean | null;
    [key: string]: any;
}

export interface UpdateJobItemQuantityRequest
{
    recId: number,
    jiQuant: number;
    plies: number;
}


export interface JobReference {
    rec_id?:number;
    job_key: string;
    roofRef: string;
    floorRef: string;
}