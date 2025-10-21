export interface ShiftTitle {
    rec_ID: number;
    locationID: number;
    title: string;
    descr: string;
    calendarColor: string;
    isActive: boolean;
    isDeleted: boolean;
    sort: number;
}

export interface CreateShiftTitle {
    locationID: number;
    title: string;
    descr: string;
    calendarColor: string;
    isActive: boolean;
    sort: number;
}

export interface GetShiftTitlesByNameRequest {
    locationId: number;
    shiftTitle?: string | null;
    limit?: number | null;
}
