export interface TRInfo {
    wodetailId: number;
    woid: number | null;
    buildOrder: number | null;
    tag: string;
    qty: number | null;
    trussDesc: string | null;
    tableName: string | null;
    estSetup: number | null;
    estAssemble: number | null;
    actSetup: number | null;
    actAssemble: number | null;
    actualStart: string | null;
    actualSetupStop: string | null;
    actualBuildStart: string | null;
    actualStop: string | null;
    oaspan: number | null;
    trussType: string | null;
    numPieces: number | null;
    numBoardFeet: number | null;
    numLinealFeet: number | null;
    built: number | null;
    rCodes: string | null;
    height: number | null;
    isStarted:boolean;
    isPieceCut:boolean

}

export interface TRInfoAggregates{
     noOfPiecesLeft: number;
     noOfCutsLeft:number;
}

export interface ProcessTrussItem {
    fileName: string;
    tag: string;
    trussDesc: string;
    bAlpine: boolean;
}