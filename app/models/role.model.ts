import { Permission } from './permission.model';

export interface Role {
    id: number;
    code: string;
    name: string;
    description: string;
    rolePermissions: RolePermission[];
}

export interface RolePermission {
    id: number;
    roleId: number;
    permissionId: number;
    permission: Permission;
}

export interface CreateRole {
    id: number;
    code: string;
    name: string;
    description: string;
}

export interface UpdateRole {
    id: number;
    code: string;
    name: string;
    description: string;
}
