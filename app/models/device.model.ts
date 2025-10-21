import { SawLaborRule, TableLaborRule } from './saw-labor-config.model';

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
    defaultPrinters: string | null;
    comments: string | null;
    useLumberSource: boolean;
    performFileSyncOperation: boolean;
    sawLaborRuleId: number | null;
    tableLaborRuleId: number | null;
    reSpeedInPercentage: number | null;
    deviceClassification: DeviceClassification | null;
    sawLaborRule: SawLaborRule | null;
    tableLaborRule: TableLaborRule | null;
}

export interface EShopDeviceTypes {
    esD_DEVICE_TYPE: number;
    esD_TYPE_DESCRIPTION: string | null;
    inputFileType: string | null;
    sawLaborRules: SawLaborRule[] | null;
    tableLaborRules: TableLaborRule[] | null;
}

export interface GetDepartmentsRequest {
    plantLocation?: string | null;
}

export interface GetDevicesRequest {
    plantLocation?: string | null;
    department?: string | null;
    departmentId?: number | null;
    status?: boolean | null;
    fileType?: number | null;
    esqUsedIsNull?: boolean | null;
    includeDispatcherRegardlessOfDept?: boolean | null;
    includeReservedRegardlessOfDept?: boolean | null;
    title?: string | null;
    showInSchedule?: boolean | null;
}

export interface GetDevicesForCalendarSchedulerResponse extends Device {
    id: number;
    title: string;
    color?: string;
}

export interface DeviceClassification {
    id: number;
    name: string;
    description: string | null;
    devices: Device[];
}

export interface CheckIfShopDeviceOfLoggedInUserIsAvailableRequest {
    currentDateTime: Date | string;
}

export interface CheckIfShopDeviceOfLoggedInUserIsAvailableResponse {
    shopDeviceOfLoggedInUserIsOnBreak: boolean;
    shopDeviceOfLoggedInUserIsOnLunch: boolean;
    shopDeviceOfLoggedInUserIsOnMaintenance: boolean;
}

export interface DeviceLoginRequest {
    employeeNumber: Number;
    start: Date | string;
    deviceID: number;
    location: string | null | undefined;
}

export interface DeviceInformation {
    name: string;
    id: number;
}
