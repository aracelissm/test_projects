export interface getAllLumberSnapShot {
   
    rec_Id: number;
    snapshotTerm: string;
    itemCode: string;
    description: string;
    sizeName: string;
    length: number;
    gradeName: string;
    receivedGrade: string;
    vendor: string;
    poNum: string;
    loadNumber: string;
    bunk: number;
    pieceCount: number;
    boardFoot: number;
    unitCost: number;
    inventoryDate: Date,
    rfidCode_Id: number;
    isActive: boolean,
    location: string;
}

export interface GetMonth
{
  id: number;
  value: string;
}

export interface GetYear
{
  id: number;
  year: string;
}


export interface AddSnapShot
{
  LoadNumber_id : string;
  Bunk: number;
  term: string;
  location: string;
}

export interface RemoveSnapShot
{

  id: number;

}