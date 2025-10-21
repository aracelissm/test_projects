export interface ProductionCalendar {
    LocationID: number;
    location: string;
    ShiftDate: Date;
    Title: string;
    production: boolean;
    shipping: boolean;
    safety: boolean;
    halfday: boolean;
    newweek: boolean;
    newmonth: boolean;
    volunteer: boolean;
    PermitEarlyClockOut: boolean;
    injuries: number;
    SawStartTime: Date;
    SawEndTime: Date;
    SawShiftHours: number;
    TableStartTime: Date;
    TableEndTime: Date;
    TableShiftHours: number;
}

export interface Holiday {
    date: Date;
    holidayName: string;
    plant: string;
    note: string;
}

export interface GetProductionCalendarDayRequest {
    date: string;
    locationName: string;
    shiftName: string;
}

export interface GetProductionCalendarRangeRequest {
    beginDate: string;
    endDate: string;
    locationName: string;
    shiftNames: string;
}

export interface GetHolidaysForPlantRequest {
    locationName: string;
    includeFederal: boolean;
}
