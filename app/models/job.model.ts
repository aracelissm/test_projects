import * as internal from 'stream';
import { Null } from './general.model';
import {
    GetPreDataToCompleteWOAndOverrideJobStatusResponse,
    WorkOrder
} from './work-order.model';

export interface JobNotes {
    notes: string;
    jobKeys: string[];
    type: string;
}
export interface UpdateJobNotes {
    jobKeys: string[];
    jobDirections: string;
    JobRemarks: string;
}

export interface AddJobNotes {
    notes: string;
    jobKeys: string[];
    type: string;
}

export interface UpdateNotes {
    JobNotes: string;
    noteType?: string;
    job_Note_Date?: Date | string | number;
}
export interface UpdateNotesInEditJob {
    jobNotes: string;
    type: string;
}

export interface CreateJob {
    JOB_CUST_KEY: string;
    JOB_SMAN_KEY: string;
    PLANT_LOC: string;
    JOB_KEY: string;
    JOB_TYPE: string;
    PCS_SHOP: string;
    MOD_REQUIRED: boolean;
    PLANS_REQ: boolean;
    Pricelock: boolean;
    invoice_lock: boolean;
    DO_NOT_INV: boolean;
    PO_CHECK_PRICE: boolean;
    PO_CHECK_LOT: boolean;
    PO_REVIEWED_BY: string;
    PO_CHECK_1: boolean;
    PO_CHECK_2: boolean;
    PO_CHECK_3: boolean;
    PO_CHECK_4: boolean;
    PO_CHECKS: string;
    NewTruss: number;
    MASTER_NUMBER: string;
    JOB_REF1: string;
    JOB_REF2: string;
    JOB_REF3: string;
    LOT: string;
    BLOCK: string;
    MODEL: string;
    PARCEL: string;
    JOB_UNITSCNT: number;
    JOB_UNITS: string;
    job_bldg: string;
    OPTIONS1: string;
    OPTIONS2: string;
    OPTIONS3: string;
    JOB_STATUS: string;
    JOB_LOGIN: any;
    BUILD_DATE: any;
    DRAFT_SDATE: any;
    REQD_DATE: any;
    REQCONFDATE: any;
    CONTRACT_RECV: any;
    SCOPE_REV: any;
    LEGAL_REV: any;
    SENT_TO_CUST: any;
    PE_SDATE: any;
    JOB_SALEAGREE: any;
    JOB_PODATE: any;
    MOD_APPROVED: any;
    ELEVATION: string;
    GARAGE: string;
    JOB_PO: string;
    EXPEDITE_STATUS: string;
    JobRemarks: string;
    JobDirections: string;
    LAYOUT_APPROVED: any;
    joB_SUPER: any;
    WOEnableCheckBox: boolean;
    inV_VERIFIED: Date | null;
    ExpediteCheckBox: boolean;
    SpecialMaterial: boolean;
    dclU_NUMBER:string;
}

export interface VerifyJob {
    LOT: string;
    BLOCK: string;
    Job_bldg: string;
    PCS_SHOP: number;
    JOB_UNITS: string;
    jobid: number;
    verify: boolean;
}
export interface UpdateJob {
    REC_ID: number;
    JOB_CUST_KEY: string;
    JOB_SMAN_KEY: string;
    PLANT_LOC: string;
    JOB_KEY: string;
    JOB_TYPE: string;
    PCS_SHOP: string;
    MOD_REQUIRED: boolean;
    PLANS_REQ: boolean;
    Pricelock: boolean;
    invoice_lock: boolean;
    DO_NOT_INV: boolean;
    PO_CHECK_PRICE: boolean;
    PO_CHECK_LOT: boolean;
    PO_REVIEWED_BY: string;
    PO_CHECK_1: boolean;
    PO_CHECK_2: boolean;
    PO_CHECK_3: boolean;
    PO_CHECK_4: boolean;
    PO_CHECKS: string;
    NewTruss: number;
    MASTER_NUMBER: string;
    JOB_REF2: string;
    JOB_REF3: string;
    JOB_UNITSCNT: number;
    LOT: string;
    BLOCK: string;
    MODEL: string;
    PARCEL: string;
    JOB_UNITS?: number;
    job_bldg: string;
    OPTIONS1: string;
    OPTIONS2: string;
    OPTIONS3: string;
    JOB_STATUS: string;
    JOB_REF1: string;
    JOB_LOGIN: any;
    BUILD_DATE: any;
    DRAFT_SDATE: any;
    REQD_DATE: any;
    REQCONFDATE: any;
    PE_SDATE: any;
    JOB_SALEAGREE: any;
    JOB_PODATE: any;
    MOD_APPROVED: any;
    ELEVATION: string;
    GARAGE: string;
    JOB_PO: string;
    JobRemarks: string;
    JobDirections: string;
    LAYOUT_APPROVED: any;
    CONTRACT_RECV: any;
    SCOPE_REV: any;
    LEGAL_REV: any;
    SENT_TO_CUST: any;
    EXPEDITE_STATUS: string;
    joB_SUPER: string;
    //contracT_RECV: string;
    enG_ID: string;
    engComment: string;
    //expeditE_STATUS: string;
    DraftComment: string;
    joB_ID_LINE: string;
    //legaL_REV: string;
    plaN_RACK: string;
    planS_EDATE: string | number | Date;
    saW_EDATE: string | number | Date;
    saW_SDATE: string | number | Date;
    saW_STAT: string;
    saW_TOTAL_PROD: number | null;
    saW_YEST_PROD: number | null;
    saW_YEST_PROD_N: number | null;
    shiP_DATE: string | number | Date;
    //scopE_REV: string;
    //senT_TO_CUST: string;
    shoP_EDATE: string | number | Date;
    shoP_SDATE: string | number | Date;
    shoP_STAT: string;
    totaL_PROD: number | null;
    yesT_PROD: number | null;
    yesT_PROD_N: number | null;
    JOB_LEGAL: string;
    JOB_OWNER1: string;
    inV_VERIFIED: Date | null;
    statusChange: boolean | null;
    lat: number | null;
    long: number | null;
    shiP_DATE2: string | number | Date;
    shiP_DATE3: string | number | Date;

    jobNotes?: CreateNotesInGeneral | null;
    prod_Notes: string | null;

    dclU_NUMBER: string;
}

