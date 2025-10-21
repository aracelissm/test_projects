
import { EWorkOrderCalendarSchedulerTimeFrames } from '../enums/work-order';

export interface WorkOrder {
    woid: number;
    jobId: number;
    esdActivity: string;
    esdTitle: string;
    esdDeviceType: number;
    esdFileType: number;
    esdResourceUnits: number;
    esdJobkey: string;
    esdMark: string;
    esdStatus: string;
    esdPriority: null;
    esdFilename: null;
    esdDueDate: Date;
    esdNextStation: null;
    esdSchedDate: Date;
    esdSchedStart: null;
    esdSchedStop: Date;
    esdActDate: null;
    esdActStart: null;
    esdActStop: null;
    esdNumUnits: number;
    esdLocation: string;
    esdShift: string;
    esdUnitsCompleted: number;
    esdActualResources: number;
    esdData1: null;
    esdData2: string;
    esdData3: string;
    rCodes: null;
    created: Date;
}

export interface GetWorkOrdersForCalendarSchedulerRequest {
    timeFrame: EWorkOrderCalendarSchedulerTimeFrames;
    plantLocation?: string | null;
    title?: string | null;
    scheduledStartDate?: Date | string | null;
    scheduledEndDate?: Date | string | null;
    shift?: string | null;
}

export interface GetWorkOrdersForCalendarSchedulerResponse extends WorkOrder {
    title: string;
    startDate: Date | string | null;
    endDate?: Date | string | null;
    allDay?: boolean | null;
}


export interface GetWorkOrderList {
    esdTitle: string;
    esdStatus?: string;
}