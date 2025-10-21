export interface CreateTransmittal{
    rec_ID: number;
   form_name: string;
   job_key: string;
    subDivision: string;
    bldg_model: string;
    recipient_name: string
    recipient_addr1: string;
    recipient_addr2: string;
    recipient_addr3: string;
    attention: string;
    cc_name: string;
    cc_addr1: string;
    cc_addr2: string;
    cc_addr3: string;
    truss_eng: number;
    te_raised: number;
    te_wetseal: number;
    te_noseal: number;
    truss_placement: number;
    tpp_raised: number;
    tpp_wetseal: number;
    tpp_noseal: number;
    elevenBySeven: number;
    twentyFourBySeven: number;
    custom_size_checkbox: number;
    custom_size: string;
    comments: string;
    for_approval: number;
    as_requested: number;
    for_permit: number;
    sales_agreement: number;
    const_issue: number;
    sign_return: number;
    ground_ship: number;
    alt_ship_address: number;
    salesMan: number;
    overnight: number;
    overnight_am: number;
    dateSent: Date;
    sender: string;
    upS_DELV: number;
    uspS_DELV: number;
    fedeX_DELV: number;
    tracking_Num: string,
    over50: number;
}

export interface customSizeValues{
    recId: number;
    customSize: string;
}

export interface TitleType{
    recId: number;
    title: string;
}