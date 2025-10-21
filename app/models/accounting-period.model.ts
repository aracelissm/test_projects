import {
    AccPeriodExtension,
    SaveAccPeriodExtensionRequest
} from './acc-period-extension.model';

export interface AccountingPeriod {
    recId: number;
    year: number;
    periodNumber: number;
    periodBegin: Date;
    periodEnd: Date;
    accPeriodExtension: AccPeriodExtension | null;
}

export interface CreateAccountingPeriodRequest {
    year: number;
    periodNumber: number;
    periodBegin: Date | string;
    periodEnd: Date | string;
}

export interface UpdateAccountingPeriodRequest {
    recId: number;
    year: number;
    periodNumber: number;
    periodBegin: Date;
    periodEnd: Date;
    accPeriodExtension?: SaveAccPeriodExtensionRequest | null;
}
