export interface POType{
    id: number,
    type: string;
}
export interface POStatus{
    id: number,
    status: string;
}
export interface LumberPendingReceived{
  rec_id: number,
  received: Date | number | string,
  grade: string,
  size: string,
  length: string,
  unit: number ,
  pieceCount: number,
  boardFoot: number,
 // totalPiecesCount: number,
  vendor: string,
 receivingUser: string,
  aOneGrade: string|null,
 // rfidCode_id: number,
  unitCost: number,
  poNum: string,
  poType: string,
  location: string,
  item: string,
  product: string
}

export interface LoadNumber{
  rec_id: number,
    loadNumber: string,
    year: number,
    truckNumber: number,
    month : number,
    location : string;
    totalBunks : number
}
export interface GetLumberPendingReceived{
 rec_id: number,
   received: Date,
   grade: string,
   size: string,
   length: string,
   unit: number,
   pieceCount: number,
   boardFoot: number,
   totalPiecesCount: number,
   vendor: string,
  receivingUser: string,
   aOneGrade: string|null,
   rfidCode_id: number,
   unitCost: number,
   poNum: string,
   poType: string,
  // location: string,
   thickness:number,
   width : number,
   item: string,
   product: string
 }
 export interface UpdateLumberPendingReceived{
  rec_id: 0,
 received: Date | number | string,
 grade: string,
 size: string,
 length: string,
 unit: number,
 pieceCount: number,
 boardFoot: number,
 //totalPiecesCount: number,
 vendor: string,
receivingUser: string,
 aOneGrade: string|null,
// rfidCode_id: number,
 unitCost: number,
 poNum: string,
 poType: string,
 location: string,
 item: string,
  product: string
}
export interface GetPendingLumbers{
  rec_id: number,
    length?: number,
    totalPiecesCount?: number,
            grade?: string,
            aOneGrade?: string,
            rfidCode_id?: string,
            unitCost?: number,
            qtyOrd?: number,
            item?: string,
            notes?: string,
            inventorySize?: number,
            inventoryPieceCount?: number,
            inventoryBoardFoot?: number,
            inventorySupplier?: number,
            lumberPoNum : string;
            recordType: string;
            cost: number;
            thickness?: number,
            width?: number,
  }

  export interface GetVendorDetails {
    reC_ID: number;
    venD_KEY: string;
    venD_NAME: string;
    venD_Active: boolean;
}

export interface updatePOStatus {
  rec_id: number;
  poStatus: string;
  loadNumber : string;
}

export interface receiveAdmin {
  id: number,
  userId: number
}

export interface RFIDCode{
  rec_id: number;
  data: string | null;
  dateCreated: Date;
  length: number;
  pieceCount: number;
  bunk: number;
  boardFoot : number;
  size_id : number;
  grade_id : number;
  vendor_id : number;
  loadNumber_id : number;
  poNum : string;
  itemKey : string;
  location: string;  
}
 export interface RFIDCodePendingLumber{
  // size_id : number;
  // grade_id : number;
  // vendor_id : number;
  loadNumber_id : number | undefined;
  location: string ; 
}

export interface MoveToInventoryParams{
  Loc:string | null;
  LoadNum : string | null;
  row : number[];
}
export interface GetPODetail {
  rec_id: number,
  poNum: string;
  itemSource: string,
  item: string,
  i_desc: string,
  qtyOrd: number,
  ordUOM: number,
  price: number,
  recUOM: string,
  stkUOM: string,
  qtyRec: string,
  notes: string,
  pieceCount: number,
  boardFoot: number,
  receivedDate: Date | null,
  rfidCode_id: number,
  postTreatmentRFIDCode_id: number,
  location: number,
  thickness: number,
  width: number,
  length: number
}

export interface PODetailUpdate {
  rec_id: number;
  pieceCount: number,
  boardFoot: number,
  qtyOrd: number,
  price: number,
  i_desc : string;
  item: string;
}
export interface ItemBreakDown{
  rec_id: number,
  item: string,
  size: string,
  sizeThickness: number,
  sizeWidth: number,
  length: number,
  grade: string
}
 export interface GetRFIDCode{
  rec_id: number;
  data: string;
  dateCreated: Date;
  length: number;
  pieceCount: number;
  bunk: number;
  boardFoot : number;
  size : string;
  grade : string;
  vendor : string;
  loadNumber : string;
  poNum : string;
  itemKey : string;
  location: string;  
 }
 export interface CreateRFIDRequest {
  PendingLumber: GetLumberPendingReceived[];
  Quantity: number | undefined;
  Model: RFIDCodePendingLumber;
}

export interface UpdatePODetailDate{
  receivedDate: Date | null,
}

export interface UpdatePendingDate{
  received: Date,
}
