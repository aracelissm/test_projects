export interface Department {
    id: number;
    locationId: number;
    name: string;
    description: string | null;
    isActive: boolean;
    sort: number | null;
    isDeleted: boolean;
    permissionCode: string;
    defaultFetchStation: string | null;
    overAllTargetPercent: number;
    location: Location | null;
    locationName?: string;
}

export interface CreateDepartment {
    //locationName: any;
    locationId: number;
    name: string;
    description: string | null;
    isActive: boolean;
    sort: number | null;
    isDeleted: boolean;
    permissionCode: string;
    overAllTargetPercent: number;
}

export interface GetDepartmentsByNameRequest {
    locationId: number;
    departmentName?: string | null;
    limit?: number | null;
}
