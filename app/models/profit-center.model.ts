export interface ProfitCenter {
    recId: number;
    locationId: number;
    name: string;
    descr: string;
    isActive: boolean;
    isDeleted: boolean;
    sort: number;
}

export interface CreateProfitCenterAndResources {
    businessLine: CreateProfitCenter;
    resourceIds: number[];
}

export interface UpdateProfitCenterAndResources {
    businessLine: ProfitCenter;
    resourceIds: number[];
}

export interface CreateProfitCenter {
    locationId: number;
    name: string;
    descr: string;
    isActive: boolean;
    isDeleted: boolean;
    sort: number;
}

export interface GetProfitCentersByNameRequest {
    locationId: number;
    resourceLine?: string | null;
    limit?: number | null;
}

export interface ResourceItemForList {
    resourceId?: number;
    location?: string;
    resourceName?: string;
    resourceDepartment?: string;
    searchText?: string;
}

export interface GetResourceItemForListRequest {
    businessLineId: number;
    locationId: number;
    limit?: number | null;
}
