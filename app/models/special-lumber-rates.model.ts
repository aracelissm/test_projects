export interface LumberOverheadUpdateValue {
    id: number;
    updateType: string;
    bidCost_Increment: number;
    bidCost_T_Increment: number;
    avgMBFCost_Increment: number;
}

export interface CreateLumberOverheadUpdateValueRequest {
    updateType: string;
    bidCost_Increment: number;
    bidCost_T_Increment: number;
    avgMBFCost_Increment: number;
}

export interface LumberOverheadUpdateMap {
    id: number;
    baseItem: string;
    updatedItem: string;
    updateParameter: number;
}

export interface CreateUpdateLumberOverheadUpdateMapUnderUpdateTypeDialogData {
    lumberOverheadUpdateValue: LumberOverheadUpdateValue;
    lumberOverheadUpdateMapId?: number;
}

export interface CreateLumberOverheadUpdateMapRequest {
    baseItem: string;
    updatedItem: string;
    updateParameter: number;
    currentDateTime: string;
}

export interface UpdateLumberOverheadUpdateMapRequest extends LumberOverheadUpdateMap {
    //#region Additional Properties
    currentDateTime: Date | string;
    //#endregion
}
