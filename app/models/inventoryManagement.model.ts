/*export interface Timeline {
  locationId: number;
  location: string;
  partType: string;
  items: Item[];
}*/

export interface Item {
  itemKey: string;
  itemName: string;
  initialExistence: number;
  initialDate: Date;
  days: Day[];
  children: Item[];
}

export interface Day {
  number: number;
  date: Date;
  grossExistence: number;
  consumption: number;
  netExistence: number;
  minimum: number;
}

export interface Location {
  locationId: number;
  locationName: string;
}

export interface Material {
  rEC_ID: number;
  iTEM_KEY: string;
  iTEM_DESC: string;
  item: string;
}

export interface MaterialForPO {
  rec_Id: number;
  item_Key: string;
  item_Desc: string;
  item: string;
  tLPath: string;
  supplier: string;
  orderUnitQty: number;
  palletUnitQty: number;
  layerUnitQty: number;
  qtyOnHand: number;
  minimum: number;
  vendorId: number;
  vendorItemCode: string;
  pcsByUnit: number;
  lbsByUnit: number;
  unitsByLayer: number;
  unitsByPallet: number;
  lbsByPallet: number;
  unitsOnHand: number;
  units: number;
  pallets: number;
  weight: number;
  pcs: number;
  recommended: boolean;
  selected: boolean;
  priceByPcs: number;
  priceByBox: number;
  price: number;
  location: string;
}

export interface History {
  year: number;
  month: number;
  name: string;
  tLPath: string;
  itemKey: string;
  totalPurchased: number;
  value: number;
}

export interface PO {
  poNumber: number;
}

export interface TimelineQuery {
  numDays: number;
  locationCode: string;
  includePo: boolean;
}

export interface MaterialsQuery {
  location: string;
}

export interface MaterialsRecommendationQuery {
  location: string;
  numDays: number;
}

export interface HistoryQuery {
  location: string;
  itemCode: string;
}
