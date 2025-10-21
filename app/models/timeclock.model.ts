export interface TimeClock {
    timeClockId: number;
    shiftDayId: number | null;
    prodDate: Date | string | null;
    employeeNum: number;
    start: Date | string | null;
    stop: Date | string | null;
    crew: string | null;
    activity: string | null;
    device: string | null;
    tsheetLogId: number | null;
    department: string | null;
    approved: number | null;
    orgStart: Date | string | null;
    orgStop: Date | string | null;
    reviewed: string | null;
    rCodes: string | null;
    dailyBonus: number | null;
    weeklyBonus: number | null;
    points: number | null;
    reason: string | null;
    notes: string | null;
}

