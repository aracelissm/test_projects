export interface SalesNoteType {
    recId: number;
    locationID: number;
    name: string;
    descr: string;
    isActive: boolean;
    isDeleted: boolean;
    sort: number;
}

export interface CreateSalesNoteType {
    locationID: number;
    name: string;
    descr: string;
    isActive: boolean;
    sort: number;
}

export interface GetSalesNoteTypesByNameRequest {
    locationId: number;
    SalesNoteType?: string | null;
    limit?: number | null;
}
