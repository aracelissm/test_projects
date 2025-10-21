
import { TimeClock } from "./timeclock.model";

export interface TimeClockResponse extends TimeClock {
    employeeName: string | null;
    title: string | null;
    shiftDate:Date;
    crew:string | null;
    isSupervisorEdiable:boolean;
}



export interface TimeClockAudit {
    newStart: string | null | Date;
    newStop: string | null | Date;
    originalStart:Date | null | string;
    originalStop:string | null | Date;
    userID : number;
    userEmail: string
    location: string;
    employeeNum: number | string;
    rec_ID: number;
    note:string;
    createAt:Date | null | string;

}