export interface UpdateJobEWO {
    fault: string;
    reason: string;
}

export interface UpdateJobENGINFO {
    PlanS_EDATE?: Date | null;
    LastDesigner?: string | null;
    Plans_Req?: boolean | null;
    JobDir?: string | null;
    JobSuperintendent?: string | null;
    ENG_ID?: string | null;
}

export interface UpdatePriceJob {
    REC_ID: number;
    JOB_CUST_KEY: string;
    JOB_SMAN_KEY: string;
    PLANT_LOC: string;
    JOB_KEY: string;
    JOB_TYPE: string;
    PCS_SHOP: string;
    MOD_REQUIRED: boolean;
    PLANS_REQ: boolean;
    Pricelock: boolean;
    invoice_lock: boolean;
    DO_NOT_INV: boolean;
    PO_CHECK_PRICE: boolean;
    PO_CHECK_LOT: boolean;
    PO_REVIEWED_BY: string;
    PO_CHECK_1: boolean;
    PO_CHECK_2: boolean;
    PO_CHECK_3: boolean;
    PO_CHECK_4: boolean;
    PO_CHECKS: string;
    NewTruss: number;
    MASTER_NUMBER: string;
    JOB_REF2: string;
    JOB_REF3: string;
    JOB_UNITSCNT: number;
    LOT: string;
    BLOCK: string;
    MODEL: string;
    PARCEL: string;
    JOB_UNITS?: number;
    job_bldg: string;
    OPTIONS1: string;
    OPTIONS2: string;
    OPTIONS3: string;
    JOB_STATUS: string;
    JOB_REF1: string;
    JOB_LOGIN: any;
    BUILD_DATE: any;
    DRAFT_SDATE: any;
    REQD_DATE: any;
    REQCONFDATE: any;
    PE_SDATE: any;
    JOB_SALEAGREE: any;
    JOB_PODATE: any;
    MOD_APPROVED: any;
    ELEVATION: string;
    GARAGE: string;
    JOB_PO: string;
    JobRemarks: string;
    JobDirections: string;
    LAYOUT_APPROVED: any;
    CONTRACT_RECV: any;
    SCOPE_REV: any;
    LEGAL_REV: any;
    SENT_TO_CUST: any;
    EXPEDITE_STATUS: string;
    enG_ID: string;
    engComment: string;
    expeditE_STATUS: string;
    joB_ID_LINE: string;
    plaN_RACK: string;
    joB_SUPER: string;
    planS_EDATE: string | number | Date;
    saW_EDATE: string | number | Date;
    saW_SDATE: string | number | Date;
    saW_STAT: string;
    saW_TOTAL_PROD: number | null;
    saW_YEST_PROD: number | null;
    saW_YEST_PROD_N: number | null;
    shoP_EDATE: string | number | Date;
    shoP_SDATE: string | number | Date;
    shoP_STAT: string;
    totaL_PROD: number | null;
    yesT_PROD: number | null;
    yesT_PROD_N: number | null;
}

export interface jobNotes {
    rec_Id: number;
    job_Key: string;
    job_Note_Date: Date | string | null;
    jobNotes: string;
    r_Codes: string;
    initiator: string;
    fromDate: string | number | Date;
    toDate: string | number | Date;
    noteInsertMode: string | null;
    canModify: boolean;
}
export interface NoteType {
    id: number;
    active: boolean;
    type: string;
}
export interface GetFilterMasterRequest {
    customerKey?: string | null;
}

export interface GetFilterMasterResponse {
    customerKey: string;
    joB_KEY: string;
}

