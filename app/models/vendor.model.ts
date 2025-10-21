export interface CreateVendor {

    VEND_KEY: string;
    VEND_NAME: string;
    Address : string;
    City: string;
    StateOrProvince: string;
    PostalCode: string;
    PHONE1: string;
    VEND_NOTES: string;
    emailaddress: string;
    VEND_Active: boolean;
    CONTACT: string;
}


export interface GetVendor {
    reC_ID: Number;
    venD_KEY: string;
    venD_NAME: string;
    address : string;
    city: string;
    stateOrProvince: string;
    postalCode: string;
    phonE1: string;
    venD_NOTES: string;   
  emailaddress: string;
  venD_Active: boolean;
  contact: string;
}
