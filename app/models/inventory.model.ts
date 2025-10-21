export interface Inventory {
    reC_ID: number;
    ITEM_KEY: string;
    iteM_DESC:string;
    UNIT_COST: number;
    UNIT_PRICE1:number;
    PART_TYPE:string ;
    tlPath : string;
    bfFactor: number;
    supplier: string;
    orderUnit: string,
    orderUnitQty: number,
    palletUnitQty: number,
    layerUnitQty: number,
    qtyOnHand: number,
} 


export interface CreateInventory {
    ITEM_KEY: string;
    ITEM_DESC:string;
    UNIT_COST: number;
    UNIT_PRICE1:number;
    PART_TYPE:string ;
    supplier:string ;
    TLType:string ;
    TLPath:string ;
    bfFactor:number;
    OrderUnit:string ;
    OrderUnitQty:number;
    PalletUnitQty:number;
    LayerUnitQty:number;
    QtyOnHand:number;
    BegInv:number;
    BegInvDate: any;
    SP_order: boolean;
    specialMaterial: boolean;
} 

export interface UpdateInventory {
    REC_ID: number;
    ITEM_KEY: string;
    ITEM_DESC:string;
    UNIT_COST: number;
    UNIT_PRICE1:number;
    PART_TYPE:string ;
    supplier:string ;
    TLType:string ;
    TLPath:string ;
    bfFactor:number;
    OrderUnit:string ;
    OrderUnitQty:number;
    PalletUnitQty:number;
    LayerUnitQty:number;
    QtyOnHand:number;
    BegInv:number;
    BegInvDate: any;
    SP_order: boolean;
    specialMaterial: boolean;
}

export interface GetInventory {
    reC_ID:number;
    iteM_KEY: string;
    iteM_DESC:string;
    uniT_COST: number;
    uniT_PRICE1:number;
    parT_TYPE:string ;
    begInv:number;
    begInvDate:number;
    bfFactor:number;
    layerUnitQty:number;
    orderUnit:string ;
    orderUnitQty:number;
    palletUnitQty:number;
    qtyOnHand:number;
    sP_order:boolean;
    supplier:string ;
    tlPath:string ;
    tlType:string ;
    specialMaterial: boolean;
} 

export interface GetInventoryPriceItems {
    RecID:number;
    PricingCode: string;
    InvItem:string;
    BidPrice: number;
  
} 

export interface GetInventory {
    reC_ID: number;
    iteM_KEY: string;
    iteM_DESC:string;
    UNIT_COST: number;
    UNIT_PRICE1:number;
    PART_TYPE:string ;
    tlPath : string;
    bfFactor: number;
    supplier: string;
    orderUnit: string,
    orderUnitQty: number,
    palletUnitQty: number,
    layerUnitQty: number,
    qtyOnHand: number,
}

export interface InventoryPartType {
    id: number;
    name: string;
    description: string;
    categoryId: number;
    createdByUserId?: number;
    createdAt?: Date;
    updatedByUserId?: number;
    updatedAt?: Date;
    isDeleted: boolean;
    deletedByUserId?: number;
    deletedAt?: Date;
}

//allows category name to be mapped from the category id and displayed in the data grid
export interface InventoryPartTypeDisplay extends InventoryPartType {
    categoryName?: string;
}
  
export interface CreateInventoryPartTypeRequest {
    name: string;
    description: string;
    categoryId: number;
}
  
export interface UpdateInventoryPartTypeRequest {
    id: number;
    name: string;
    description: string;
    categoryId: number;
}

export interface InventoryPartTypeCategory {
    id: number;
    code: string;
    name: string;
    description: string;
    sort: number;
}

export interface UpdateInventoryPartTypeCategoryRequest {
    id: number;
    code: string;
    name: string;
    description: string;
}

export interface CreateInventoryPartTypeCategoryRequest {
    name: string;
    code: string;
    description: string;
}