export interface GetJob {
    reC_ID: number;
    joB_CUST_KEY: string;
    joB_SMAN_KEY: string;
    planT_LOC: string;
    joB_KEY: string;
    proD_NOTES: string;
    joB_TYPE: string;
    pcS_SHOP: number;
    moD_REQUIRED: boolean;
    planS_REQ: boolean;
    pricelock: boolean;
    invoice_lock: boolean;
    dO_NOT_INV: boolean;
    pO_CHECK_PRICE: boolean;
    pO_CHECK_LOT: boolean;
    pO_REVIEWED_BY: string;
    pO_CHECK_1: boolean;
    pO_CHECK_2: boolean;
    pO_CHECK_3: boolean;
    pO_CHECK_4: boolean;
    pO_CHECKS: string;
    newTruss: number;
    masteR_NUMBER: string;
    masterJobStatus: string;
    master_Job_rec_ID: number | null;
    joB_REF1: string;
    joB_REF2: string;
    joB_REF3: string;
    lot: string;
    block: string;
    model: string;
    parcel: string;
    joB_UNITS: number;
    joB_UNITSCNT: number;
    job_bldg: string;
    optionS1: string;
    optionS2: string;
    optionS3: string;
    soldPrice: number | null;
    surtaxCountyID: number | null;
    joB_STATUS: string | null;
    bidComment: string;
    joB_LOGIN: string | number | Date;
    builD_DATE: string | number | Date;
    shiP_DATE: string | number | Date;
    prinT_DATE: string | number | Date;
    drafT_SDATE: any;
    reqD_DATE: string | number | Date;
    reqconfdate: string | number | Date;
    pE_SDATE: string | number | Date;
    joB_SALEAGREE: string | number | Date;
    joB_PODATE: string | number | Date;
    moD_APPROVED: string | number | Date;
    layouT_APPROVED: string | number | Date;
    elevation: string;
    garage: string;
    jobRemarks: string;
    jobDirections: string;
    joB_PO: string;
    invoiceDate: Date | null;
    lockDate: Date | null;
    depAmount1: number | null;
    depAmount2: number | null;
    depAmount3: number | null;
    ttlPmts: number | null;
    delChrg: number | null;
    nonTaxDesc1: string | null;
    nonTaxDesc2: string | null;
    miscChg1: number | null;
    miscChg2: number | null;
    bidRoof: number | null;
    engRoof: number | null;
    soldRoof: number | null;
    bidFloor: number | null;
    engFloor: number | null;
    soldFloor: number | null;
    bidBeam: number | null;
    engBeam: number | null;
    soldBeam: number | null;
    bidHanger: number | null;
    engHanger: number | null;
    soldHanger: number | null;
    bidOpts: number | null;
    engOpts: number | null;
    soldOpts: number | null;
    bidMisc: number | null;
    engMisc: number | null;
    soldMisc: number | null;
    costInv5: string | null;
    taxRate: number | null;
    cost1: number | null;
    cost2: number | null;
    roofSqFt: number | null;
    floorSqFt: number | null;
    bidBdft: number | null;
    bidLum: number | null;
    bidPlate: number | null;
    bidLabor: number | null;
    bidFBdft: number | null;
    bidFLum: number | null;
    bidFPlate: number | null;
    bidFLabor: number | null;
    jobBdft: number | null;
    jobLum: number | null;
    jobPlate: number | null;
    jobLabor: number | null;
    jobFBdft: number | null;
    jobFLum: number | null;
    jobFPlate: number | null;
    jobFLabor: number | null;
    bidHours: number | null;
    engHours: number | null;
    bidDesigns: number | null;
    bidFDesigns: number | null;
    jobDesigns: number | null;
    jobFDesigns: number | null;
    bidTrusses: number | null;
    bidFTrusses: number | null;
    jobTrusses: number | null;
    jobFTrusses: number | null;
    plansEdate: Date | null;
    total: number | null;
    jobDir: string | null;
    contracT_RECV: string | number | Date;
    expeditE_STATUS: string;
    legaL_REV: string | number | Date;
    scopE_REV: string | number | Date;
    senT_TO_CUST: string | number | Date;
    creatE_DATE: string | number | Date;
    enG_ID: string;
    engComment: string;
    joB_ID_LINE: string;
    plaN_RACK: string;
    planS_EDATE: string | number | Date;
    saW_EDATE: string | number | Date;
    saW_SDATE: string | number | Date;
    saW_STAT: string;
    saW_TOTAL_PROD: number | null;
    saW_YEST_PROD: number | null;
    saW_YEST_PROD_N: number | null;
    shoP_EDATE: string | number | Date;
    shoP_SDATE: string | number | Date;
    shoP_STAT: string;
    totaL_PROD: number | null;
    yesT_PROD: number | null;
    yesT_PROD_N: number | null;
    joB_SUPER: any;
    draftComment: string | null;
    joB_OWNER1: any;
    joB_LEGAL: any;
    invoicE_NUM: string;
    invoicE_POST: string;
    joB_PHONE1: string;
    joB_PHONE2: string;
    joB_PHONE3: string;
    inV_VERIFIED: Date | null;
    biD_SDATE: string | Date | null;
    noteUser: string | null;
    cosT_JOBKEY: string | null;
    payments: number | null;
    lat: number | null;
    long: number | null;
    //Project Data
    projectMasterPO: string | null;
    projectActive_status: string | null;
    projectJob_appr_req: boolean;
    projectSubdivision: string | null;
    customerKey: string;
    //pcs_Saw is the same as specialMaterial
    pcs_Saw: number | null;
    isBeamOrderExist: boolean;
    master_Job_Status: string | null;
    masterJob_Rec_ID: number | null;
    shiP_DATE2: string | number | Date;
    shiP_DATE3: string | number | Date;
    specialMaterial?: boolean;
    dclU_NUMBER: string | null;
}
export interface getBidJob {
    reC_ID: number;
    joB_CUST_KEY: string;
    joB_SMAN_KEY: string;
    planT_LOC: string;
    joB_KEY: string;
    joB_TYPE: string;
    pcS_SHOP: number;
    moD_REQUIRED: boolean;
    planS_REQ: boolean;
    pricelock: boolean;
    invoice_lock: boolean;
    dO_NOT_INV: boolean;
    pO_CHECK_PRICE: boolean;
    pO_CHECK_LOT: boolean;
    pO_REVIEWED_BY: string;
    pO_CHECK_1: boolean;
    pO_CHECK_2: boolean;
    pO_CHECK_3: boolean;
    pO_CHECK_4: boolean;
    pO_CHECKS: string;
    newTruss: number;
    masteR_NUMBER: string;
    joB_REF1: string;
    joB_REF2: string;
    joB_REF3: string;
    lot: string;
    block: string;
    model: string;
    parcel: string;
    joB_UNITS: number;
    joB_UNITSCNT: number;
    job_bldg: string;
    optionS1: string;
    optionS2: string;
    optionS3: string;
    soldPrice: number | null;
    surtaxCountyID: number | null;
    joB_STATUS: string;
    bidComment: string;
    joB_LOGIN: string | number | Date;
    builD_DATE: string | number | Date;
    shiP_DATE: string | number | Date;
    drafT_SDATE: any;
    reqD_DATE: string | number | Date;
    reqconfdate: string | number | Date;
    pE_SDATE: string | number | Date;
    joB_SALEAGREE: string | number | Date;
    joB_PODATE: string | number | Date;
    moD_APPROVED: string | number | Date;
    layouT_APPROVED: string | number | Date;
    elevation: string;
    garage: string;
    jobRemarks: string;
    jobDirections: string;
    joB_PO: string;
    invoiceDate: Date | null;
    lockDate: Date | null;
    depAmount1: number | null;
    depAmount2: number | null;
    depAmount3: number | null;
    ttlPmts: number | null;
    delChrg: number | null;
    nonTaxDesc1: string | null;
    nonTaxDesc2: string | null;
    miscChg1: number | null;
    miscChg2: number | null;
    bidRoof: number | null;
    engRoof: number | null;
    soldRoof: number | null;
    bidFloor: number | null;
    engFloor: number | null;
    soldFloor: number | null;
    bidBeam: number | null;
    engBeam: number | null;
    soldBeam: number | null;
    bidHanger: number | null;
    engHanger: number | null;
    soldHanger: number | null;
    bidOpts: number | null;
    engOpts: number | null;
    soldOpts: number | null;
    bidMisc: number | null;
    engMisc: number | null;
    soldMisc: number | null;
    costInv5: string | null;
    taxRate: number | null;
    cost1: number | null;
    cost2: number | null;
    roofSqFt: number | null;
    floorSqFt: number | null;
    bidBdft: number | null;
    bidLum: number | null;
    bidPlate: number | null;
    bidLabor: number | null;
    bidFBdft: number | null;
    bidFLum: number | null;
    bidFPlate: number | null;
    bidFLabor: number | null;
    jobBdft: number | null;
    jobLum: number | null;
    jobPlate: number | null;
    jobLabor: number | null;
    jobFBdft: number | null;
    jobFLum: number | null;
    jobFPlate: number | null;
    jobFLabor: number | null;
    bidHours: number | null;
    engHours: number | null;
    bidDesigns: number | null;
    bidFDesigns: number | null;
    jobDesigns: number | null;
    jobFDesigns: number | null;
    bidTrusses: number | null;
    bidFTrusses: number | null;
    jobTrusses: number | null;
    jobFTrusses: number | null;
    plansEdate: Date | null;
    total: number | null;
    jobDir: string | null;
    contracT_RECV: string | number | Date;
    expeditE_STATUS: string;
    legaL_REV: string | number | Date;
    scopE_REV: string | number | Date;
    senT_TO_CUST: string | number | Date;
    enG_ID: string;
    engComment: string;
    jobLoginDate: string;
    joB_ID_LINE: string;
    plaN_RACK: string;
    planS_EDATE: string | number | Date;
    saW_EDATE?: string | number | Date;
    saW_SDATE?: string | number | Date;
    saW_STAT?: string;
    saW_TOTAL_PROD?: number | null;
    saW_YEST_PROD?: number | null;
    saW_YEST_PROD_N?: number | null;

