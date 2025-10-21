import * as internal from 'stream';

export interface GetBid {
    rec_Id: number;
    project_Id: number;
    bid_login_date: any;
    bid_expire_date: any;
    bid_type: string;
    bid_status: string;
    product_type: string;
    model_Info: string;
    bidNotes: string;
    bid_Number: string;
    county: string;
    product_line: string;
    contact_Name: string;
    planT_LOC: string;
    bid_method: string | null;
    bid_Comment: string;
    status_Comment: string;
    bid_Submitted: any;
    bid_end_date: string | number | Date;
    joB_REF2: string;
    jobDir: string;
    additionalCustomers:string;
    salesRep:string;
    projectBidAddress:string;
}
export interface CreateBid {
    project_Id: number;
    bid_type: string;
    bid_status: string;
    model_Info: string;
    bid_login_date: string | number | Date;
    bid_expire_date: string | number | Date;
    bidNotes: string;
    bid_Number: string;
    product_type: string;
    bid_Custkey: string[];
    product_line: string;
    PLANT_LOC: string;
    prj_contact: number;
}

export interface AddCreateBid {
    project_Id: number;
    bid_type: string;
    bid_status: string;
    model_Info: string;
    bid_login_date: any;
    bid_expire_date: any;
    IndexDate: string | number | Date;
    Bid_Submitted: string | number | Date;
    Bid_end_date: string | number | Date;
    PlansDate: string | number | Date;
    bidNotes: string;
    bid_Number: string;
    product_type: string;
    bid_Custkey: string[];
    product_line: string;
    PLANT_LOC: string;
    prj_contact: number;
    FloorPSF: number | null;
    FloorSize: string;
    Status_Comment: string;
    Bid_Units_Roof: number;
    Design_Units_Roof: number;
    Avg_Unit_Roof: number;
    Bid_Bdft_Roof: number;
    amenities: number;
    RoofPSF: number;
    WindLoading: number;
    PlansBy: string;
    FloorDepth: number;
    FloorSpacing: number;
    IndexAmount: number;
    HipCats: string;
    bid_method: string;
    SeatPlates: string;
    Beams: string;
    LevelReturns: string;
    Bid_Comment: string;
    joB_REF2: string;
    jobDir: string;
    jobKey:string;
}

export interface UpdateBid {
    rec_Id: number;
    project_Id: number;
    bid_type: string;
    bid_status: string;
    model_Info: string;
    bid_login_date: string | number | Date;
    bid_expire_date: string | number | Date;
    bidNotes: string;
    bid_Number: string;
    product_type: string;
    bid_Custkey: string[];
    product_line: string;
    PLANT_LOC: string;
    prj_contact: number;
}
export interface JobType {
    type: string;
    class: string;
    joB_TYPE: string;
}
export interface BidStatus {
    name: string;
    id: number;
}

export interface AdditionalCustomers {
    rec_id: number;
    bid_id: number;
    bid_Custkey: string;
    customerName: string;
    bid_sman: string;
}

export interface ProjectCounty {
    rec_ID: number;
    county: string;
    state: string;
    subdivision: string;
}

export interface Contact {
    reC_ID: number;
    contact: string;
}
export interface WorkOrder {
    woid: number;
    esdActivity: string;
    esdTitle: string;
    esdJobkey: string;
    esdStatus: string;
    esdDueDate: string | number | Date;
    esdSchedDate: string | number | Date;
    esdLocation: string | null;
}
export interface PlantLocation {
    reC_ID: number;
    joB_KEY: number;
    planT_LOC: number;
}
export interface BidStatus {
    id: number;
    bidStatus: string;
}
export interface BidType {
    bidType: string;
    id: number;
}
export interface ProductLine {
    productLine: string;
    id: number;
}
export interface Beams {
    beam: string;
    id: number;
}
export interface FloorSize {
    floor_Size: string;
    id: number;
}
export interface BiddingMethod {
    bid_Method: string;
    id: number;
}
export interface LevelReturns {
    level_Returns: string;
    id: number;
}
export interface SeatPlates {
    seat_Plates: string;
    id: number;
}
export interface HipCats {
    hip_Cats: string;
    id: number;
}
export interface StdNotes {
    group: string;
    description: string;
    order: number;
    rec_ID: number;
    code: string;
    id: number;
}
export interface GetbidtypeResponse {
    id: number | null;
    subdivision: string;
}

