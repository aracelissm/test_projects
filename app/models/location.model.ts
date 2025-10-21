export interface Location {
    locationId: number;
    locationName: string | null;
    shiftsUsed: boolean;
    workType: number;
    nextBidNumber: number | null;
    nextOrderNumber: number | null;
    nextCustomerNumber: any | null;
    activeShiftDayId: number | null;
    nextEwonumber: number | null;
    nextPonumber: any | null;
    permitEarlyClockOut: any | null;
    stateID: number | null;
    address1: string | null;
    address2: string | null;
    city: string | null;
    zip: string | null;
    contactNumber: number | null;
    website: string | null;
    email: string | null;
    formalName: string | null;
    permissionCode: string | null;
    faxNumber:string|null;
    sort:number;
}

export interface GetLocationsRequest {
    locationName?: string | null;
    limit?: number | null;
}

export interface GetShopLocationsRequest {
    locationName?: string | null;
    limit?: number | null;
}

