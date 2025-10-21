import { Null } from './general.model';

export interface Project {
    id: string;
    customerId:number;
    cusT_NAME: string;
    cusT_KEY: string;
    rec_id: number;
    customer: string;
    subdivision: string;
    city: string;
    zip: string;
    address1: string;
    address2: string;
    lat: number;
    long: number;
    county: string;
    salesRep: string;
    active_status: string;
    surtaxCountyId: number;
    prj_contact: string;
    notes: string;
    job_Type: string;
    unitsRemaining: number;
    prj_email: string;
    delv_contact: string;
    contact: string;
    projectedStart: string | number | Date;
    projectedEnd: string | number | Date;
    received: string | number | Date;
    operationsReviewed: string | number | Date;
    legalReviewed: string | number | Date;
    sentToCustomer: string | number | Date;
    responseReceived: string | number | Date;
    reviewedAndAccepted: string | number | Date;
    completed: string | number | Date;
    state: string;
    salesRepEmail: string;
    billto: string;
    smaN_NAME: string;
    design_Notes: string;
    seatPlates: number;
    architectName: string;
    arch_Id: number;
    eoR_Id: number;
    eorName: string;
    prj_Fax: string;
    invoicedAmount: number;
    prj_flags: string;
    contractStatus: string;
    unitsPerMonth: number;
    bid_units_Roof: number;
    bid_Bdft_Roof: number;
    amenities: string;
    avg_Unit_Roof: number;
    type: string;
    classification: string;
    masterPO: string;
    bracing: boolean;
    preTaxPricing: boolean;
    delv_rpt: boolean;
    projectDir: string;
    dev_key: string;
    mast_appr_req: boolean;
    job_appr_req: boolean;
    no_appr_req: boolean;
    acct_type: string;
    active: boolean;
    planT_LOC:string;
    bid_contactid : number;
    projectphone:string;
    ezUrl:string;
    labelType: string;
}

export interface CreateProject {
    customer: string;
    surtaxCountyId: number;
    subdivision: string;
    county: string;
    salesRep: string;
    active_status: string;
    prj_contact: string;
    labelType:string;
}
export interface AddProject {
    customer: string;
    surtaxCountyId: number;
    subdivision: string;
    city: string;
    zip: string;
    address1: string;
    address2: string;
    county: string;
    salesRep: string;
    active_status: string;
    prj_contact: string;
    prj_email: string;
    delv_contact: string;
    billto: string;
    projectedStart: string | number | Date;
    projectedEnd: string | number | Date;
    job_Type: string;
    notes: string;
    Prj_Fax: string;
    Prj_flags: string;
    lat: number;
    long: number;
    planT_LOC: string,
    active: boolean;
    ezUrl:string;
    labelType:string;
}

export interface AddBidProject {
    customer: string;
    surtaxCountyId: number;
    subdivision: string;

    county: string;
    salesRep: string;
    active_status: string;
    prj_email: string;
    delv_contact: string;
    prj_contact: string;
    billto: string;
    projectedStart: string | number | Date | null;
    projectedEnd: string | number | Date | null;
    job_Type: string;
    notes: string;
    city: string;
    zip: string;
    address1: string;
    address2: string;
    Prj_Fax: string;
    Prj_flags: string;
    planT_LOC:string;
    lat: number;
    long: number;
    active: boolean;
}

export interface GetSalesRep {
    reC_ID: number;
    smaN_KEY: string;
    smaN_NAME: string;
    eMail: string;
}

export interface County {
    rec_ID: number;
    county: string;
    state: string;
}

export interface State {
    state: string;
    id: number;
}

export interface ActiveStatus {
    activestatus: string;
    id: number;
}
export interface Contact {
    rec_Id: number;
    cust_Key: string;
    first_Name: string;
    last_Name: string;
}

export interface JobsAllData {
    jobKey: string;
    reC_ID: number;
    location: string;
    project: string;
    customer: string;
    salesman: string;
    jobStatus: string;
}

export interface UpdateProject {
    rec_id: number;
    customer: string;
    surtaxCountyId: number;
    subdivision: string;
    city: string;
    zip: string;
    address1: string;
    address2: string;
    lat: number;
    long: number;
    county: string;
    salesRep: string;
    active_status: string;
    prj_contact: string;
    prj_email: string;
    delv_contact: string;
    labelType:string;
}

export interface EditProject {
    rec_id: number;
    customer: string;
    surtaxCountyId: number;
    subdivision: string;
    city: string;
    zip: String;
    address1: string;
    address2: string;
    county: string;
    salesRep: string;
    active_status: string;
    prj_contact: string;
    prj_email: string[];
    delv_contact: string;
    contractStatus: string;
    projectedStart: string | number | Date;
    projectedEnd: string | number | Date;
    received: string | number | Date;
    operationsReviewed: string | number | Date;
    legalReviewed: string | number | Date;
    sentToCustomer: string | number | Date;
    responseReceived: string | number | Date;
    reviewedAndAccepted: string | number | Date;
    completed: string | number | Date;

    billto: string;
    job_Type: string;
    MasterPO: string;
    Acct_type: string;
    Mast_appr_req: boolean | undefined;
    Job_appr_req: boolean | undefined;
    No_appr_req: boolean | undefined;
    Bracing: boolean | null | undefined;
    UnitsRemaining: number | null;
    notes: string;
    Avg_Unit_Roof: number;
    Bid_units_Roof: number;
    Bid_BdFt_Roof: number;
    Amenities: number;
    UnitsPerMonth: number;
    InvoicedAmount: number;
    prj_flags: string;
    Prj_Fax: string;
    SalesRep: string;
    preTaxPricing: boolean | null | undefined;
    delv_rpt: boolean | null | undefined;
    arch_Id: number;
    eoR_Id: number;
    seatPlates: boolean;
    Design_Notes: string;
    ProjectDir: string;
    active: boolean;
    lat: number;
    long: number;
    planT_LOC:string;
    bid_contactid : number | null;
    dev_key:string;
    ezUrl:string;
    labelType:string;
}
export interface ContractStatus {
    ContractStatus: string;
    id: number;
}

export interface Confidence {
    confidence: string;
    id: number;
}

export interface Architect {
    name: string;
    recId: number;
    address1: string;
    address2: string;
    phone: string;
}

export interface CreateArchitect {
    name: string;
}

export interface EOR {
    rec_ID: number;
    name: string;
    lic_Info: string;
    address1: string;
    address2: string;
    phone: string;
    inActive: boolean;
}

export interface createEOR {
    name: string;
    lic_Info: string;
    address1: string;
    address2: string;
    phone: string;
    //inActive: boolean;
}

export class Account {
    id!: number;
    text!: string;
}
