export interface PCInfo {
    wodetailId: number;
    woid: number | null;
    piJobkey: string | null;
    piTag: string | null;
    piLabel: string | null;
    piEstSetup: number | null;
    piEstCut: number | null;
    piActSetup: number | null;
    piActCut: number | null;
    piQty: number | null;
    piDate: string | null;
    piSawName: string | null;
    piMark: string | null;
    piActProdDate: string | null;
    piActProdTime: string | null;
    piTime: string | null;
    qtyCut: number | null;
    pieceNum: number | null;
    pieceType: number | null;
    size: number | null;
    sizeName: string | null;
    gradeNum: number | null;
    gradeName: string | null;
    nominalLength: number | null;
    overallLength: number | null;
    centerLength: number | null;
    topLength: number | null;
    botLength: number | null;
    boardFt: number | null;
    numPoints: number | null;
    numCutsLeft: number | null;
    numCutsRight: number | null;
    trussOrder: number | null;
    setupNumber: number | null;
    pieceCutOrder: number | null;
    dupFlag: number | null;
    trussDesc: string | null;
    bevels: string | null;
    ltopAngle: number | null;
    lbotAngle: number | null;
    rtopAngle: number | null;
    rbotAngle: number | null;
    rCodes: string | null;
    fqty1: number | null;
    flen1: number | null;
    fqty2: number | null;
    flen2: number | null;
    costCodes: string | null;
    costLbr1: string | null;
    costVal: number | null;
    costLbr2: string | null;
    costBdft: number | null;
    costBdft2: number | null;
    ffqty1: number | null;
    fflen1: number | null;
    ffqty2: number | null;
    fflen2: number | null;
    fCodes: string | null;
    ffCodes: string | null;
    stop: string | null;
    materialId: string | null;
    planviewPoints: string | null;
    elevationPoints: string | null;
    //Anonymous Data
    isPieceCut: boolean;
    qtyLeftToCut: number;
}

export interface PCInfoAggregates {
    /**
     * Sum of quantities left to cut for the records in the dbo.PCINFO table that are either partially cut or not yet cut
     */
    noOfPiecesLeft: number;
    /**
     * Total no. of records in the dbo.PCINFO table that are either partially cut or not yet cut
     */
    noOfCutsLeft: number;
}
