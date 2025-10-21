export interface CreateContact {
    cust_Key: string;
    first_Name: string;
    last_Name: string;
    title: string;
    defaults: string;
    email_Address: string;
    office_Mobile: string;
    office_Phone: string;
    office_Fax: string;
    addr1: string;
    addr2: string;
    addr3: string;
    c_comments: string;
}
export interface createBidContact {
    rec_Id: number;
    cust_Key: string;
    first_Name: string;
    last_Name: string;
    title: string;
    defaults: string;
    email_Address: string;
    office_Mobile: string;
    office_Phone: string;
    office_Fax: string;
    addr1: string;
    addr2: string;
    addr3: string;
    c_comments: string;
}
export interface UpdateContact {
    rec_Id: number;
    cust_Key: string;
    first_Name: string;
    last_Name: string;
    title: string;
    defaults: string;
    email_Address: string;
    office_Mobile: string;
    office_Phone: string;
    office_Fax: string;
    addr1: string;
    addr2: string;
    addr3: string;
    c_comments: string;
}

export interface GetAllContacts {
    rec_Id: number;
    cust_Key: string;
    first_Name: string;
    last_Name: string;
    title: string;
    defaults: string;
    default_Contacts: string[];
    email_Address: string;
    office_Mobile: string;
    office_Phone: string;
    addr1: string;
    addr2: string;
    addr3: string;
    office_Fax: string;
    c_comments: string;
}
export interface DefaultContact {
    id: number;
    defaultBid: string;
}
export interface GetCustomerForKey {
    reC_ID: number;
    cusT_NAME: string;
    cusT_KEY: string;
}

export interface CreateContact {
    // cust_Key: string;
    first_Name: string;
    last_Name: string;
    title: string;
    defaults: string;
    email_Address: string;
    office_Mobile: string;
    office_Phone: string;
    office_Fax: string;
    addr1: string;
    addr2: string;
    addr3: string;
    c_comments: string;
}

export interface UpdateContact {
    rec_Id: number;
    // cust_Key: string;
    first_Name: string;
    last_Name: string;
    title: string;
    defaults: string;
    email_Address: string;
    office_Mobile: string;
    office_Phone: string;
    office_Fax: string;
    addr1: string;
    addr2: string;
    addr3: string;
    c_comments: string;
}
export interface DefaultContact {
    id: number;
    defaults: string;
}
export interface GetCustomerForKey {
    reC_ID: number;
    cusT_NAME: string;
    cusT_KEY: string;
}