    shoP_EDATE: string | number | Date;
    shoP_SDATE: string | number | Date;
    shoP_STAT: string;
    totaL_PROD: number | null;
    yesT_PROD: number | null;
    yesT_PROD_N: number | null;
    joB_DIR: string;

    //Project Data
    projectMasterPO: string | null;
    projectActive_status: string | null;
    projectJob_appr_req: boolean;
    projectSubdivision: string | null;
    dclU_NUMBER:string | null;
}

export interface GetBidNumberRequest {
    searchterm?: string | null;
    limit?: number | null;
}

export interface GetBidNumberResponse {
    joB_KEY: string;
}

export interface GetJobStatusRequest {
    searchterm?: string | null;
    limit?: number | null;
}

export interface MasterJobNumber {
    reC_ID?: number;
    joB_KEY?: string;
    subdivision: string;
    cusT_NAME?: string;
    masteR_NUMBER: string;
    joB_TYPE?: string;
    joB_STATUS: string;
    garage?: string;
    optionS1?: string;
    optionS2: string;
    optionS3?: string;
    joB_REF1?: string;
    dclU_NUMBER?: string;
}

// export interface GetJobStatusResponse {
//     recId: number;
//     jobId: number;
//     jobStatusCode: string;
//     start: Date | null;
//     stop: Date | null;
// }
export interface GetJobStatusResponse {
    id: number;
    code: string;
    description: string | null;
    createdByUserId: number | null;
    createdAt: Date | null;
    updatedByUserId: number | null;
    updatedAt: Date | null;
    isDeleted: boolean;
    deletedByUserId: number | null;
    deletedAt: Date | null;
    title: string | null;
}
export interface GetMasterRequest {
    searchterm?: string | null;
    customerKey?: string | null;
    joB_KEY?: string | null;
    limit?: number | null;
}
export interface CustomerPO {
    joB_PO: string;
    id: number;
}

export interface Payment {
    Job_Key: string;
    CheckNum: string;
    PaidBy: string;
    Payment: number;
    Comments: string;
    Paydate: Date;
    Completed: boolean;
    Invoice_num: number;
    Job_PO: string;
    Posted: boolean;
    totalpmt: number;
    deptamount: number;
}

export interface Fault {
    fault: string;
    id: number;
}

export interface ExpediteJob {
    expeditestatus: string;
    id: number;
}
export interface NoteType {
    type: string;
    id: number;
    selectedNoteType: SelectedNoteType;
}
export interface SelectedNoteType {
    type: string;
    id: number;
}

export interface GetJobsSummaryRequest {
    jobKey?: string | null;
    projectId?: number | null;
    jobStatus?: string | null;
    jobPo?: string | null;
    shipDate?: Date | string | null;
    returnNullWithStatus200OKIfNoDataFound?: boolean | null;
    jobKeyIgnore?: string | null;
}

export interface GetJobsSummaryResponse {
    roof: number;
    floor: number;
    beam: number;
    hanger: number;
    misc: number;
    opts: number;
}

export interface UpdateJobSoldPriceRequest {
    reC_ID: number;
    soldPrice: number | null;
}

export interface UpdateJobPricingInfoRequest {
    reC_ID: number;
    shiP_DATE: Date | string | null;
    invoiceDate: Date | string | null;
    lockDate: Date | string | number | null;
    cost1: number | null;
    depAmount1: number | null;
    depAmount2: number | null;
    depAmount3: number | null;
    ttlPmts: number | null;
    pO_CHECK_2: boolean;
    delChrg: number | null;
    nonTaxDesc1: string | null;
    nonTaxDesc2: string | null;
    miscChg1: number | null;
    miscChg2: number | null;
    bidRoof: number | null;
    engRoof: number | null;
    soldRoof: number | null;
    bidFloor: number | null;
    engFloor: number | null;
    soldFloor: number | null;
    bidBeam: number | null;
    engBeam: number | null;
    soldBeam: number | null;
    bidHanger: number | null;
    engHanger: number | null;
    soldHanger: number | null;
    bidOpts: number | null;
    engOpts: number | null;
    soldOpts: number | null;
    bidMisc: number | null;
    engMisc: number | null;
    soldMisc: number | null;
    pO_CHECK_LOT: boolean;
    costInv5: string | null;
    roofSqFt: number | null;
    floorSqFt: number | null;
    bidBdft: number | null;
    bidLum: number | null;
    bidPlate: number | null;
    bidLabor: number | null;
    bidFBdft: number | null;
    bidFLum: number | null;
    bidFPlate: number | null;
    bidFLabor: number | null;
    jobBdft: number | null;
    jobLum: number | null;
    jobPlate: number | null;
    jobLabor: number | null;
    jobFBdft: number | null;
    jobFLum: number | null;
    jobFPlate: number | null;
    jobFLabor: number | null;
    bidHours: number | null;
    engHours: number | null;
    bidDesigns: number | null;
    bidFDesigns: number | null;
    jobDesigns: number | null;
    jobFDesigns: number | null;
    bidTrusses: number | null;
    bidFTrusses: number | null;
    jobTrusses: number | null;
    jobFTrusses: number | null;
    bidSalesTax: number | null;
    engSalesTax: number | null;
    soldSalesTax: number | null;
    dateTime: Date | string;
}

