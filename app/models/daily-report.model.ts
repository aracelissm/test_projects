import { Location } from "./location.model";

export interface RunDailyReportRequest {
    productionDate: string | number | Date;
    locations: Location[];
    shifts: string[];
    overwriteFiles: boolean;
    newWeek: boolean;
    newMonth: boolean;
    updateDashboard: boolean;
    updateData: boolean;
}

export interface RunDailyReportCheckRequest extends RunDailyReportRequest {
    department: string;
}

export interface DialogItemsResponse {
    items: string[];
}

export interface TimeClockIssue {
    location: string;
    reason: string;
    shift: string;
    activity: string;
    prodDate: Date;
    department: string;
    device: string;
    crew: string;
    firstName: string;
    lastName: string;
    number: number;
    start?: Date;
    stop?: Date;
    count: string;
    departmentId: number;
    employeeId: number;
    productionDate: Date;
}

export interface EndOfShiftAuditLog {
    prodDate: Date;
    shift: string | null;
    department: string;
    location: string;
    userId: number;
    email: string;
    firstName: string;
    lastName: string;
    createdDate: Date;
}

export interface EndOfShiftInfo {
    location: string;
    department: string;
    shift: string;
    isCompleted: boolean;
}

export interface ReportDay {
    prodDate: Date;
    newWeek: boolean;
    newMonth: boolean;
}

export interface SetReportDepartmentExceptionRequest {
    prodDate: Date;
    departments: EndOfShiftInfo[];
}