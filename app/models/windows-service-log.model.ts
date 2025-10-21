import { BaseEntity } from './general.model';
import { User } from './user.model';

export interface WindowsServiceLog extends BaseEntity {
    id: number;
    serviceName: string;
    serviceState: string | null;
    userAccount: string | null;
    machineName: string | null;
    logLevel: string;
    message: string;
    exception: string | null;
    stackTrace: string | null;
    userId: number;
    occurredAt: string;
    user: User | null;
}

export interface CreateWindowsServiceLogRequest {
    serviceName: string;
    serviceState?: string | null;
    userAccount?: string | null;
    machineName?: string | null;
    logLevel: string;
    message: string;
    exception?: string | null;
    stackTrace?: string | null;
}
