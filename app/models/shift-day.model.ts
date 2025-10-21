export interface ShiftDay {
    shiftDayId: number;
    shiftId: number;
    shiftDate: Date;
    sawStartTime: Date;
    sawEndTime: Date;
    sawShiftHours: number;
    tableStartTime: Date;
    tableEndTime: Date;
    tableShiftHours: number;
}

export class ShiftDayDefault implements ShiftDay {
    shiftDayId = -1;
    shiftId = -1;
    shiftDate: Date = new Date(1990, 0, 1);
    sawStartTime: Date = new Date(1990, 0, 1);
    sawEndTime: Date = new Date(1990, 0, 1);
    sawShiftHours = 0;
    tableStartTime: Date = new Date(1990, 0, 1);
    tableEndTime: Date = new Date(1990, 0, 1);
    tableShiftHours = 0;
}

export interface CreateShiftDay {
    shiftId: number;
    shiftDate: Date | undefined;
    sawStartTime: Date | undefined;
    sawEndTime: Date | undefined;
    sawShiftHours: number | undefined;
    tableStartTime: Date | undefined;
    tableEndTime: Date | undefined;
    tableShiftHours: number | undefined;
}
