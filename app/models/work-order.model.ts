import { EPriority } from '../enums/general';
import {
    EWorkOrderCalendarSchedulerTimeFrames,
    EWorkOrderProcessActionType
} from '../enums/work-order';
import { JobItem } from './job-item.model';
import { JobStatusLog } from './job-status-log.model';
import { JobStatusQueue } from './job-status-queue.model';
import { JobWithProjectCustomer } from './job.model';
import { PCInfo } from './PCInfo.model';

export interface WorkOrder {
    woid: number;
    jobId: number;
    esdActivity: string;
    esdTitle: string;
    esdDeviceType: number;
    esdFileType: number;
    esdResourceUnits: number | null;
    esdJobkey: string;
    esdMark: string | null;
    esdStatus: string;
    esdPriority: string | null;
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
    esdLocation: string | null;
    esdShift: string;
    esdUnitsCompleted: number;
    esdActualResources: number;
    esdData1: null;
    esdData2: string;
    esdData3: string;
    rCodes: null;
    created: Date;
    //WOActivities Data
    activityDepartment?: string | null;
    //CUST Data
    customerRecId?: number | null;
    customerName?: string | null;
    customerKey?: string | null;
    //Projects Data
    projectRecId?: number | null;
    projectSubdivision?: string | null;
    //SMAN Data
    smanKey?: string | null;
    smanName?: string | null;
    //JOBHEAD Data
    jobRecId?: number | null;
    jobBuildDate?: Date | string | null;
    jobType?: string | null;
    jobStatus?: string | null;
    jobUnits?: string | null;
    jobUnitscnt?: number | null;
    joB_REF1?: string | null;
    jobRef2?: string | null;
    jobLot?: string | null;
    jobBlock?: string | null;
    jobModel?: string | null;
    masteR_NUMBER?: string | null;
    masterJobStatus?: string | null;
    jobPLAN_RACK?: string | null;
    jobDir?: string | null;
    jobDraftComment?: string | null;
    //Devices Data
    deviceId?: number | null;
    //Project_Bids Data
    bidLoginDate?: Date | string | null;
    //TRInfo Data
    trInfoMaxHeight?: number | null;
    trInfoMaxOaspan?: number | null;
    //Anonymous Data
    cuttingComplete?: boolean | null;
    daysOld?: number | null;
    statDaysOld?: number | null;
    isActiveWorkOrder?: boolean | null;
    jobItemsCount?: number | null;
    jobTotalBdft?: number | null;
}

export interface GetWorkOrdersForCalendarSchedulerRequest {
    timeFrame: EWorkOrderCalendarSchedulerTimeFrames;
    plantLocation?: string | null;
    title?: string | null;
    scheduledStartDate?: Date | string | null;
    scheduledEndDate?: Date | string | null;
}

export interface GetWorkOrdersForCalendarSchedulerResponse extends WorkOrder {
    title: string;
    startDate: Date | string | null;
    endDate?: Date | string | null;
    allDay?: boolean | null;
}

export interface GetWorkOrdersForCalendarSchedulerDayViewRequest {
    department?: string | null;
    timeFrame: EWorkOrderCalendarSchedulerTimeFrames;
    plantLocation?: string | null;
    scheduledStartDate?: Date | string | null;
    scheduledEndDate?: Date | string | null;
    deviceIds?: string | null;
    searchTerm?: string | null;
}

export interface GetWorkOrdersForCalendarSchedulerDayViewResponse extends WorkOrder {
    title: string;
    startDate: Date | string | null;
    endDate?: Date | string | null;
    allDay?: boolean | null;
    color?: string | null;
}

export interface GetWorkOrdersForCalendarSchedulerListViewRequest {
    department?: string | null;
    timeFrame: EWorkOrderCalendarSchedulerTimeFrames;
    plantLocation?: string | null;
    scheduledStartDate?: Date | string | null;
    scheduledEndDate?: Date | string | null;
    deviceIds?: string | null;
    searchTerm?: string | null;
}

