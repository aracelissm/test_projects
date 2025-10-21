import { CreateContact } from './contact.model';

export interface GetCustomer {
    reC_ID: number;
    cusT_NAME: string;
    cusT_KEY: string;
    cust_status: string;
    cusT_SMAN_KEY: string;
    cust_Active: boolean;
    cusT_TERMS: string;
    bilL_ADDR1: string;
    bilL_ADDR2: string;
    bilL_ADDR3: string;
    domain?: string;
}

export interface GetCustomerById {
    paymentNotes: any;
    cust_Notes: string;
    reC_ID: number;
    cusT_NAME: string;
    cusT_KEY: string;
    cust_status: string;
    cusT_SMAN_KEY: string;
    joB_SITE_BEEPER3: string;
    cust_Active: string;
    cusT_TERMS: string;
    bilL_ADDR1: string;
    bilL_ADDR2: string;
    bilL_ADDR3: string;
    maiL_ADDR1: string;
    maiL_ADDR2: string;
    maiL_ADDR3: string;
    cusT_LOGIN_DATE: any;
    cLevel: any;
    cusT_ACCOUNT_NUM: any;
    deliveryDirections: string;
    customer_Contact: CreateContact;
    proj_contact: string;
    domain? : string;
}

export interface CreateCustomer {
    cusT_NAME: string;
    cusT_KEY: string;
    cusT_SMAN_KEY: string;
    cust_Active: boolean;
    cust_status: string;
    cusT_TERMS: string;
    bilL_ADDR1: string;
    bilL_ADDR2: string;
    bilL_ADDR3: string;
}

export interface AddCreateCustomer {
    cusT_NAME: string;
    cusT_KEY: string;
    cusT_SMAN_KEY: string;
    JOB_SITE_BEEPER3: string;
    cust_status: string;
    cusT_TERMS: string;
    bILL_ADDR1: string;
    bILL_ADDR2: string;
    bILL_ADDR3: string;
    mAIL_ADDR1: string;
    mAIL_ADDR2: string;
    mAIL_ADDR3: string;
    paymentNotes: any;
    cust_LOGIN_DATE: any;
    cLevel: any;
    cUST_ACCOUNT_NUM: any;
    DeliveryDirections: string;
    cust_Notes: string;
    customer_Contact: CreateContact;
    proj_contact: string;
    domain?: string;
}

export interface AddUpdateCustomer {
    reC_ID: number;
    cusT_NAME: string;
    cusT_KEY: string;
    cusT_SMAN_KEY: string;
    JOB_SITE_BEEPER3: string;
    cust_status: string;
    cusT_TERMS: string;
    bILL_ADDR1: string;
    bILL_ADDR2: string;
    bILL_ADDR3: string;
    mAIL_ADDR1: string;
    mAIL_ADDR2: string;
    mAIL_ADDR3: string;
    paymentNotes: any;
    cust_LOGIN_DATE: any;
    cLevel: any;
    cUST_ACCOUNT_NUM: any;
    DeliveryDirections: string;
    cust_Notes: string;
    customer_Contact: CreateContact;
    //proj_contact:string;
    domain? : string;
}

export interface UpdateCustomer {
    reC_ID: number;
    cusT_NAME: string;
    cusT_KEY: string;
    cusT_SMAN_KEY: string;
    cust_Active: boolean;
    cust_status: string;
    cusT_TERMS: string;
    bilL_ADDR1: string;
    bilL_ADDR2: string;
    bilL_ADDR3: string;
}

export interface GetSalesRep {
    reC_ID: number;
    smaN_KEY: string;
    smaN_NAME: string;
}

export interface GetTerms {
    reC_ID: number;
    cusT_TERM_CODE: number;
    cusT_TERM_DESC: string;
}

export interface CustomerActivestatus {
    id: number;
    custStatus: string;
}

export interface SalesRep {
    rec_Id: number;
    smaN_KEY: string;
    smaN_NAME: string;
}
export interface GetContacts {
    rec_Id: number;
    cust_Key: string;
    first_Name: string;
    last_Name: string;
    title: string;
    defaults: string;
    email_Address: string;
    office_Mobile: string;
    office_Phone: string;
    addr1: string;
    addr2: string;
    addr3: string;
    office_Fax: string;
    c_comments: string;
}
