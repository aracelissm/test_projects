export interface BidCostBreakoutTable {
    bidCostBreakoutId: number;
    dateAdded: Date;
    duration: string;
    type: string;
    userName: string;
    jobItemsFilterMark: string;
    batchQty: number;
    printDetail: boolean;
    plateDetail: boolean;
    lumberDetail: boolean;
    updateBidPrice: boolean;
    roofFloor: string;
    jobType: string;
    bidEng: string;
    lumberPriceCode: string;
    excludeStdStuds: boolean;
    excludeTopPlatePieces: boolean;
    sellTotal: number;
    gm: number;
  }


  export const PriceTrussErrorType = {
        MissingPlateListData: 1,
        UserBatchingError: 2,
        MissingFileOrDrive: 3,
        Exception: 4,
        Message: 5,
        Warning: 6,
        MissingCountyData: 7

};
