export interface SalesRepresentative {
    reC_ID: number;
    smaN_KEY: string | null;
    smaN_NAME: string | null;
    eMail: string | null;
    active: boolean;
    phone: string | null;
    commission: number | null;
    steel_commision: number | null;
    comm_pay: number | null;
    otherComm: number | null;
    division: string | null;
}

export interface GetSales {
    reC_ID: number;
    smaN_NAME: string;
    smaN_KEY: string;
    eMail: string;
    phone: string;
    active: boolean;
    commission: string;
    steel_commision: string;
    comm_pay: number;
    otherComm: string;
    division: string;
}

export interface GetSalesById {
    reC_ID: number;
    smaN_NAME: string;
    smaN_KEY: string;
    eMail: string;
    phone: string;
    active: boolean;
    commission: string;
    steel_commision: string;
    comm_pay: number;
    otherComm: string;
    division: string;
}

export interface CreateSales {
    smaN_NAME: string;
    smaN_KEY: string;
    eMail: string;
    phone: string;
    active: boolean;
    commission: string;
    steel_commision: string;
    comm_pay: number;
    otherComm: string;
    division: string;
}

export interface UpdateSales {
    reC_ID: number;
    smaN_NAME: string;
    smaN_KEY: string;
    eMail: string;
    phone: string;
    active: boolean;
    commission: string;
    steel_commision: string;
    comm_pay: number;
    otherComm: string;
    division: string;
}

export interface SalesActive {
    id: number;
    active: boolean;
}
