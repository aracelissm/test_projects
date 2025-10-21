import { EDefaultRoles } from '../enums/role';
import { BaseEntity, Null } from './general.model';
import { Location } from './location.model';
import { Device } from './device.model';
import { Permission } from './permission.model';
import { Role } from './role.model';
import { Tenant } from './tenant.model';
import { UserGroup } from './usergroup.model';

export interface User extends BaseEntity {
    id: number;
    email: string;
    userName: string;
    firstName: string;
    lastName: string;
    companyName: string;
    isActive: boolean;
    departmentId: number | null;
    shopDeviceId: number | null;
    windowsServiceLogLevelsToStore: string | null;
    isEmailVerified: boolean;
    employeeNumber: number | null;
    userGroupId: number;
    userGroup: UserGroup | null;
    parentTenantId: number | null;
    parentTenant: Tenant | null;
    // TODO: Remove this commented out code block
    // tenant: Tenant | null;
    userRoles: UserRole[];
    userLocations: UserLocations[];
    userTenantLocationHistories: UserTenantLocationhistory[];
}

export interface UserRole {
    id: number;
    userId: number;
    user: User;
    roleId: number;
    role: Role;
}

export interface CreateUserRoles {
    roleId: number;
    userIds: number[];
}

export interface UserTenantLocationhistory {
    userId: number;
    locationId: number;
    tenantId: number;
    location: Null<Location>;
    tenant: Tenant;
    id: number;
}
export interface CreateTenantLocationhistory {
    locationId: number;
    tenantId: number | null;
    changeLog: string | null;
}

export interface UserLocations {
    locationId: number;
}
export interface GetUsersRequest {
    parentTenantIds?: string | null;
    [key: string]: any;
}

export interface CreateUser {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    // companyName: string;
    // isActive: boolean;
    employeeNumber: number | null;
    parentTenantId?: number | null;
    roleIds?: number[];
    locationIds?: number[];
    deviceIds?: number[];
    departmentId: number | null;
    shopDeviceId: number | null;
    windowsServiceLogLevelsToStore?: string | null;
}

export interface UpdateUser {
    id: number;
    firstName: string;
    lastName: string;
    userName: string;
    // email: string;
    // companyName: string;
    isActive: boolean;
    resetPasswordForShopUser: boolean;
    password?: string;
    confirmPassword?: string;
    employeeNumber: number | null;
    shopDeviceId: number | null;
    departmentId: number | null;
    roleIds?: number[];
    locationIds?: number[];
    deviceIds?: number[];
    windowsServiceLogLevelsToStore?: string | null;
}

export class LoggedInUser {
    id!: number;
    email!: string;
    userName!: string;
    firstName!: string;
    lastName!: string;
    userGroup!: UserGroup | null;
    parentTenant!: Tenant | null;
    // TODO: Remove this commented out code block
    // tenant!: Tenant | null;
    parentTenantId!: number;
    defaultLocationId?: number;
    roles: Role[] = [];
    permissions: Permission[] = [];
    delegatedUser?: DelegatedUser | null;
    delegatedTenant?: DelegatedTenant | null;
    userTenantLocationHistories: UserTenantLocationhistory[] = [];
    employeeNumber?: number;
    shopDeviceId?: number;

    get getFullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }
}

export class DelegatedUser {
    id!: number;
    email!: string;
    userName!: string;
    firstName!: string;
    lastName!: string;
    userGroup!: UserGroup | null;
    parentTenant!: Tenant | null;
    // tenant!: Tenant | null;
    roles: Role[] = [];
    permissions: Permission[] = [];
}

export class DelegatedTenant {
    id!: number;
    companyName!: string;
    // roles: EDefaultRoles[] = [];
}

export interface GetUserOptionsRequest {
    email?: string | null;
    limit?: number | null;
}

export interface GetUserOptionsResponse {
    id: number;
    email: string;
}

export interface GetDevicesUnderMyMentorshipRequest {
    prependDeviceAssociatedWithLoggedInUser?: boolean | null;
}

export interface MentorMentee {
    id: number;
    mentorUserId: number;
    menteeDeviceId: number;
    mentorUser?: User | null;
    menteeDevice?: Device | null;
}

export interface TenantIpConfig {
    id: number;
    tenantId: number;
    locationId: number;
    ipAddress: string;
    type: string;
}
