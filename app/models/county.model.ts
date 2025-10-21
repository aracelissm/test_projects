export interface County {
    id: number;
    name: string | null;
    stateId: string | null;
}

export interface CountyRequest {
    stateName: string | null;
}


