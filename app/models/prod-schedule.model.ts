import { ShiftDay } from './shift-day.model';

export interface ProdSchedule {
    rec_Id: number;
    prod_date: Date;
    cday: string;
    production: boolean;
    shipping: boolean;
    safety: boolean;
    injuries: number;
    halfday: boolean;
    newweek: boolean;
    newmonth: boolean;
    newyear: boolean;
    reported: string;
    DayRE: number;
    NightRE: number;
    volunteer: boolean;
    LocationID: number;
}

export class ProdScheduleDefault implements ProdSchedule {
    constructor() {}
    rec_Id = -1;
    prod_date: Date = new Date(1990, 1, 1);
    cday = 'Testdayta';
    production = false;
    shipping = false;
    safety = false;
    injuries = 0;
    halfday = false;
    newweek = false;
    newmonth = false;
    newyear = false;
    reported = '';
    DayRE = 0;
    NightRE = 0;
    volunteer = false;
    LocationID = -1;
}

export interface CreateProdSchedule {
    prod_date: Date;
    cday: string;
    production: boolean;
    shipping: boolean;
    safety: boolean;
    injuries: number;
    halfday: boolean;
    newweek: boolean;
    newmonth: boolean;
    newyear: boolean;
    reported: string | undefined;
    DayRE: number | undefined;
    NightRE: number | undefined;
    volunteer: boolean;
    LocationID: number;
}

export interface ProdScheduleDeleteResponse {
    deletedProdSchedule: ProdSchedule;
    deletedShiftDayIds: number[];
}

export interface ProdScheduleMassAdd {
    dates: Date[];
    prodSchedule: CreateProdSchedule;
    shiftDays: ShiftDay[];
}

export interface ProdScheduleMassAddResult {
    dates: Date[];
    prodSchedules: ProdSchedule[];
    shiftDays: ShiftDay[];
    message: string;
}
