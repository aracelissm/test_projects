export interface GetPO {
    rec_id: number;
    poNum: string;
    issuer: string;
    poStatus: string;
    vendor_key: string;
    poDate: Date;
    reqDate: Date;
    dept: string;
    purpose: string;
    numLines: number;
    subtotal: number;
    taxRate: number;
    cost: number;
    Total: number;
    recdDate: Date;
    recdBy: string;
    loadNumber: number;
    paidDate: Date;
    vendorInvoiceNum: number;
    shippingDelivery: string;
    location: string;
    locationOrigin: string;
    freightCharge: string;
    shipDate: Date;
    specialOrder: boolean;
    vendorName: string;
    price: number;
    boardFoot: number;
} 

export interface GetPODepartment {
    id: number;
    departmentName: string;


}

export interface GetPOStatus {
    id: number;
    status: string;

}


export interface DuplicateReqestItem {
    ponumber: string;
    dupNumber: number;

}



export interface GetPODetailItem {
    ProductID : number;
     ProductName : string;

    VendorPartNum: string;
    ProductDescription : string;
     UnitPrice : number;

     UnitQtyMultiplier : number;

     POrder: number;
    PieceBdFt : number;
}

export interface CreatePO {
    PoNum: string;
    Issuer: string;
    PoStatus: string;
    Vendor_key: string;
    PoDate: Date;
    ReqDate: Date;
    Dept: string;
    Purpose: string;
    Location: string|null;
    LocationOrigin: string;
    SpecialOrder: Boolean;

}


export interface CreatePODetail {
    Ponum: string;
    item: string;
    I_desc: string;
    QtyOrd : number;
    Price : number;
    PieceCount: number;

    Notes: string;
    BoardFoot: number;


}

export interface CreateHangerOrder {
    Job_Key: string;
    Item_key: string;
    Item_desc: string;
    PONum : string;
    Qty : number;
    HangerBeam: string;
    Plant_Loc: string;
    Ordered: Date;
}


export interface UpdateHangerOrder {
    Rec_id: number;
    Job_Key: string;
    Item_key: string;
    Item_desc: string;
    Qty : number;
}







export interface GetPODetail {
    poNum: string;
    item: string;
    i_desc: string;
    qtyOrd : number;
    price : number;
    pieceCount: number;
     grade: string;
    notes: string;
    boardFoot: number;


}

export interface GetBeamOrderDetail {
    
job_Key: string;
poNum: string;
ordered: Date;
    plant_Loc : string;
    item_key: string;
item_desc: string;
qty: number;
rec_id: number;
receivedDate: Date;


}


export interface GetOrderDetail {
    Job_Key: string;
    PONum: string;
    Ordered: Date;
    Plant_Loc : string;



}

export interface CurrentInfo {

    nextPONumber: string;



}

export interface UpdatePODetail {
    Rec_id: number;
    Ponum: string;
    item: string;
    I_desc: string;
    QtyOrd : number;
    Price : number;
    PieceCount: number;

    Notes: string;
    BoardFoot: number;

}



export interface UpdatePO {
    rec_id: number;
    PoNum: string;
    Issuer: string;
    PoStatus: string;
    Vendor_key: string;
    PoDate: Date;
    ReqDate: Date;
    Dept: string;
    Purpose: string;
    Location: string|null;
    LocationOrigin: string;
    SpecialOrder: Boolean;

}


export interface GetVendor {
    REC_ID: number;
    VEND_KEY: string;
    VEND_NAME: string;
    VEND_Active: boolean;
    
    

}


export interface Sizes
{
  rec_ID : number;
  sizeName: string;
 
}


export interface CreatePOPendingLumber
{

  GeneratedDate: Date;
  Grade: string;
  Size: string;
  Length: number;
  Qty: number;
  PieceCount: number;
  BoardFoot: number;
  TotalPieceCount: number;
  Vendor : string;
  POUser: string;
  UnitCost: number;
  Cost: number;
  Location: string;
}


export interface UpdatePOPendingLumber
{
    Rec_id: number;
  GeneratedDate: Date;
  Grade: string;
  Size: string;
  Length: number;
  Qty: number;
  PieceCount: number;
  BoardFoot: number;
  TotalPieceCount: number;
  Vendor : string;
  POUser: string;
  UnitCost: number;
  Cost: number;
  Location: string;
}


export interface GetPOPendingLumber
{
boardFoot: number;

cost: number;

generatedDate: Date;

grade: string;

length: number;

location: string;

pieceCount: number;

poUser: string;

qty: number;

rec_id: string;

size: string;

totalPieceCount: number;

unitCost: number;

vendor: string;

}

export interface GetPlate
{
    rec_ID: number;
    orderDate: Date;
    recvDate: Date;
    schedDelivery: Date;
    location: string;
    poNum: string;
    reconciled: number;

  
}


export interface CreatePlateOrder
{
   // Rec_id: number;
    orderDate: Date;
   // recvDate: Date;
    schedDelivery: Date;
    location: string;
    poNum: string;
    Reconciled: number;
  
}

export interface GetPlateStatus
{
   id: number;
status: string;
  
}

export interface CreateBeamRequest {
    JobkeyRequest:JobKeyRequest[]
    PONum: string;
    Ordered: Date;
    Plant_Loc : string;
    HangerBeam: string;

}

export interface JobKeyRequest {
    Job_Key: string;
    Rec_id: number;
    masterjob: string;
 
}

export interface UpdateBeamRequest {
    Job_Key: string[];
    PONum: string;
    Ordered: Date;
    Plant_Loc : string;
    Rec_id: number;
    ReceivedDate: Date;
}  
 
export interface UpdatePlateOrder
{
    Rec_id: number;
    orderDate: Date;
   // recvDate: Date;
    schedDelivery: Date;
    location: string;
    poNum: string;
    Reconciled: number;
  
}

export interface UpdateInventoryTrussJob {
  
    JI_QUANT: number;
    JI_ITEM_KEY: string;
    JI_ITEM_DESC: string;

}

export interface GetPlateDetail
{

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
    totalPrice: number;
    boxUnitQuantity: number;


}


export interface CreatePlateDetail
{

    TruckOrderID: number;
    ItemKey: string;
    UnitQty: number;
  
}

export interface CreateBeamPODetail {
    Item_key: string;
    Item_desc: string;
    PONum: string;
    Job_Key : string;
    Qty: number;
   
}

export interface CreateBeamDetailBulk{
    Job_Key: string[];
    Item_key: string;
    Item_desc: string;
    PONum: string;
    Qty: number;
   
}







export interface UpdatePlateDetail
{
    Rec_Id: number;
    TruckOrderID: number;
    ItemKey: string;
    UnitQty: number;
  
}





