export interface GetLablePrinters
 {
    rec_id: number;
    name:string;
    model: string;
    location: string;
    host: string;
    port: number;
    isActive: boolean
   
}
export interface GetLocations {
    location: string | null;
}
export interface CreatePrinters{
    name:string;
    model: string;
    location: string;
    host: string;
    port: number;
    isActive: boolean
}