export interface GetWorkOrdersForCalendarSchedulerListViewResponse extends WorkOrder {
    title: string;
    startDate: Date | string | null;
    endDate?: Date | string | null;
    allDay?: boolean | null;
    color?: string | null;
}

export interface GetWorkOrdersRequest {
    plantLocation?: string | null;
    department?: string | null;
    title?: string | null;
    status?: string | null;
    scheduledDate?: Date | string | null;
    woids?: string | null;
    [key: string]: any;
}

export interface GetWorkOrdersForSchedulerV2Request {
    // deviceId: number;
    plantLocation: string;
    plantLocations: string;
    department?: string | null;
    deviceTitle: string;
    scheduledDate?: Date | string | null;
    currentDateTime: Date | string;
    showWorkOrdersOfAllDevices?: boolean | null;
    shiftTitle: string;
    showWorkOrdersOfAllShifts?: boolean | null;
    status?: string;
}

export interface GetWorkOrdersSummaryForSchedulerV2Request {
    // deviceId: number;
    plantLocation: string;
    plantLocations: string;
    department?: string | null;
    deviceTitle: string;
    scheduledStartDate: Date | string;
    scheduledEndDate: Date | string;
    currentDateTime: Date | string;
    showWorkOrdersOfAllDevices?: boolean | null;
    shiftTitle: string;
    showWorkOrdersOfAllShifts?: boolean | null;
}

export interface GetWorkOrdersSummaryForSchedulerV2Response {
    date: Date | string;
    noOfItems: number;
    isVacationDay: boolean;
    curResourceLevel: number; // resource in minutes
    maxResource: number; // resource in minutes
    nextAvailableStartTime: Date | string | null;
    isScheduledDay: boolean;
    isDefaultHoliday: boolean;
    cellBackgroundColor: string | null;
    holidayPlantLocation: string | null;
}

export interface ScheduleWorkOrdersToResourceRequest {
    plantLocation: string;
    department: string | null;
    deviceId: number;
    dateToSchedule: Date | string;
    woids: number[];
    jobNotes?: string | null;
    performNecessaryOperationsForBackPlating?: boolean;
}

export interface ScheduleWorkOrdersToResourceV2Request {
    // fromDeviceId: number;
    // toDeviceId: number;
    plantLocation: string;
    fromDeviceDepartment: string | null;
    toDeviceDepartment: string | null;
    fromDeviceTitle: string;
    toDeviceTitle: string;
    dateToSchedule: Date | string;
    woids: number[];
    jobNotes?: string | null;
    performNecessaryOperationsForBackPlating?: boolean;
}

export interface SwapWorkOrdersUnderResourceWithInTheDayRequest {
    plantLocation: string;
    deviceDepartment: string | null;
    deviceTitle: string;
    sourceWoid: number;
    targetWoid: number;
    dateTime: Date | string;
}

export interface ReorderWorkOrdersRequest {
    SourceWoidList: number[];
    TargetWoid: number;
    DeviceTitle: string;
    DeviceDepartment: string;
    PlantLocation: string;
    DateTime: string;
}

export interface SplitShippingWorkOrderRequest {
    currentDateTime: Date | string;
}

export interface UpdateWorkOrderInWOSchedulerRequest {
    woid: number;
    esdMark: string | null;
}

export interface UpdateWorkOrderRequest {
    woid: number;
    esdResourceUnits: number;
    esdDueDate: Date | string | null;
    esdSchedDate: Date | string | null;
    esdSchedStop: Date | string | null;
    esdData1: string | null;
    addWONotesToJobNotes: boolean;
}

export interface StartTimerForWorkOrderRequest {
    dateTime: Date | string;
}

export interface StartTimerForSawWorkOrderRequest {
    // deviceId: number;
    plantLocation: string;
    department?: string | null;
    deviceTitle: string;
    pcinfoWodetailId: number;
    currentDateTime: Date | string;
}

export interface SawStationPerformActionRequest {
    // deviceId: number;
    plantLocation: string;
    department?: string | null;
    deviceTitle: string;
    pcinfoWodetailId: number;
    // Allowed values for the action property are DONE_SETUP, DONE_CUTTING, PARTIAL_CUTTING and MARK_ALL_PIECES_DONE_CUTTING
    action: string;
    partialCutQty: number | null;
    lumberSource?: string | null;
    currentDateTime: Date | string;
}

