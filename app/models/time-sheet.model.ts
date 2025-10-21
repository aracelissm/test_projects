import { ETimeSheetCalendarSchedulerTimeFrames } from '../enums/time-sheet';

export interface TimeSheet {
    recId: number;
    type: string;
    location: string;
    shiftDate: Date;
    resource: string;
    shift: string;
    shiftHours: number;
    lastName: string;
    firstName: string;
    employeeNum: number;
    logIn: Date;
    logOut: Date;
    job: string;
    mark: string;
    lagStart: Date;
    lagStop: Date;
    start: Date;
    stop: Date;
    pieces: number;
    trusses: number;
    minutes: number;
    estMinutes: number;
    jobEfficiency: number;
    direction: string;
    manHours: number;
    lunchBreakLength: number;
    breakLength: number;
    initLength: number;
}

export interface GetTimeSheetsForCalendarSchedulerRequest {
    timeFrame: ETimeSheetCalendarSchedulerTimeFrames;
    plantLocation?: string | null;
    title?: string | null;
    scheduledStartDate?: Date | string | null;
    scheduledEndDate?: Date | string | null;
}

export interface GetTimeSheetsForCalendarSchedulerResponse extends TimeSheet {
    title: string;
    startDate: Date | string | null;
    endDate?: Date | string | null;
    allDay?: boolean | null;
}

export interface GetTimeSheetsForCalendarSchedulerDayViewRequest {
    department?: string | null;
    timeFrame: ETimeSheetCalendarSchedulerTimeFrames;
    plantLocation?: string | null;
    shift?: string | null;
    scheduledStartDate?: Date | string | null;
    scheduledEndDate?: Date | string | null;
    deviceIds?: string | null;
    searchTerm?: string | null;
}

export interface GetTimeSheetsForCalendarSchedulerDayViewResponse extends TimeSheet {
    title: string;
    startDate: Date | string | null;
    endDate?: Date | string | null;
    allDay?: boolean | null;
    color?: string | null;
}

export interface TimeSheetPerson {
    employeeNum: number;
    firstName: string;
    lastName: string;
}
export interface GetTimeSheetsPersonsForCalendarSchedulerDayViewResponse
    extends TimeSheetPerson {
    id: number;
    title: string;
    color?: string;
}

export interface GetTimeSheetsRequest {
    plantLocation?: string | null;
    department?: string | null;
    title?: string | null;
    status?: string | null;
}

export interface ScheduleTimeSheetsToResourceRequest {
    plantLocation: string;
    department: string | null;
    deviceId: number;
    dateToSchedule: Date | string;
    woids: number[];
    jobNotes?: string | null;
}

export interface UpdateTimeSheetRequest {
    woid: number;
    esdResourceUnits: number;
    esdDueDate: Date | string | null;
    esdSchedDate: Date | string | null;
    esdSchedStop: Date | string | null;
    esdData1: string | null;
    addWONotesToJobNotes: boolean;
}

export interface CompleteTimeSheetRequest {
    dateTime: Date | string;
}

export interface GetActivity {
    //woid: number;
    activity: string;
    description: string;
    department: number;
    workType: number;
    dataType: number;
    preferredDevice: string;
    nextActivity: string;
    minSlack: number;
    jobStatusWhenActive: string;
    jobStatusWhenDone: string;
}

export interface OfficeLog {
    recId: number;
    shiftDayId: number | null;
    woid: number | null;
    device: string | null;
    start: Date | string | null;
    stop: Date | string | null;
    event: string | null;
}

export interface GetType {
    eshoP_FILE_TYPE: number;
    eshoP_FILETYPE_DESCRIPTION: string;
}

export interface GetTimeSheetStatus {
    id: number;
    status: string;
}
