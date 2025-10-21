export interface Notification {
    recId: number;
    userId: string | null;
    message: string | null;
    occurred: string | number | Date;
    cleared: string | number | Date;
    jobKey: string | null;
}
export interface GetNotifications {
    RecId: number;
    userId: string | null;
    message: string | null;
    occurred: string | number | Date;
    cleared: string | number | Date;
    jobKey: string | null;
    status: string| null;
}
export interface GetNotificationsById {
    recId?: number;
    userId?: string | null;
    message?: string | null;
    occurred?: string | number | Date;
    cleared?: string | number | Date;
    jobKey?: string | null;
    status: string| null;
}
export interface UpdateReminder {
    recId: number;
    message?: string | null;
    occurred?: string | number | Date;
    cleared?: string | number | Date;
    jobKey?: string | null;
}

export interface ReadReminder {
    recId: number;
    userId?: string | null;
    message?: string | null;
    occurred?: string | number | Date;
    cleared?: string | number | Date;
    jobKey?: string;
    seen?: boolean;
}
// export interface NotificationOptions
// {
//   id: number;
//   value: string;
// }

export interface CreateReminder {
    recId?: number;
    userId?: string | null;
    cleared?: string | number | Date;
    occurred?: string | number | Date;
    message?: string | null;
    jobKey?: string | null;
}
export interface GetJobKey {
    reC_ID: number;
    jobKey?: string | null;
}
export interface GetJobKeyInDropDownRequest {
    jobKey?: string | null;
    limit?: number | null;
}

export interface GetJobKeyInDropDownResponse {
    jobKey: string;
}
export interface ReadNotification {
    recId: number;
    userId?: string | null;
    cleared?: string | number | Date;
}
