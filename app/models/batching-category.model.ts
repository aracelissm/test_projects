export interface BatchingCategory {
    id: number;
    locationID: number;
    name: string;
    descr: string;
    isActive: boolean;
    isDeleted: boolean;
    sort: number;
}

export interface CreateBatchingCategory {
    locationID: number;
    name: string;
    descr: string;
    isActive: boolean;
    isDeleted: boolean;
    sort: number;
}

export interface GetBatchingCategoriesByNameRequest {
    locationId: number;
    batchingCategory?: string | null;
    limit?: number | null;
}
