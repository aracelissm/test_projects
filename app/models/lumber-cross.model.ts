export interface LumberCross {
    recId: number;
    // NOTE: This property is being used to identify the Lumber Grade Names from Acumatica
    gradeName: string | null;
    sizeName: string | null;
    // NOTE: This property is being used to identify the Lumber Grade Names in Viper(Internal Use)
    crossGrade: string | null;
    invExt: string | null;
    location: string | null;
}

export interface CreateLumberCrossRequest {
    gradeName: string;
    sizeName: string;
    crossGrade: string;
    invExt: string | null;
    location: string | null;
    //#region Additional Properties
    currentDateTime: Date | string;
    //#endregion
}

export interface UpdateLumberCrossRequest {
    recId: number;
    gradeName: string;
    sizeName: string;
    crossGrade: string;
    invExt: string | null;
    location: string | null;
    //#region Additional Properties
    currentDateTime: Date | string;
    //#endregion
}