export interface UpdateJobTaxRateRequest {
    reC_ID: number;
    surtaxCountyID: number | null;
    taxRate: number | null;
}

export interface updateJobEngineering {
    REC_ID: number;
    enG_ID: string;
    joB_SUPER: string;
    plaN_RACK: string;
    planS_EDATE: Date | string | number;
    jobDir: string;
}

export interface updateJobProductions {
    REC_ID: number;
    engComment: string;
    shiP_DATE: string | number | Date;
    DraftComment: string;
    PLANT_LOC: string;
    planS_EDATE: Date | string | number;
    saW_EDATE: string | number | Date;
    saW_SDATE: string | number | Date;
    saW_STAT: string;
    saW_TOTAL_PROD: number | null;
    saW_YEST_PROD: number | null;
    saW_YEST_PROD_N: number | null;
    shoP_EDATE: string | number | Date;
    shoP_SDATE: string | number | Date;
    shoP_STAT: string;
    totaL_PROD: number | null;
    yesT_PROD: number | null;
    yesT_PROD_N: number | null;
}

export interface GetAudit {
    reC_ID: number;
    dataTableName: string;
    recNum: number;
    userID: string;
    changeDate: Date;
    changes: string;
    r_Codes: string;
}

export interface UpdateInvoice {
    reC_ID: number;
    invoicE_NUM: string;
    invoicE_POST: string;
    joB_PHONE1: string;
    joB_PHONE2: string;
    joB_PHONE3: string;
    joB_PO: string;
    shoP_EDATE: Date | string | number;
    shiP_DATE: Date | string | number;
    prinT_DATE: Date | string | number;
    invoiceDate: Date | string | number;
    DO_NOT_INV: boolean;
    JOB_SMAN_KEY: string;
}

export interface JobGarage {
    id: number;
    GARAGE: string;
}

export interface JobHead {
    reC_ID: number;
    joB_CUST_KEY: string | null;
    joB_SMAN_KEY: string | null;
    planT_LOC: string | null;
    joB_KEY: string;
    masteR_NUMBER: string | null;
    joB_TYPE: string | null;
    pcS_SHOP: number | null;
    reqD_DATE: string | null | Date;
    builD_DATE: string | null | Date;
    shiP_DATE: string | null | Date;
    moD_REQUIRED: boolean | null;
    moD_APPROVED: string | null | Date;
    planS_REQ: boolean | null;
    pricelock: boolean;
    invoice_lock: boolean;
    dO_NOT_INV: boolean;
    pO_CHECK_PRICE: boolean;
    pO_CHECK_LOT: boolean;
    pO_REVIEWED_BY: string | null;
    pO_CHECK_1: boolean;
    pO_CHECK_2: boolean;
    pO_CHECK_3: boolean;
    pO_CHECK_4: boolean;
    pO_CHECKS: string;
    newTruss: number;
    soldPrice: number | null;
    surtaxCountyID: number | null;
    joB_STATUS: string | null;
    joB_REF1: string | null;
    joB_REF2: string | null;
    joB_REF3: string | null;
    lot: string | null;
    block: string | null;
    model: string | null;
    parcel: string | null;
    joB_UNITS: string | null;
    joB_UNITSCNT: number | null;
    job_bldg: string | null;
    optionS1: string | null;
    optionS2: string | null;
    optionS3: string | null;
    bidComment: string | null;
    elevation: string | null;
    garage: string | null;
    joB_PO: string | null;
    jobRemarks: string | null;
    jobDirections: string | null;
    joB_LOGIN: string | null | Date;
    reqconfdate: string | null | Date;
    peId: string | null;
    pE_SDATE: string | null | Date;
    joB_SALEAGREE: string | null | Date;
    joB_PODATE: string | null | Date;
    jobContract: string | null;
    layouT_APPROVED: string | null | Date;
    drafT_SDATE: string | null | Date;
    invoiceDate: string | null | Date;
    lockDate: string | null | Date;
    depAmount1: number | null;
    depAmount2: number | null;
    depAmount3: number | null;
    ttlPmts: number | null;
    delChrg: number | null;
    nonTaxDesc1: string | null;
    nonTaxDesc2: string | null;
    miscChg1: number | null;
    miscChg2: number | null;
    bidRoof: number | null;
    engRoof: number | null;
    soldRoof: number | null;
    bidFloor: number | null;
    engFloor: number | null;
    soldFloor: number | null;
    bidBeam: number | null;
    engBeam: number | null;
    soldBeam: number | null;
    bidHanger: number | null;
    engHanger: number | null;
    soldHanger: number | null;
    bidOpts: number | null;
    engOpts: number | null;
    soldOpts: number | null;
    bidMisc: number | null;
    engMisc: number | null;
    soldMisc: number | null;
    costInv5: string | null;
    taxRate: number | null;
    cost1: number | null;
    cost2: number | null;
    roofSqFt: number | null;
    floorSqFt: number | null;
    bidBdft: number | null;
    bidLum: number | null;
    bidPlate: number | null;
    bidLabor: number | null;
    bidFBdft: number | null;
    bidFLum: number | null;
    bidFPlate: number | null;
    bidFLabor: number | null;
    jobBdft: number | null;
    jobLum: number | null;
    jobPlate: number | null;
    jobLabor: number | null;
    jobFBdft: number | null;
    jobFLum: number | null;
    jobFPlate: number | null;
    jobFLabor: number | null;
    bidHours: number | null;
    engHours: number | null;
    bidDesigns: number | null;
    bidFDesigns: number | null;
    jobDesigns: number | null;
    jobFDesigns: number | null;
    bidTrusses: number | null;
    bidFTrusses: number | null;
    jobTrusses: number | null;
    jobFTrusses: number | null;
    plansEdate: string | null | Date;
    total: number | null;
    jobDir: string | null;
    enG_ID: string | null;
    contracT_RECV: string | null | Date;
    scopE_REV: string | null | Date;
    legaL_REV: string | null | Date;
    senT_TO_CUST: string | null | Date;
    creatE_DATE: string | null | Date;
    joB_ID_LINE: string | null;
    plaN_RACK: string | null;
    expeditE_STATUS: string | null;
    joB_SUPER: string | null;
    draftComment: string | null;
    engComment: string | null;
    bidStat: string | null;
    saW_STAT: string | null;
    saW_SDATE: string | null | Date;
    saW_EDATE: string | null | Date;
    saW_YEST_PROD: number | null;
    saW_YEST_PROD_N: number | null;
    saW_TOTAL_PROD: number | null;
    shoP_STAT: string | null;
    shoP_SDATE: string | null | Date;
    shoP_EDATE: string | null | Date;
    yesT_PROD: number | null;
    yesT_PROD_N: number | null;
    totaL_PROD: number | null;
    joB_OWNER1: string | null;
    joB_LEGAL: string | null;
    revSdate: string | null;
    revEdate: string | null;
    joB_PHONE1: string | null;
    joB_PHONE2: string | null;
    joB_PHONE3: string | null;
    prinT_DATE: string | null;
    invoicE_POST: string | null;
    invoicE_NUM: string | null;
    inV_VERIFIED: string | null | Date;
    biD_SDATE: string | Date | null;
    noteUser: string | null;
    cosT_JOBKEY: string | null;
    payments: number | null;
    lat: number | null;
    long: number | null;
    //Project Data
    projectMasterPO: string | null;
    projectActive_status: string | null;
    projectJob_appr_req: boolean;
    projectSubdivision: string | null;
    //Customer Data
    customerKey: string;
    dclU_NUMBER: string | null;
}