export interface GetbidtypeRequest {
    subdivision?: string | null;

    limit?: number | null;
}

export interface GetBidByBidNumberRequest {
    orderByBidLoginDateDesc: boolean;
}
export interface Bid {
    rec_Id: number;
    project_Id: number;
    bid_type: string;
    bid_status: string;
    model_Info: string;
    bid_login_date: any;
    bid_expire_date: any;
    indexDate: string | number | Date;
    bid_Submitted: string | number | Date;
    bid_end_date: string | number | Date;
    plansDate: string | number | Date;
    bidNotes: string;
    bid_Number: string;
    product_type: string;
    bid_Custkey: string[];
    product_line: string;
    planT_LOC: string;
    prj_contact: number;
    floorPSF: number | null;
    floorSize: string;
    status_Comment: string;
    bid_Units_Roof: number;
    design_Units_Roof: number;
    avg_Unit_Roof: number;
    bid_Bdft_Roof: number;
    amenities: number;
    roofPSF: number;
    windLoading: number;
    plansBy: string;
    floorDepth: number;
    floorSpacing: number;
    indexAmount: number;
    hipCats: string;
    bid_method: string;
    seatPlates: string;
    beams: string;
    levelReturns: string;
    bid_Comment: string;
    avg_Unit_Floor: string;
    joB_REF2: string;
    finalDispositionReason:string;
    winningProbability:string;
}

export interface UpdateEditBid {
    rec_Id: number;
    project_Id: number;
    bid_type: string;
    bid_status: string;
    model_Info: string;
    bid_login_date: any;
    bid_expire_date: any;
    IndexDate: string | number | Date;
    Bid_Submitted: any;
    bid_end_date: string | number | Date;
    PlansDate: string | number | Date;
    bidNotes: string;
    bid_Number: string;
    product_type: string;
    bid_Custkey: string[];
    product_line: string;
    PLANT_LOC: string;
    prj_contact: number;
    FloorPSF: number | null;
    FloorSize: string;
    Status_Comment: string;
    Bid_Units_Roof: number;
    Design_Units_Roof: number;
    Avg_Unit_Roof: number;
    Bid_Bdft_Roof: number;
    amenities: number;
    RoofPSF: number;
    WindLoading: number;
    PlansBy: string;
    FloorDepth: number;
    FloorSpacing: number;
    IndexAmount: number;
    HipCats: string;
    bid_method: string;
    SeatPlates: string;
    Beams: string;
    LevelReturns: string;
    Bid_Comment: string;
    joB_REF2: string;
    salesRep:string;
    finalDispositionReason:string;
    winningProbability:string;
}
export interface RepriceBid {
    rec_Id: number;
    project_Id: number;
    bid_type: string;
    bid_status: string;
    model_Info: string;
    bid_login_date: string | number | Date;
    bid_expire_date: string | number | Date;
    bidNotes: string;
    bid_Number: string;
    product_type: string;
    bid_Custkey: string[];
    product_line: string;
    PLANT_LOC: string;
    prj_contact: number;
    Bid_Comment: string;
    Status_Comment: string;
    IndexDate: string | number | Date;
    Bid_Submitted: string | number | Date;
    Bid_end_date: string | number | Date;
    PlansDate: string | number | Date;
    joB_REF2: string;
    jobDir: string;
}
export interface BidConfiguration {
    id?: number;
    bufferDaysBetweenLoginDateAndExpireDate: number;
}
export interface GetBidJob{
    jobKey?: string|null;
    limit?: number | null;
}

export interface GetBidJobResponse {
    jobKey: string;
}

export interface BidProbability {
    probability: string;
    id: number;
}

export interface BidDispositionReason {
    dispositionReason: string;
    id: number;
}
