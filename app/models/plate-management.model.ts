export interface PlateManagement{
    id: number,
    inventoryID: number,
    plateName: string | null,
    locationId: number,
    vendorId: number,
    vendorItemCode: string | null,
    pcsByUnit: number | null,
    lbsByUnit: number | null,
    unitsByLayer: number | null,
    unitsByPallet: number | null,
    lbsByPallet: number | null,
    priceByUnit: number | null,
    priceByPcs: number | null,
    unitsOnHand: number,
    minimum: number,
    location: null,
    vendor: null
}

export interface PlatePurchaseOrderReceiveResponse{
    reconciledStatus: number
}

export interface PlatePurchaseOrderUnreceiveResponse{
    reconciledStatus: number
}

export interface PlateLedgerAdjustment{
    inventoryId :number, 
    unitsOnHand : number,
    locationId: number
}

export interface PlateLedgerReceivePurchaseOrder{
    poNum: string
}

export interface PlateLedgerUnreceivePurchaseOrder{
    poNum: string
}

export interface PlateLedgerHistory{
    plateLedgerId: number;
    dateAdjustment: Date;
    ledgerByUserId: number;
    ledgerByUserEmail: string;
    bAdjustment: boolean;
    inventoryId: number;
    plateName: string;
    locationId: number;
    typeCode: string;
    qty: number;
    qtySet: number;
    jobKey: string | null;
    jobMark: string | null;
    poNum: string | null;
    woid: number | null;
    woDetailID: number | null;
    device: string | null;
    dateAdded: Date;
    unitsOnHandBefore: number;
    unitsOnHandAfter: number;
    dateCalculated: Date;
}

export interface PlateChangeLog{
    reC_ID: number,
    dataTableName: string | null,
    changeDate: Date | null | string,
    changes: string,
    plateFetchLogID: number | null,
    woDetailID: number | null,
    requestedItemFrom: string | null,
    pickedItemTo: string | null,
    requestedQTYFrom: number | null,
    pickedQTYTo: number | null,
    poNum: string|null,
    itemKey: string | null,
    type: string | null,
    from: string|null,
    to: string|null
}

export interface GetOpenPlates{
    rec_ID: number;
    poNum: string;
    itemKey: string;
    orderDate: Date | null | string,
    recvDate: Date | null | string,
    reconciled: number,
    schedDelivery:  Date | null | string,
    location: string
}

export interface PlateList {
    recId: number;
    locationID: number | null; 
    name: string;
    width: number;
    length: number;
    widthInch: number | null;
    lengthInch: number | null;
    sort: number | null;
}

export interface CreatePlateListRequest {
    name: string;
    width: number;
    length: number;
    widthInch: number | null;
    lengthInch: number | null;
}

export interface UpdatePlateListRequest {
    recId: number;
    name: string;
    width: number;
    length: number;
    widthInch: number | null;
    lengthInch: number | null;
}
