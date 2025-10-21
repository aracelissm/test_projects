import { Null } from './general.model';
import { User } from './user.model';

export interface StateBasicTaxRate {
    id: number;
    state: string;
    basicTaxRate: number;
    effectiveYear: number;
    createdByUserId: number | null;
    createdAt: Date | string | null;
    updatedByUserId: number | null;
    updatedAt: Date | string | null;
    isDeleted: boolean;
    deletedByUserId: number | null;
    deletedAt: Date | string | null;
    // deletedAt: Date | string | number | null;
    createdByUser: Null<User>;
    updatedByUser: Null<User>;
    deletedByUser: Null<User>;
}

export interface CreateStateBasicTaxRate {
    state: string;
    basicTaxRate: number;
    effectiveYear: number;
}

export interface UpdateStateBasicTaxRate {
    id: number;
    state: string;
    basicTaxRate: number;
    effectiveYear: number;
}
