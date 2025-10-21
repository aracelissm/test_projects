//import { Device } from "./device.model";
import { User } from "./user.model";

export interface GetDeviceHolidays {
    holidayId: number;
    startDate: string | number | Date;
    endDate: string | number | Date;
    ptoavail: string;
    ptoused: string;
    reghours: string;
    emptype: string;
    dept: boolean;
    shiftdiff: string;
    device: string;
    department: string;
    reason: string;
}
export interface CreateDeviceHolidays {
    startDate: string | number | Date;   
    endDate: string | number | Date;    
    device?: string ;
   // department: string;
    reason: string;
    menteeDevice?: Device | null;
}
export interface GetDevices {
    device: string | null;
}
export interface UpdateDeviceHolidays {
    holidayId: number;
    startDate: string | number | Date; 
    endDate: string | number | Date;    
    device?: string;
   // department: string;
    reason: string;
    menteeDevice?: Device | null;
}

export interface MentorMentee {
    id: number;
    mentorUserId: number;
    menteeDeviceId: number;
    mentorUser?: User | null;
    menteeDevice?: Device | null;
}
export interface Device {
    deviceId: number;
    esqTitle: string;
    esqDeviceType: number | null;
    deviceTypeName?: string | null;
    esqFileType: number | null;
    fileTypeName?: string | null;
    esqDirectory: string | null;
    esqCapacity: number | null;
    esqUsed: string | null;
    esqStatus: number | null;
    status?: string | null;
    esqLocation: string | null;
    esqDepartment: string | null;
    parameters: string | null;
    activeWo: string | null;
    activeWoid: number | null;
    bonusQuota: number | null;
    actualBdFtTotal: number | null;
    actualRetotal: number | null;
    activeEstimateTotal: number | null;
    activeActualTotal: number | null;
    scheduledBacklog: number | null;
    nextAvailableTime: string | null;
    initials: string | null;
    activeWostart: string | null;
    maxShiftRe: number | null;
    showInSchedule: boolean;
    deviceClassificationId: number | null;
    deviceClassification: DeviceClassification | null;
}
export interface DeviceClassification {
    id: number;
    name: string;
    description: string | null;
    devices: Device[];
}
export interface GetMyMentorshipDeviceRequest {
    menteeDeviceIds: string;
}


export interface GetDeviceTimeManagement {
    device: string;
    empNumber: number;
    firstName: string;
    lastName: string;
    department: string;
    timeClockID: number;
    start: string | Date| null ;
    stop: string  | Date | null;
    category: string;
    employeeID: number;
}
