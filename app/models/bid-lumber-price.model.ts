import { EMBFUpdationType } from '../enums/price-level';

export interface LevelList {
    recId: number;
    location:string;
    levelKey: string | null;
    levelComment: string | null;
    createDate: string | null;
    createdBy: string | null;
    restricted: boolean;
    isCurrent: boolean;
    lastMod: string | null;
    locked: boolean;
    tableRate: number | null;
    tableSupport: number | null;
    tableFsupport: number | null;
    sawRate: number | null;
    sawSupport: number | null;
    waveCost: number | null;
    wavePrice: number | null;
    hsCost: number | null;
    hsPrice: number | null;
    truloxCost: number | null;
    truloxPrice: number | null;
    g90Cost: number | null;
    g90Price: number | null;
    g185Cost: number | null;
    g185Price: number | null;
    ssCost: number | null;
    ssPrice: number | null;
    indirectLabor: number | null;
    customerIndexPrice: number;
    surchargeFee: number;
}

export interface UpdateLevelListRequest {
    recId: number;
    //#region General Details
    levelKey: string;
    levelComment: string | null;
    //#endregion
    //#region Labor Details
    tableRate: number | null;
    tableSupport: number | null;
    sawRate: number | null;
    sawSupport: number | null;
    indirectLabor: number | null;
    //#endregion
    //#region Price Details
    customerIndexPrice: number;
    surchargeFee: number;
    waveCost: number | null;
    wavePrice: number | null;
    hsCost: number | null;
    hsPrice: number | null;
    truloxCost: number | null;
    truloxPrice: number | null;
    g90Cost: number | null;
    g90Price: number | null;
    g185Cost: number | null;
    g185Price: number | null;
    ssCost: number | null;
    ssPrice: number | null;
    //#endregion
    //#region Additional Properties
    currentDateTime: Date | string;
    //#endregion
}

export interface SetBidLumberPriceCodeAsActiveRequest {
    currentDateTime: Date | string;
}

export interface PriceLevel {
    recId: number;
    pLevel: string | null;
    item: string | null;
    iDisplay: string | null;
    iDesc: string | null;
    iGroup: string | null;
    iSection: string | null;
    stkuom: string | null;
    recuom: string | null;
    stk2rec: number;
    mbfthick: number;
    mbfwidth: number;
    sizeName: string | null;
    gradeName: string | null;
    mbflen: number;
    mbf: number;
    onhand: number;
    mbfoh: number;
    avgcost: number;
    avgcostmbf: number;
    valueOh: number;
    porder: number;
    adjust: number;
    mtdbdft: number;
    mtdcost: number;
    vipercost: number;
    bdftused: number;
    lastcost: number;
    bidcost: number;
    avgcostTmbf: number;
    bidcostT: number;
    spclCost: number;
    bidLengths: string | null;
    lumberOverheadUpdateMapRecId?: number | null;
    isTreatedLumber?: boolean | null;
    isSpecialLumberRateCalcValidForUpdatedItem?: boolean | null;
}

export interface PendingBidPrice {
    recId: number;
    priceCode: string | null;
    item: string | null;
    bidPrice: number | null;
    bidType: string | null;
    username: string | null;
    description: string | null;
}

export interface BidLevel {
    recId: number;
    pLevel: string | null;
    jobTypeCode: string | null;
    jobTypeDesc: string | null;
    overhead: number;
    profit: number;
    porder: number;
    laborOverhead: number;
}

export interface GetPreDataToCreateNewBidLumberPriceCodeResponse {
    generatedPriceCode: string;
    activeBidLumberPriceCode: string;
    pendingBidLumberPricesForGeneratedPriceCode: PendingBidPrice[];
}

export interface PublishNewBidLumberPriceCodeRequest {
    priceCode: string;
    location: string;
    //#region Additional Properties
    currentDateTime: Date | string;
    //#endregion
}

export interface UpdateActiveBidLumberPricesComponentDialogData {
    activeBidLumberPriceCode: string;
}

export interface UpdateMbfRequest {
    priceLevelIds: number[];
    updatedMbf: number;
}

export interface BulkUpdatePriceLevelsRequest {
    levelListRecId: number;
    priceLevelRecIds: number[];
    mBFUpdationType: EMBFUpdationType;
    newMbf: number;
    currentDateTime: Date | string;
}

export interface BulkUpdatePriceLevelsDialogData {
    levelListRecId: number;
    priceLevelRecIds: number[];
}

export interface CreatePriceLevelRequest {
    pLevel: string;
    item: string;
    iDisplay: string;
    bidcostT: number;
    mbflen: number;
    gradeName: string;
    sizeName: string;
    mbfwidth: number;
    mbfthick: number;
    addToLumberInventory: boolean;
    levelListRecId: number;
    currentDateTime: Date | string;
}

export interface DeletePriceLevelRequest {
    levelListRecId: number;
    currentDateTime: Date | string;
}

export interface EditBidLevelsDialogData {
    levelList: LevelList;
}

export interface UpdateBidLevelRequest {
    recId: number;
    overhead: number;
    profit: number;
    laborOverhead: number;
    levelListRecId: number;
    currentDateTime: Date | string;
}

export interface CreateBidLevelRequest {
    pLevel: string | null;
    jobTypeCode: string | null;
    jobTypeDesc: string | null;
    overhead: number;
    profit: number;
    porder: number;
    laborOverhead: number;
    levelListRecId: number;
    currentDateTime: string;
}

export interface DeleteBidLevelRequest {
    levelListRecId: number;
    currentDateTime: string;
}

export interface CreatePriceLevelUnderPriceCodeDialogData {
    levelList: LevelList;
}

export interface CreateBidLevelUnderPriceCodeDialogData {
    levelList: LevelList;
}

export interface ApplySpecialLumberRatesToTreatedLumbersDialogData {
    levelListRecId?: number;
    lumberOverheadUpdateMapRecIds: number[];
}

export interface GetPreDataToApplySpecialLumberRatesToTreatedLumbersRequest {
    levelListRecId: number;
    lumberOverheadUpdateMapRecIds: string;
    // lumberOverheadUpdateMapRecIds: number[];
}

export interface GetPreDataToApplySpecialLumberRatesToTreatedLumbersResponse {
    lumberOverheadUpdateMapRecId: number;
    baseItem: PriceLevel;
    updatedItem: PriceLevel;
    isSpecialLumberRateCalcValidForUpdatedItemBidcost: boolean;
    isSpecialLumberRateCalcValidForUpdatedItemBidcostT: boolean;
}

export interface ApplySpecialLumberRatesToTreatedLumbersRequest {
    levelListRecId: number;
    lumberOverheadUpdateMapRecIds: string;
    currentDateTime: string;
}
