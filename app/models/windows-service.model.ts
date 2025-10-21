import { BaseEntity } from './general.model';
import { Device } from './device.model';
import { WorkOrder } from './work-order.model';

export interface WindowsServiceFileSyncTask extends BaseEntity {
    id: number;
    deviceId: number;
    workOrderId: number;
    sourceDirectory: string;
    targetDirectory: string;
    status: string;
    baseOperation: string | null;
    fileTransferDirection: string;
    device: Device | null;
    workOrder: WorkOrder | null;
    fileSyncServiceTaskBlobs: FileSyncServiceTaskBlob[] | null;
}

export interface FileSyncServiceTaskBlob {
    id: number;
    fileSyncServiceTaskId: number;
    blobUri: string;
    fileName: string;
    fileSizeInBytes: number;
    uploadTimeInSeconds: number;
    uploadedAt: Date | string;
    fileSyncServiceTask: WindowsServiceFileSyncTask | null;
}
