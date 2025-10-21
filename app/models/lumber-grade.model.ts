export interface LumberGrade {
    rec_ID: number;
    gradeName: string | null;
    itemKeyCode: string | null;
    specialMaterial: boolean;
}

export interface CreateLumberGradeRequest {
    gradeName: string;
    itemKeyCode: string | null;
    specialMaterial: boolean;
    //#region Additional Properties
    currentDateTime: Date | string;
    //#endregion
}

export interface UpdateLumberGradeRequest {
    rec_ID: number;
    gradeName: string;
    itemKeyCode: string | null;
    specialMaterial: boolean;
    //#region Additional Properties
    currentDateTime: Date | string;
    //#endregion
}