export interface SawStationUndoCutActionForPieceRequest {
    pcinfoWodetailId: number;
    currentDateTime: Date | string;
}

export interface StopTimerAndCompleteSawWorkOrderRequest {
    // deviceId: number;
    plantLocation: string;
    department?: string | null;
    deviceTitle: string;
    recIdsOfPartiallyCutPiecesToComplete: number[];
    lumberSource?: string | null;
    currentDateTime: Date | string;
}

export interface SawStationBreakRequest {
    currentDateTime: Date | string;
}

export interface SawStationLunchRequest {
    currentDateTime: Date | string;
}

export interface SawStationMaintenanceRequest {
    currentDateTime: Date | string;
    // To find current ShiftId
    plantLocation: string;
}

export interface StopTimerForWorkOrderRequest {
    dateTime: Date | string;
    removeActiveWOFromDevice?: boolean | null;
}

export interface GetPreDataToCompleteWOAndOverrideJobStatusResponse {
    jobItem: JobItem | null;
    job: JobWithProjectCustomer | null;
    jobStatusQueues: JobStatusQueue[];
    jobStatusLogs: JobStatusLog[];
    jobExceptions: string[];
    jobSubContractorOptions: string[];
}

export interface CompleteWorkOrderRequest {
    dateTime: Date | string;
    //WorkOrder Notes
    woNotes?: string | null;
}

export interface CompleteWOAndOverrideJobStatusRequest {
    dateTime: Date | string;
    changeWOActivityToRepeat: boolean | null;
    jobStatusCode: string;
    subContractor: string | null;
    additionalHours: number;
    jobNote: string | null;
    addJobNoteToNewWONotes: boolean;
}

export interface CompleteWOAndApproveSealRequest {
    dateTime: Date | string;
    //WorkOrder Notes
    woNotes?: string | null;
}

export interface CompleteWOAndRejectSealRequest {
    dateTime: Date | string;
    //WorkOrder Notes
    woNotes?: string | null;
}

export interface ForceCompleteWorkOrderRequest {
    currentDateTime: Date | string;
}

export interface SendWorkOrderForSealsRequest {
    dateTime: Date | string;
    sealsNotes: string | null;
    woNotes: string | null;
    lowPriority: boolean;
    totalDesigns: number;
    numberSeals: number;
    sealPartialJobItems: boolean;
}

export interface EditWorkOrderRequest {
    woid: number;
    esdMark: string;
    esdActivity: string;
    EsdTitle: string;
    esdFileType: number;
    esdStatus: string;
    esdLocation: string;
    esdResourceUnits: number;
    EsdShift: string;
    esdNextStation: string;
    esdNumUnits: number;
    esdDueDate: Date | string | null;
    esdSchedDate: Date | string | null;
    esdSchedStop: Date | string | null;
    esdData1: string;
    esdData2: string;
    esdData3: string;
    esdActDate: Date | string | null;
    esdActStop: Date | string | null;
    esdUnitsCompleted: number;
    esdActualResources: number;
    esdPriority?: string | null;
    addWONotesToJobNotes?: boolean | null;
}
export interface AddWorkOrderRequest {
    // woid: number;
    esdJobKey: string;
    // addWONotesToJobNotes: boolean;
    esdMark: string;
    esdActivity: string;
    EsdTitle: string;
    esdFileType: number;
    esdStatus: string;
    esdLocation: string;
    esdResourceUnits: number;
    EsdShift: string;
    esdNextStation: string;
    esdNumUnits: number;
    esdDueDate: Date | string | null;
    esdSchedDate: Date | string | null;
    esdSchedStop: Date | string | null;
    esdData1?: string;
    esdData2?: string;
    esdData3?: string;
    esdActDate?: Date | string | null;
    esdActStop?: Date | string | null;
    esdUnitsCompleted?: number;
    esdActualResources?: number;
    addWONotesToJobNotes?: boolean | null | undefined;
}

