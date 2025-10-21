export interface BatchingFamily {
    id: number;
    locationID: number;
    batchingCategoryId: number;
    name: string;
    descr: string;
    isActive: boolean;
    isDeleted: boolean;
    sort: number;
}

export interface BatchingFamilyGridItem {
    id: number;
    locationID: number;
    batchingCategoryId: number;
    batchingCategoryName: string;
    name: string;
    descr: string;
    isActive: boolean;
    isDeleted: boolean;
    sort: number;
}

export interface CreateBatchingFamily {
    locationID: number;
    batchingCategoryId: number;
    name: string;
    descr: string;
    isActive: boolean;
    isDeleted: boolean;
    sort: number;
}

export interface GetBatchingFamiliesByNameRequest {
    locationId: number;
    batchingFamily?: string | null;
    limit?: number | null;
}
