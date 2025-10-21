export interface LumberMaterial {
    recId: number;
    jobKey: string;
    itemId: number;
    sizeName: string;
    gradeName: string;
    nomLen: number;
    qty: number;
    bdFt: number;
    fgcolor: string;
}

export interface PlateMaterial {
    recId: number;
    jobKey: string;
    itemId: number;
    name: string;
    type: number;
    qty: number;
    sqIn: number;
}