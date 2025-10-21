import { Location } from "./location.model";

export interface Employee {
    employeeId: number;
    empNumber: number;
    locationId: number;
    number: number;
    lastName: string | null;
    firstName: string | null;
    department: string | null;
    shift: string | null;
    defaultDevice: string | null;
    rate: number | null;
    title: string | null;
   
    category: string | null;
    address: string | null;
    city: string | null;
    state: string | null;
    zipCode: string | null;
    telephone: string | null;
    ssn: string | null;
    hired: string | null;
    emplReview: string | null;
    emplChange: string | null;
    timeClockId: number | null;
    dayQuota: number | null;
    weekQuota: number | null;
    bonusRate: number | null;
    inActive: boolean;
    clockInId: number | null;
    ptoavail: number | null;
    ptoused: number | null;
    reghours: number | null;
    emptype: string | null;
    dept: string | null;
    shiftdiff: number | null;
    costing: string | null;
    direct: string | null;
    paybonus: boolean;
    test: string | null;
    bmhcnum: number | null;
    payRule: string | null;
    phoneUid: string | null;
    points: number | null;
    location: Location | null;
}

export interface CreateEmployee {
    employeeId: number;
    locationId: number|null;
    number: number;
    lastName: string | null;
    firstName: string | null;
    department: string | null;
    shift: string | null;
    defaultDevice: string | null;
   // rate: number | null;
    title: string | null;
    emptype : string | null;
    category: string | null;
    // address: string | null;
    // city: string | null;
    // state: string | null;
    // zipCode: string | null;
    // telephone: string | null;
    ssn: string | null;
    hired: string | null;
    emplReview: string | null;
    emplChange: string | null;
    timeClockId: number | null;
    dayQuota: number | null;
    weekQuota: number | null;
    bonusRate: number | null;
    inActive: boolean;
    clockInId: number | null;
    // ptoavail: number | null;
    // ptoused: number | null;
    reghours: number | null;
   
    dept: string | null;
    shiftdiff: number | null;
    costing: string | null;
    direct: string | null;
    //paybonus: boolean;
    test: string | null;
    bmhcnum: number | null;
    payRule: string | null;
    phoneUid: string | null;
    //points: number | null;
}
export interface UpdateEmployee {
    employeeId: number;
    locationId: number|null;
    number: number;
    lastName: string | null;
    firstName: string | null;
    department: string | null;
    shift: string | null;
    defaultDevice: string | null;
   // rate: number | null;
    title: string | null;
    emptype : string | null;
    category: string | null;
    // address: string | null;
    // city: string | null;
    // state: string | null;
    // zipCode: string | null;
    // telephone: string | null;
    ssn: string | null;
    hired: string | null;
    emplReview: string | null;
    emplChange: string | null;
    timeClockId: number | null;
    dayQuota: number | null;
    weekQuota: number | null;
    bonusRate: number | null;
    inActive: boolean;
    clockInId: number | null;
    // ptoavail: number | null;
    // ptoused: number | null;
    reghours: number | null;
    
    dept: string | null;
    shiftdiff: number | null;
    costing: string | null;
    direct: string | null;
    //paybonus: boolean;
    test: string | null;
    bmhcnum: number | null;
    payRule: string | null;
    phoneUid: string | null;
    //points: number | null;
    location: Location | null;
}

export interface ClockInRequest {
    dateTime: Date | string;
}

export interface ClockOutRequest {
    dateTime: Date | string;
}
export interface GetCategory {
    category: string | null;
    rec_ID: number;
    locationID: number;
    title: string;
    descr: string;
    calendarColor: string;
    isActive: boolean;
    isDeleted: boolean;
    sort: number;
}
export interface GetEmployeeType {
    employeeId: number;
    location:string;
    locationID: number;
    employeeType: string;   
    employeeNumber: number
}

export interface TimeManagerEmployeeResponse extends Employee{
    missedClockIn:  Date | string;
    missedClockOut:Date | string;
    missedShiftDate:Date | string;   
    missedShift:string;
    missedTimeClockOutId :string;

}
export interface GetDepartmentEmployee {
    department: string | null;  
    id: number | null;
    location: string|null;
    departmentWithLocName: string | null;  
}

export interface GetDepartmenDevices {
    device: string | null;
    id: number;
}
export interface GetShiftEmployee {
    rec_ID: number;
    locationID: number;
    title: string;
    descr: string;
    calendarColor: string;
    isActive: boolean;
    isDeleted: boolean;
    sort: number;
    
}

export interface GetEmployeeDevice {
    defaultDevice: string | null;  
    employeeId: number | null;
    firstName: string|null;
    lastName: string | null;  
    number: number | null;
}

export interface GetEmployeeDeviceRequest {
    searchterm?: string | null;
    limit?: number | null;
}
