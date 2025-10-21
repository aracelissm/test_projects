export interface GetCategories
 {
    category:string;
    description: string;
    laborClass: string;
    location: string ;
    id:number;
}
export interface GetLocations {
    location: string | null;
}
export interface CreateCategories
 {
    category:string;
    description: string;
    laborClass: string;
    location: string ;
   
}
export interface UpdateCategories
 {
    id: number;
    category:string;
    description: string;
    laborClass: string;
    location: string ;
   
}
