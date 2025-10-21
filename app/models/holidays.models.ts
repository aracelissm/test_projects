export interface Holiday {
    id: number;
    note: string;
    type: string;
    day: string;
    date: Date | string | null;
    plant: string;
}


export interface CreateHoliday {
    id: number;
    holidayName: string;
    note: string;
    day: string;
    date: Date | string | null;
    plant: string;
}

export interface UpdateHoliday {
    id: number;
    holidayName: string;
    note: string;
    day: string;
    date: Date | string | null;
    plant: string;
}
