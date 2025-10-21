export enum EWorkOrderCalendarSchedulerTimeFrames {
    Day = 1,
    Week = 2,
    WorkWeek = 3,
    Month = 4
}

export enum EWorkOrderStatus {
    Dispatcher = 'D',
    Reserved = 'R',
    Scheduled = 'S',
    FetchedCompleted = 'F',
    LiveDeckInProgress = 'L',
    PartialComplete = 'P',
    Completed = 'C'
}

// AKA ResourceGroups
export enum EDepartments {
    Bidding = 'Bidding',
    Engineering = 'Engineering',
    Saw = 'Saw',
    Table = 'Table',
    Shipping = 'Shipping'
}

export enum EWorkOrderActivity {
    Check = 'Check',
    SealsInbox = 'Seals-Inbox',
    SealsCorrected = 'Seals-Corrected',
    SealsReview = 'Seals-Review',
    SealsRejected = 'Seals-Rejected',
    Pricing = 'Pricing',
    Repeat = 'Repeat',
    Shipping = 'Shipping'
}

export enum EWorkOrderProcessActionType {
    CompleteWorkOrder,
    CompleteWOAndApproveSeal,
    CompleteWOAndRejectSeal
}
