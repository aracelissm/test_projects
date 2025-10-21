import { Device } from "./device.model";
import { BaseEntity } from "./general.model";
import { TRInfo } from "./trInfo.model";
import { WorkOrder } from "./work-order.model";

export interface TableStationStartTrussRequest {
    location: string | null |undefined;
    workOrderID: number;
    workOrderDetailID: number;
    jobKey: string;
}

export interface TableStationAction {
    // deviceName: string | null;
    location: string | null;
    woID: number | null;
    jobKey: string | null;
}

export interface TableWorkOrderStopRequest extends TableStationAction {
    actualBuildStart: string | null | Date;
    actualStart: string | null | Date;
    actualStop: string | Date;
    actAssemble: number | null;
    built: number;
    qTY: number;
}

export interface TrussDoneRequest extends TableStationAction {
    actualSetupStop: string | null| Date;
    actualStart:string | null| Date;
    actualStop: string | null| Date;
    actSetup: number | null;
    qTY: number;
}

export interface MarkCompleteRequest extends TableStationAction {
    built: number;
}

export interface TrussRecutRequest extends TableStationAction {
    Tag: string;
}

export interface RecutWorkOrder{
    woid?: number;
    jobId: number;
    esdActivity: string;
    esdTitle: string;
    esdDeviceType: number;
    esdFileType: number;
    esdResourceUnits: number;
    esdJobkey: string;
    esdMark: string;
    esdStatus: string;
    esdDueDate: Date;
    esdNextStation: string;
    esdSchedDate: Date;
    esdSchedStop: Date;
    esdNumUnits: number;
    esdLocation: string;
    esdShift: string;
    esdData2: string;
}
export interface StationWiseActiveWorkOrders {
    id: number;
    workOrderId: number;
    deviceId: number;
    locationId: number;
    createdAt: Date;
    status: string | null;
    station: string | null;
}


export interface TableStationWorkOrderResponse{
    workOrders:WorkOrder[];
    status: StationWiseActiveWorkOrders|null;
}

export interface ReturnTrussRequest {
    wOID: number;
    wODetailID: number;
    qTY: number;
    note: string | null;
}



//to get activeWorkOrder

export interface TableStationState extends BaseEntity {
    id: number;
    deviceId: number;
    // Allowed values are 'STATE_IDLE', 'STATE_LOADED', 'STATE_BUILD'
    activeState: string;
    activeWoid: number | null;
    activePcInfoWoDetailId: number | null;
    device: Device | null;
    activeWo: WorkOrder | null;
    activeTRInfoWoDetailId: TRInfo | null;
}

export interface CreateTableStationStateRequest {
    deviceId: number;
    activeState: string;
    activeWoid?: number | null;
    activePcInfoWoDetailId?: number | null;
}

export interface UpdateTableStationStateRequest {
    id: number;
    // NOTE: Don't update the DeviceId once created
    // deviceId: number;
    activeState: string;
    activeWoid?: number | null;
    activePcInfoWoDetailId?: number | null;
}

export interface CreateTableStationStateRequest {
    deviceId: number;
    activeState: string;
    activeWoid?: number | null;
    activeTRInfoWoDetailId?: number | null;
}

export interface UpdateTableStationStateRequest {
    id: number;
    // NOTE: Don't update the DeviceId once created
    // deviceId: number;
    activeState: string;
    activeWoid?: number | null;
    activeTRInfoWoDetailId?: number | null;
}