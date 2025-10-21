export interface GetEmployeeTypes
 {
    employeeId: number;
    location:string;
    employeeType: string;   
    employeeNumber: number
    
   
}
export interface CreateEmployeeTypes
 {
    employeeId: number;
    location:string;
    employeeType: string;   
    employeeNumber: number
    
   
}
export interface UpdateEmployeeTypes
 {
    employeeId: number;
    location:string;
    employeeType: string;   
    employeeNumber: number
    
   
}

export interface GetLocations {
    location: string | null;
}
