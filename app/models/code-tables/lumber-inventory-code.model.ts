export interface LumberInventoryCode {
    rec_id: number;
    item: string;
    i_desc: string;
    i_display: string;
    stkuom: string;
    recUom: string;
    mbfThick: number;
    mbfWidth: number;
    mbfLen: number;
    mbf: number;
    onHand: number;
    mbfOh: number;
    avgCost: number;
    avgCostMbf: number;
    value_oh: number;
    pOrder: number;
    onOrder: number;
    bfOrdered: number;
    valueOrdered: number;
    lastCost: number;
    defpcsperbdl: number;
    usage_1mo: number;
    usage_2mo: number;
    usage_3mo: number;
    usage_Last120: number;
    forecasterUse: number;
    grade_Name:string;
}

export interface CreateLumberInventoryCode {
    item: string;
    i_desc: string;
    i_display: string;
    stkuom: string;
    recUom: string;
    mbfThick: number;
    mbfWidth: number;
    mbfLen: number;
    mbf: number;
    onHand: number;
    mbfOh: number;
    avgCost: number;
    avgCostMbf: number;
    value_oh: number;
    pOrder: number;
    onOrder: number;
    bfOrdered: number;
    valueOrdered: number;
    lastCost: number;
    defpcsperbdl: number;
    usage_1mo: number;
    usage_2mo: number;
    usage_3mo: number;
    usage_Last120: number;
    forecasterUse: number;
    grade_Name:string;
}