export interface JobWithProjectCustomer {
    reC_ID: number;
    joB_CUST_KEY: string | null;
    joB_SMAN_KEY: string | null;
    planT_LOC: string | null;
    joB_KEY: string;
    masteR_NUMBER: string | null;
    joB_TYPE: string | null;
    pcS_SHOP: number | null;
    reqD_DATE: string | null | Date;
    builD_DATE: string | null | Date;
    shiP_DATE: string | null | Date;
    moD_REQUIRED: boolean | null;
    moD_APPROVED: string | null | Date;
    planS_REQ: boolean | null;
    pricelock: boolean;
    invoice_lock: boolean;
    dO_NOT_INV: boolean;
    pO_CHECK_PRICE: boolean;
    pO_CHECK_LOT: boolean;
    pO_REVIEWED_BY: string | null;
    pO_CHECK_1: boolean;
    pO_CHECK_2: boolean;
    pO_CHECK_3: boolean;
    pO_CHECK_4: boolean;
    pO_CHECKS: string;
    newTruss: number;
    soldPrice: number | null;
    surtaxCountyID: number | null;
    joB_STATUS: string | null;
    joB_REF1: string | null;
    joB_REF2: string | null;
    joB_REF3: string | null;
    loT: string | null;
    blocK: string | null;
    modeL: string | null;
    parceL: string | null;
    joB_UNITS: string | null;
    joB_UNITSCNT: number | null;
    job_bldg: string | null;
    optionS1: string | null;
    optionS2: string | null;
    optionS3: string | null;
    bidComment: string | null;
    elevatioN: string | null;
    garagE: string | null;
    joB_PO: string | null;
    jobRemarks: string | null;
    jobDirections: string | null;
    joB_LOGIN: string | null | Date;
    reqconfdatE: string | null | Date;
    peId: string | null;
    pE_SDATE: string | null | Date;
    joB_SALEAGREE: string | null | Date;
    joB_PODATE: string | null | Date;
    jobContract: string | null | Date;
    layouT_APPROVED: string | null | Date;
    drafT_SDATE: string | null | Date;
    invoiceDate: string | null | Date;
    lockDate: string | null | Date;
    depAmount1: number | null;
    depAmount2: number | null;
    depAmount3: number | null;
    ttlPmts: number | null;
    delChrg: number | null;
    nonTaxDesc1: string | null;
    nonTaxDesc2: string | null;
    miscChg1: number | null;
    miscChg2: number | null;
    bidRoof: number | null;
    engRoof: number | null;
    soldRoof: number | null;
    bidFloor: number | null;
    engFloor: number | null;
    soldFloor: number | null;
    bidBeam: number | null;
    engBeam: number | null;
    soldBeam: number | null;
    bidHanger: number | null;
    engHanger: number | null;
    soldHanger: number | null;
    bidOpts: number | null;
    engOpts: number | null;
    soldOpts: number | null;
    bidMisc: number | null;
    engMisc: number | null;
    soldMisc: number | null;
    costInv5: string | null;
    taxRate: number | null;
    cost1: number | null;
    cost2: number | null;
    roofSqFt: number | null;
    floorSqFt: number | null;
    bidBdft: number | null;
    bidLum: number | null;
    bidPlate: number | null;
    bidLabor: number | null;
    bidFBdft: number | null;
    bidFLum: number | null;
    bidFPlate: number | null;
    bidFLabor: number | null;
    jobBdft: number | null;
    jobLum: number | null;
    jobPlate: number | null;
    jobLabor: number | null;
    jobFBdft: number | null;
    jobFLum: number | null;
    jobFPlate: number | null;
    jobFLabor: number | null;
    bidHours: number | null;
    engHours: number | null;
    bidDesigns: number | null;
    bidFDesigns: number | null;
    jobDesigns: number | null;
    jobFDesigns: number | null;
    bidTrusses: number | null;
    bidFTrusses: number | null;
    jobTrusses: number | null;
    jobFTrusses: number | null;
    plansEdate: string | null | Date;
    total: number | null;
    jobDir: string | null;
    enG_ID: string | null;
    contracT_RECV: string | null | Date;
    scopE_REV: string | null | Date;
    legaL_REV: string | null | Date;
    senT_TO_CUST: string | null | Date;
    creatE_DATE: string | null | Date;
    joB_ID_LINE: string | null;
    plaN_RACK: string | null;
    expeditE_STATUS: string | null;
    joB_SUPER: string | null;
    draftComment: string | null;
    engComment: string | null;
    bidStat: string | null;
    saW_STAT: string | null;
    saW_SDATE: string | null | Date;
    saW_EDATE: string | null | Date;
    saW_YEST_PROD: number | null;
    saW_YEST_PROD_N: number | null;
    saW_TOTAL_PROD: number | null;
    shoP_STAT: string | null;
    shoP_SDATE: string | null | Date;
    shoP_EDATE: string | null | Date;
    yesT_PROD: number | null;
    yesT_PROD_N: number | null;
    totaL_PROD: number | null;
    joB_OWNER1: string | null;
    joB_LEGAL: string | null;
    revSdate: string | null | Date;
    revEdate: string | null | Date;
    joB_PHONE1: string | null;
    joB_PHONE2: string | null;
    joB_PHONE3: string | null;
    prinT_DATE: string | null | Date;
    invoicE_POST: string | null;
    invoicE_NUM: string | null;
    inV_VERIFIED: string | null | Date;
    biD_SDATE: string | Date | null;
    noteUser: string | null;
    cosT_JOBKEY: string | null;
    payments: number | null;
    lat: number | null;
    long: number | null;
    //Project Data
    projectRecId: number | null;
    projectMasterPO: string | null;
    projectActive_status: string | null;
    projectJob_appr_req: boolean;
    projectMast_appr_req: boolean;
    projectSubdivision: string | null;
    //Customer Data
    customerRecId: number | null;
    customerCUST_NAME: string | null;
    //Anonymous Data
    daysOld: number | null;
    statDaysOld: number | null;
    dclU_NUMBER: string | null;
}