export interface CreateWorkOrderRequest {
    //woid: number;
    esdJobkey: string;
    esdLocation: string;
    esdResourceUnits: number;
    esdDueDate: Date | string | null;
    esdSchedDate: Date | string | null;
    esdSchedStop: Date | string | null;
    esdData1: string | null;
    addWONotesToJobNotes: boolean;
    esdActivity: string;
    esdStatus: string;
    esdTitle: string;
}

export interface CreateCheckWorkOrderRequest {
    woid: number;
    dateTime: Date | string;
}

export interface ClearWorkOrderFromDeviceRequest {
    woid: number;
    deviceId: number;
    currentDateTime: Date | string;
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

export interface DepartmentWOActivityRelation {
    id: number;
    department: string;
    woActivity: string;
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

export interface GetDesignerSearch {
    search: string;
}
export interface GetWorkOrderStatus {
    id: number;
    status: string;
}

export interface WorkOrderStatus {
    id: number;
    code: string;
    description: string | null;
}

export interface GetWorkOrderActivityOptionsRequest {
    activityDescription?: string | null;
    limit?: number | null;
}

export interface WOActivity {
    activity: number;
    description: string;
    department: string | null;
    workType: number | null;
    dataType: number | null;
    preferredDevice: string | null;
    nextActivity: string | null;
    minSlack: number | null;
    jobStatusWhenActive: string | null;
    jobStatusWhenDone: string | null;
}

export interface GetMyWorkOrdersRequest {
    dateTime?: Date | string | null;
    plantLocations?: string | null;
    priority?: EPriority | null;
    [key: string]: any;
}

export interface GetMyFollowingWorkOrdersRequest {
    dateTime?: Date | string | null;
    plantLocations?: string | null;
    // workOrderStatuses?: string | null;
    workOrderActivities?: string | null;
    priority?: EPriority | null;
    [key: string]: any;
}

export interface GetWHEStationWorkOrdersRequest {
    dateTime?: Date | string | null;
    plantLocations?: string | null;
    priority?: EPriority | null;
    [key: string]: any;
}

export interface GetMyMentorshipWorkOrdersRequest {
    dateTime?: Date | string | null;
    menteeDeviceIds: string;
    plantLocations?: string | null;
    priority?: EPriority | null;
    [key: string]: any;
}

export interface GetSawStationWorkOrdersRequest {
    currentDateTime: Date | string;
    priority?: EPriority | null;
    [key: string]: any;
}

export interface CheckEligibilityToAccessWOProcessBtnsRequest {
    menteeDeviceIds?: string | null;
}

export interface CheckEligibilityToAccessWOProcessBtnsResponse {
    isEligibleToAccessWOProcessBtns: boolean;
}

export interface GetWorkOrdersCountForJobRequest {
    activity?: string | null;
    mark?: string | null;
}

export interface GetWorkOrdersCountForJobResponse {
    workOrdersCountForJob: number;
}

export interface WorkOrderNotesComponentDialogData {
    woid: number;
    action:
        | EWorkOrderProcessActionType.CompleteWorkOrder
        | EWorkOrderProcessActionType.CompleteWOAndApproveSeal
        | EWorkOrderProcessActionType.CompleteWOAndRejectSeal;
}

export interface SortInfo {
    selector: string;
    desc: boolean;
}

export interface ReturnTrussOrPiecesRequest {
    wOID: number;
    wODetailID: number | null;
    qTY: number;
    note: string | null;
}

export interface ReturnTrussHistoryResponse {
    userId?: string;
    tag?: string;
    when?: Date | null | string;
    note?: string;
    qty?: number;
    totalQty?: number;
}

export interface ReturnPieceHistoryResponse {
    userId?: string;
    pILabel?: string;
    when?: Date | null | string;
    qty?: number;
    totalQty?: number;
}

export interface PartiallyCutPiecesFoundForWorkOrderDialogData {
    workOrderData: WorkOrder;
    partiallyCutPieces: PCInfo[];
}

export interface PartialCuttingInputForPieceDialogData {
    pcinfo: PCInfo;
}
