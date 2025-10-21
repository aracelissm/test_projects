export interface LbrAvail {
    recId: number;
    sizename: string | null;
    gradename: string | null;
    availlengths: string | null;
    lumberInv: string | null;
    lbrprefix: string | null;
    lbrsuffix: string | null;
    alsinv: string | null;
    alsmaxLen: number | null;
    location: string | null;
}

export interface CreateLbrAvailRequest {
    sizename: string;
    gradename: string;
    availlengths: string | null;
    lumberInv: string | null;
    lbrprefix: string | null;
    lbrsuffix: string | null;
    alsinv: string | null;
    alsmaxLen: number | null;
    location: string | null;
    //#region Additional Properties
    currentDateTime: Date | string;
    //#endregion
}

export interface UpdateLbrAvailRequest {
    recId: number;
    sizename: string;
    gradename: string;
    availlengths: string | null;
    lumberInv: string | null;
    lbrprefix: string | null;
    lbrsuffix: string | null;
    alsinv: string | null;
    alsmaxLen: number | null;
    location: string | null;
    //#region Additional Properties
    currentDateTime: Date | string;
    //#endregion
}
