import { Device } from './device.model';

export interface Department {
    id: number;
    department: string;
}

export interface Status {
    qstatuS_TYPE: number;
    qstatuS_DESCRIPTION: string;
}
export interface GetLablePrinters {
    rec_id: number;
    model: string;
    location: string;
    host: string;
    port: number;
}

export interface FileType {
    eshoP_FILE_TYPE: number;
    eshoP_FILETYPE_DESCRIPTION: string;
}

export interface ResourceType {
    esD_DEVICE_TYPE: number;
    esD_TYPE_DESCRIPTION: string;
}

export interface CreateResource {
    esqTitle: string;
    esqDeviceType: number;
    esqStatus: number;
    esqCapacity: number;
    parameters: string;
    esqDepartment: string;
    esqLocation: string;
    esqDirectory: string;
    esqFileType: number;
    deviceClassificationId?: number | null;
    defaultPrinters: string;
    comments: string;
    performFileSyncOperation: boolean;
    sawLaborRuleId: number | null;
    tableLaborRuleId: number | null;
    reSpeedInPercentage: number | null;
}

export interface UpdateResource {
    deviceId: number;
    esqTitle: string;
    esqDeviceType: number;
    esqStatus: number;
    esqCapacity: number;
    parameters: string;
    esqDepartment: string;
    esqLocation: string;
    esqDirectory: string;
    esqFileType: number;
    deviceClassificationId?: number | null;
    defaultPrinters: string;
    comments: string;
    performFileSyncOperation: boolean;
    sawLaborRuleId: number | null;
    tableLaborRuleId: number | null;
    reSpeedInPercentage: number | null;
}

export interface getResourceTypeByDept {
    department?: string | null;
    limit?: number | null;
}

export interface Resource extends Device {}
