// Permission

export interface Permission {
    id: number;
    name: string;
    code: string;
    description: string;
    belongsToModule: string;
}

export interface CreatePermission {
    name: string;
    code: string;
    description: string;
    belongsToModule: string;
}

export interface GetPermissionsByNameRequest {
    locationId: number;
    shiftTitle?: string | null;
    limit?: number | null;
}

// Role Permission

export interface CreateRolePermission {
    roleId: number;
    permissionIds: Permission[];
}

export interface SavedRolePermissions {
    id: number;
    roleId: number;
    permissionId: number;
}
