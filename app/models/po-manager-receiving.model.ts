export interface PendingTruckLoad{
    truckOrderID: number;
    itemKey: string;
    unitQty: number;
    orderUnitQty: number;
    palletUnitQty: number;
    supplierPart: string;
    itemDesc: string;
    bfFactor: number;
    lbs: number;
    pricePerPound: number;
    palletPrice: number;
    plateType : string;
}

export interface CreatePendingTruckLoad{
    rec_ID: number,
    itemKey: string,
    pendingOrderQty: number,
    unitsToOrder: number,
    location: string,
    poNum : string;
    orderUnitsPerPallet : number;
}

export interface utilizedPlates{
    utilizedPlatesId: number,
    woDetailID: number,
    woid: number | null,
    qty: number,
    plateName: string,
    userName: string | null,
    location: string,
    poNum: string,
    rcvdDate: Date | null | string,
    pcs_Per_unit: number,
    porder: number
}

export interface updatePlateStatus {
    rec_ID: number,
    reconciled: number
}

export interface InventoryExtension{
    id: number,
    inventoryID: number,
    plateName: string,
   // locationId: number,
    //vendorId: number,
   // vendorItemCode: string,
    pcsByUnit: number,
    lbsByUnit: number,
    unitsByLayer: number,
    unitsByPallet: number,
   // lbsByPallet: number,
   // priceByUnit: number,
    //priceByPcs: number,
    unitsOnHand: number,
    minimum: number,
    Location : string,
    Vendor: string,
    ponum : string
}

export interface GetPendingPlate
{
    rec_ID: number;
    itemKey: string;
    unitQty: number;
    orderUnitQty: number;
    palletUnitQty: number;
    supplierPart: string;
    itemDesc: string;
    bfFactor: number;
    lbs: number;
    pricePerPound: number;
    palletPrice: number;
}