export interface GetJobStatusOptionsRequest {
    jobStatusCode?: string | null;
    limit?: number | null;
}

export interface JobStatus {
    id: number;
    code: string;
    title: string | null;
    description: string | null;
}
export interface JobNoteStatus {
    joB_STATUS: string;
}

export interface GetMyFollowingJobsRequest {
    dateTime?: Date | string | null;
    jobStatuses?: string | null;
    [key: string]: any;
}

export interface Initiator {
    id: number;
    initiatorId: number;
    description: string | null;
}
export interface CreateNotesInGeneral {
    job_Key: string;
    noteType: string;
    jobNotes: string;
    initiator: string;
    fromDate?: string | number | Date | null;
    toDate?: string | number | Date | null;
    dateType?: string;
}
export interface UpdateNotesInGeneral {
    job_Key: string;
    noteType: string;
    jobNotes: string;
    initiator: string;
    fromDate?: string | number | Date | null;
    toDate?: string | number | Date | null;
}

export interface UpdateSpecialMaterial {
    job_Id: number;
    isSpecialMaterial: boolean;
    isBeamOrderExist: boolean;
}

export interface PicFile {
    name: string;
}

export interface CheckProcessPicResponse {
    alreadyDone: boolean;
    hasConflicts: boolean;
    failed: boolean;
    verifiedJobItems: number;
    misMatchedJobItems: number;
    additionalJobItems: number;
    removedJobItems: number;
    mismatchedConflicts: string[];
    addConflicts: string[];
    removeConflicts: string[];
    warnings: string[];
    notes: string[];
}

export interface OverrideSoldPricesUpdate {
    jobKey: string;
    soldFloor: number | null;
    soldRoof: number | null;
    soldBeam: number | null;
    soldHanger: number | null;
    soldOpts: number | null;
    soldMisc: number | null;

    subTotal: number | null;
    taxAndSurtaxTotal: number | null;
    cost1: number | null; // state tax
    cost2: number | null; // county surtax
    nonTaxAmt: number | null;
    totalPrice: number | null;
    pricePerBdFt: number | null;

    miscChg1: number | null;
    miscChg2: number | null;
    delChrg: number | null;
    soldPrice: number | null;

    jobBdft: number | null;
    jobFBdft: number | null;
}

