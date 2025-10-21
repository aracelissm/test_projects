import { Location } from './location.model';

export interface Shift {
    shiftId: number;
    locationId: number | null;
    title: string | null;
    location: string | null;
    weekDay: number | null;
    start: string | number | Date | null;
    morningBreakStart: string | number | Date | null;
    lunchStart: string | number | Date | null;
    afternoonBreakStart: string | number | Date | null;
    end: string | number | Date | null;
    breakLength: number | null;
    lunchLength: number | null;
    bonusTriggerRate: number | null;
    isDeleted: boolean;
    locationDetails: Location | null;
}
export interface CreateShift {
    //   shiftId: number;
    locationId: number;
    title: string;
    location: string;
    weekDay: number;
    start: any;
    morningBreakStart: any;
    lunchStart: any;
    afternoonBreakStart: any;
    end: any;
    breakLength: number;
    lunchLength: number;
    bonusTriggerRate: number;
    //locationDetails: string;
}
export interface UpdateShift {
    shiftId: number;
    locationId: number;
    title: string;
    location: string;
    weekDay: number;
    start: any;
    morningBreakStart: any;
    lunchStart: any;
    afternoonBreakStart: any;
    end: any;
    breakLength: number;
    lunchLength: number;
    bonusTriggerRate: number;
    //locationDetails: string;
}
export interface GetShiftsById {
    shiftId: number;
    locationId: number;
    title: string;
    location: string;
    weekDay: number;
    start: any;
    morningBreakStart: any;
    lunchStart: any;
    afternoonBreakStart: any;
    end: any;
    breakLength: number;
    lunchLength: number;
    bonusTriggerRate: number;
    //locationDetails: string;
}

export interface WeekDay {
    id: number;
    weekday: string;
}
export interface GetLocationsRequest {
    locationName?: string | null;
    limit?: number | null;
}
export interface GetLocations {
    location: string | null;
}
