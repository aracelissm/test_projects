export interface CountySurtax {
    rec_ID: number;
    county: string | null;
    surtaxRate: number | null;
    jobLocationCode: string | undefined;
    region: string | undefined;
    effectiveYear: number | null;
    state: string | null;
}

export interface CreateCountySurtax {
    county: string | null;
    surtaxRate: number | null;
    jobLocationCode: string | undefined;
    region: string | undefined;
    effectiveYear: number | null;
    state: string | null;
}

export interface GetCountySurtaxesRequest {
    state?: string | null;
    county?: string | null;
    effectiveYear?: number | null;
}

export interface GetCountySurtaxesByCountyRequest {
    county?: string | null;
}


export interface GetStatesRequest {
    state?: string | null;
}

export interface CountySurtaxDelivery
{
    Id : number;
    LocationId: number;
    CountySurtaxId: number;
    Delivery: number;
    Distance: number;
    DriveTime: number;
}
