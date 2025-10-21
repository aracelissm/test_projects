export interface LumberSize {
    rec_ID: number;
    sizeName: string | null;
    width: number | null;
    depth: number | null;
    bdFtFactor: number | null;
    nominalA: number | null;
    nominalB: number | null;
    itemKeyCode: string | null;
}

export interface CreateLumberSizeRequest {
    sizeName: string;
    width: number | null;
    depth: number | null;
    bdFtFactor: number | null;
    nominalA: number | null;
    nominalB: number | null;
    itemKeyCode: string | null;
    //#region Additional Properties
    currentDateTime: Date | string;
    //#endregion
}

export interface UpdateLumberSizeRequest {
    rec_ID: number;
    sizeName: string;
    width: number | null;
    depth: number | null;
    bdFtFactor: number | null;
    nominalA: number | null;
    nominalB: number | null;
    itemKeyCode: string | null;
    //#region Additional Properties
    currentDateTime: Date | string;
    //#endregion
}
