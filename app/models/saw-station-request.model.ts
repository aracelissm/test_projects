import { Device } from 'devextreme/core/devices';
import { BaseEntity } from './general.model';
import { PCInfo } from './PCInfo.model';
import { WorkOrder } from './work-order.model';

export interface SawStationState extends BaseEntity {
    id: number;
    deviceId: number;
    // Allowed values are 'STATE_IDLE', 'STATE_LOADED', 'STATE_BUILD'
    activeState: string;
    activeWoid: number | null;
    activePcInfoWoDetailId: number | null;
    device: Device | null;
    activeWo: WorkOrder | null;
    activePcInfoWoDetail: PCInfo | null;
}

export interface CreateSawStationStateRequest {
    deviceId: number;
    activeState: string;
    activeWoid?: number | null;
    activePcInfoWoDetailId?: number | null;
}

export interface UpdateSawStationStateRequest {
    id: number;
    // NOTE: Don't update the DeviceId once created
    // deviceId: number;
    activeState: string;
    activeWoid?: number | null;
    activePcInfoWoDetailId?: number | null;
}
