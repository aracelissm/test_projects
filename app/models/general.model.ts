import { User } from './user.model';

export interface IDefaultApiResponse<T> {
    success: boolean;
    message?: Null<string>;
    data?: Null<T>;
    error?: Null<CustomError>;
}

type CustomError = {
    name: string;
    message: string;
    [key: string]: any;
};

export type Null<T> = T | null;

export type Undefine<T> = T | undefined;

export interface IDefaultOption<T extends number | string> {
    id?: number | string;
    name?: string;
    value?: T;
}

export interface DxDataGridCustomStoreLoadResult<T> {
    data: T[];
    totalCount: number;
    groupCount: number;
    summary: any[];
}

export interface DxDataGridCustomStoreLoadResultWithAggregates<T, TAggregates>
    extends DxDataGridCustomStoreLoadResult<T> {
    aggregates: TAggregates | null;
}

export interface BaseEntity {
    createdByUserId: number | null;
    createdAt: Date | string | null;
    updatedByUserId: number | null;
    updatedAt: Date | string | null;
    isDeleted: boolean;
    deletedByUserId: number | null;
    deletedAt: Date | string | null;
    createdByUser: User | null;
    updatedByUser: User | null;
    deletedByUser: User | null;
}

export class PureDate {
    year: number;
    month: number;
    day: number;

    constructor(Year: number, Month: number, Day: number) {
        this.year = Year;
        this.month = Month;
        this.day = Day;
    }

    static FromDate(date: Date): PureDate {
        return new PureDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
    }
}
