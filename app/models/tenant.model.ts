import * as internal from 'stream';

export interface Tenant {
    id: number;
    companyName: string;
    isActive: boolean;
    tenantsLocations: any[];
    isSSOEnable: boolean;
    logo: string;
    // TODO: Remove this commented out code block
    // userId: number;
    // user: User;
}

export interface CreateTenantRequest {
    companyName: string;
    // userId: number;
    locationIds: any[];
    isSSOEnable: boolean;
    // TODO: Remove this commented out code block
    // userId: number;
}

export interface UpdateTenantRequest {
    id: number;
    companyName: string;
    isActive: boolean;
    locationIds: number[];
    isSSOEnable: boolean;
    // TODO: Remove this commented out code block
    // user: UpdateUser;
}

export interface GetTenantOptionsRequest {
    companyName?: string | null;
    limit?: number | null;
}

export interface GetTenantOptionsResponse {
    id: number;
    companyName: string;
    isActive: boolean;
}
