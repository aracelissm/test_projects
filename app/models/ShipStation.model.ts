export interface ShipStationRequest {
    woid: number;
    esdJobkey: string;
    esdMark: string;
    esdTitle: string;
    esdStatus: string;
    jobCustomerKey: string;
    jobRef: string;
    driverInstruction: string;
    deliveryInstruction: string;
    scheduleDate: string;
    isFirstRow: boolean;
    location: string;
    project: string
}

export interface ShippingDetailRequest {
    woid: number;
    title?: string;
    employeeNumber: number;
    MilageOut?: number;
    TruckID?: number;
    location?: string
    onlyUploadFiles?: boolean
    notes?: string
    MilageIn?: number
}

export interface ImagePreview {
    name: string;
    number: number
}

export interface ShippingStationImageResponse{
    imageblob: string;
    contentType: string;
    imageName: string;
}