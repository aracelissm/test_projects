export interface Lumber {
     RecId : number;
     Location : string;
     Status: string;
     LoadNumber : string;
    Bunk : number;
     Year : number;
    Month: number;
    TruckNumber: number;
    Scanner : string;
    GradeName: string;
    SizeName: string; 
   NominalA : number;
    NominalB : number;
  PieceCount : number;
     Length : number;
   BoardFoot: number; 
  Vendor: string;
   PONum: string; 
   ItemKey: string; 
   MBF: number;
  ScannerModel: string;
}


export interface LumberOptions
{
  id: number;
  value: string;
}



export interface MovetoInventoryBulk
{
   date : Date;
  PieceCount : number;
  Length: number; 
  Size_id : number;
  Grade_id : number;
  Vendor_id : number;
 RFIDCode_id  : number;
  Location: string; 
  id: number;
}

export interface MovetoProductionBulk
{
   DateScanned : Date;
  PieceCount : number;
  Length: number; 
  Size_id : number;
  Grade_id : number;
  Vendor_id : number;
 RFIDCode_id  : number;
  Location: string; 
  id: number;
}



export interface GetProduction
{
  dateScanned  : Date;
  pieceCount: number;
  length: number; 
  size_id : number;
  grade_id : number;
  vendor_id : number;
  rfidCode_id  : number;
  location: string; 
}

export interface GetInventory
{
  date  : Date;
  pieceCount: number;
  length: number; 
  size_id : number;
  grade_id : number;
  vendor_id : number;
  rfidCode_id  : number;
  location: string; 
}


export interface GetEditlumber
{
  loadNumber  : number;
  date: Date;
  location:string;
  poNum: number;
  size : number;
  length : number;
  grade : number;
  pieceCount: number;
  boardFoot: number;
  sizeName:string;
  gradeName:string;
  vendorName:string;
  vendor: number;
  bunk: number;
  rfidCode: number;



 
}


export interface UpdateLumber
{
  
    rfidCode:number,
    loadNumber: number,
    date: Date,
    location: string,
    poNum: number,
    size: number,
    length: number,
    grade: number,
    vendor: number,
    pieceCount: number,
    boardFoot: number,
    
  }


 


export interface LumberSizes
{
  rec_ID : number;
  sizeName: string;
 
}

export interface LumberGrades
{
  rec_ID : number;
  gradeName: string;
 
}

export interface Location
{
  locationId : number;
  locationName: string;
 
}

export interface LumberVendor
{
  reC_ID : number;
  venD_KEY: string;
  venD_NAME: string;
 
}

export interface LumberLength
{
  rec_id : number;
  mbfLen: number;
 
}