export interface UpdateBiddingPricingInfo {
    REC_ID: number;
    bidRoof: number | null;
    bidFloor: number | null;
    bidBeam: number | null;
    bidHanger: number | null;
    bidOpts: number | null;
    bidMisc: number | null;
    bidBdft: number | null;
    bidLum: number | null;
    bidPlate: number | null;
    bidLabor: number | null;
    bidFBdft: number | null;
    bidFLum: number | null;
    bidFPlate: number | null;
    bidFLabor: number | null;
    bidDesigns: number | null;
    bidFDesigns: number | null;
    bidTrusses: number | null;
    bidFTrusses: number | null;
    pcs_Saw: number | null; 
    //  bidSalesTax: number | null;
}
export interface UpdateEngineeringPricingInfo {
    REC_ID: number;
    engRoof: number | null;
    engFloor: number | null;
    engBeam: number | null;
    engHanger: number | null;
    engOpts: number | null;
    engMisc: number | null;
    jobBdft: number | null;
    jobLum: number | null;
    jobPlate: number | null;
    jobLabor: number | null;
    jobFBdft: number | null;
    jobFLum: number | null;
    jobFPlate: number | null;
    jobFLabor: number | null;
    miscChg1: number | null;
    miscChg2: number | null;
    delChrg: number | null;
    taxRate: number | null;
    roofSqFt: number | null;
    floorSqFt: number | null;
    bidHours: number | null;
    engHours: number | null;
    pcs_Saw: number | null;
}
export interface UpdateSoldPricingInfo {
    REC_ID: number;
    soldRoof: number | null;
    soldFloor: number | null;
    soldBeam: number | null;
    soldHanger: number | null;
    soldOpts: number | null;
    soldMisc: number | null;
    miscChg1: number | null;
    miscChg2: number | null;
    delChrg: number | null;
    soldPrice: number | null;
    cost1: number | null;
    cost2: number | null;
    lockDate: Date | null;
    invoice_lock: boolean;
    pricelock: boolean | null;
    pcs_Saw: number | null;
}
export interface JobDataForRelatedJobs {
    recId: number;
    jobKey: string;
    roofBdFt: number;
    floorBdFt: number;
    jobLoginDate: Date | string | null;
    reqDate: Date | string | null;
    buildDate: Date | string | null;
    shipDate: Date | string | null;
    plantLocation: string | null;
    jobType: string | null;
    jobStatus: string | null;
    customerKey: string | null;
    customerName: string | null;
    projectId: number | null;
    projectSubdivision: string | null;
    siteAddress: string | null;
    salesmanKey: string | null;
    salesmanName: string | null;
    surtaxCountyId: number | null;
    county: string | null;
    state: string | null;
    lot: string | null;
    block: string | null;
    model: string | null;
    elevation: string | null;
    MASTER_NUMBER: string;
    joB_REF1: string | null;
    job_bldg: string | null;
    // NOTE: Property rescheduleCount is the number of times a Job has been rescheduled as part of Scenario Execution.
    rescheduleCount: string;
    accountingDate: Date | string | null;
    isAccountingDateUsed: boolean | null;
    completedBdFtPercent: number;
    remainingBdFt: number;
    totalBiddingPrice: number;
    totalEngineeredPrice: number;
    totalSoldPrice: number;
    optionS1: string;
    optionS2: string;
    optionS3: string;
    bidRoof: number | null;
    bidFloor: number | null;
    bidBeam: number | null;
    bidHanger: number | null;
    bidOpts: number | null;
    bidMisc: number | null;
    bidBdft: number | null;
    bidLum: number | null;
    bidPlate: number | null;
    bidLabor: number | null;
    bidFBdft: number | null;
    bidFLum: number | null;
    bidFPlate: number | null;
    bidFLabor: number | null;
    bidHours: number | null;
    bidDesigns: number | null;
    bidFDesigns: number | null;
    bidTrusses: number | null;
    bidFTrusses: number | null;
    engRoof: number | null;
    engFloor: number | null;
    engBeam: number | null;
    engHanger: number | null;
    engOpts: number | null;
    engMisc: number | null;
    jobBdft: number | null;
    jobLum: number | null;
    jobPlate: number | null;
    jobLabor: number | null;
    jobFBdft: number | null;
    jobFLum: number | null;
    jobFPlate: number | null;
    jobFLabor: number | null;
    engHours: number | null;
    jobDesigns: number | null;
    jobFDesigns: number | null;
    jobTrusses: number | null;
    jobFTrusses: number | null;
    soldRoof: number | null;
    soldFloor: number | null;
    soldBeam: number | null;
    soldHanger: number | null;
    soldOpts: number | null;
    soldMisc: number | null;
    dclU_NUMBER: string | null;
}
export interface JobData {
    recId: number;
    jobKey: string;
    roofBdFt: number;
    floorBdFt: number;
    jobLoginDate: string | null;
    reqDate: string | null;
    confirmedDate: string | null;
    buildDate: string | null;
    shipDate: string | null;
    plantLocation: string | null;
    jobType: string | null;
    jobStatus: string | null;
    customerKey: string | null;
    customerName: string | null;
    projectId: number | null;
    projectSubdivision: string | null;
    siteAddress: string | null;
    salesmanKey: string | null;
    salesmanName: string | null;
    surtaxCountyId: number | null;
    county: string | null;
    state: string | null;
    lot: string | null;
    block: string | null;
    model: string | null;
    elevation: string | null;
    masteR_NUMBER: string | null;
    joB_REF1: string | null;
    job_bldg: string | null;
    joB_UNITS: string | null;
    totalCount: number;
    optionS1: string | null;
    optionS2: string | null;
    optionS3: string | null;
    masteR_REC_ID: number | null;
    draftID:string|null;
    dclU_NUMBER: string | null;
}

export interface JobNoteStatus {
    joB_STATUS: string;
}
export interface auditForPricing {
    REC_ID: number;
    JOB_KEY: string;
}
export interface auditForAddition {
    REC_ID: number;
    JOB_KEY: string;
}

export interface UpdateJobPriceLockRequest {
    reC_ID: number;
    pricelock: boolean;
    lockDate?: string | null | Date;
    soldPrice?: number | null;
    cost1?: number | null;
    cost2?: number | null;
}

export interface UpdateJobInvoiceLockRequest {
    reC_ID: number;
    invoiceLock: boolean;
}

export interface InventoryItem {
    ITEM_KEY: string;
    ITEM_DESC: string;
    UNIT_COST: number | null;
    UNIT_PRICE1: number | null;
    PART_TYPE: string;
    specialMaterial: boolean;
}

export interface InventoryFilter {
    Key: string;
    Description: string;
    JobGroup: string;
}

export interface updateTrussInventoryItem {
    JI_QUANT: number;
}
export interface AddInventoryTrussJob {
    JOB_KEY: string;
    JI_QUANT: number;
    JI_ITEM_KEY: string;
    JI_ITEM_DESC: string;
    BP: number;
    JI_Family: string;
    partType?: string;
}

export interface GetPreDataToOverrideJobStatusResponse
    extends GetPreDataToCompleteWOAndOverrideJobStatusResponse {
    activeWorkOrdersUnderJob: WorkOrder[];
}

export interface OverrideJobStatusRequest {
    dateTime: Date | string;
    jobStatusCode: string;
    subContractor: string | null;
    additionalHours: number;
    jobNote: string | null;
    addJobNoteToNewWONotes: boolean;
    activeWorkOrderIdsToComplete: number[];
}

export interface OverrideYExceptionOfJobRequest {
    dateTime: Date | string;
    jobNote: string | null;
}

export interface CheckIfJobHasBlockingExceptionsResponse {
    jobHasBlockingExceptions: boolean;
}

export interface CheckIfJobHasPossibilityFor50FeetSpanExceptionResponse {
    jobHasPossibilityFor50FeetSpanException: boolean;
}

export interface Enable50FeetSpanExceptionResponse {
    enabled: boolean;
}

export interface Disable50FeetSpanExceptionResponse {
    disabled: boolean;
}

export interface LumberMaterial {
    recId: number;
    jobKey: string;
    itemId: number;
    sizeName: string;
    gradeName: string;
    nomLen: number;
    qty: number;
    bdFt: number;
    fgcolor: string;
    specialMaterial: boolean;
}

export interface PlateMaterial {
    recId: number;
    jobKey: string;
    itemId: number;
    name: string;
    type: number;
    qty: number;
    sqIn: number;
    specialMaterial: boolean;
}

export interface JobKeyMasterDecoded {
    jobKey: string;
    jobKeyParts: string;
    yearCode: string;
    custCode: string;
    projCode: string;
    modelAndOptions: string;
    jobCustKey: string;
    projSubdivision: string;
    modelEtc: string;
    modelEtc2: string;
}

export interface CustomerPOStatus {
    type: string;
    id: number;
}

export interface checkDuplicatePOParams {
    status: string;
    project: number;
    customer: string;
}

export interface AssignJobWO {
    assignTo: string;
    jobKeys: string[];
    scheduleDate: Date | string | number;
}
