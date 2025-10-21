export interface PlateStation {
    qty: string;
    plateName: string;
    utilizedPlates: number;
    wodid: number;
    locationId: number;
    plateFetchNoteId:number;
}

export interface PlateStationAdd {
    qty: string;
    plateName: string;
    utilizedPlates: number;
    wodid: number;
    locationId: number;
    plateFetchNoteId:number;
    actualStart : Date;
    actualStop : Date;
    plateFetchComplete: boolean;
}

export interface RevertToFetchPlateRequest {
    woid:number;
}
export interface PlateStationCreate {
    qty: string;
    plateName: string;
    woid: number;
    locationId: number;
    plateFetchNoteId:number;
}
export interface PlateDone {
    woId: number;
    locationId: number;
}

export interface FetchPlateCompletedOrNotRequest {
    woid: number;
    utilizedPlatesId: number;
    completed: boolean;
}