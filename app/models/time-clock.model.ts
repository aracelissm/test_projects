import { Employee } from "./employee.model";
import { Null } from "./general.model";

export interface TimeClockIn {
    startDateTime: string | number | Date | any;
    stopDateTime: string | number | Date | any;
    location?: Null<string> | any;
    clockEmployeeForFullShift: boolean | any;
    shift: Null<string> | any;
    startTime:Null<string> | any;
    stopTime: Null<string> | any;
}

export interface TimeClockInRequest{
    employees: Employee[];
    timeManagerClockIn: TimeClockIn;
}


export interface UpdateTimeClockRequest{
    employees: Employee;
    timeManagerClockIn: TimeClockIn;
    timeClockId:number

}


export interface  TimeManagerShiftDetail{
    code: string;
    weekDay: number;
    startTime: Date;
    endTime:Date;
    title: string;
}

export interface  TimeManagerClockOut{
    timeClockIdSAndEmployeeIds: {timeClockID:number,
        employeeID:number}[] ;
    stopTime:Null<string> | any;
}

export interface GetSupervisorMinDateRanage{
    min: Date | string |number ;
}
