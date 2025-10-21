export interface DesignRE {
    id: number;
    rEKey: string;
    rEComment?: string;
    locationId: number;
    isActive: boolean;
    //In essence a soft delete property however we still show these records
    isDisabled: boolean;
}

export interface CreateDesignRERequest {
    rEKey: string;
    rEComment?: string;
    locationId: number;
    isActive: boolean;
}

export interface UpdateDesignRERequest {
    id: number;
    rEKey: string;
    rEComment?: string;
    locationId: number;
    isActive: boolean;
    isDisabled: boolean;
}
  

export interface DesignREItem {
    id: number;
    designREKey: string;
    jobType: string;
    bdftPerHour: number;
    locationId: number;
    isDeleted: boolean;
}

export interface CreateDesignREItemRequest {
    designREKey: string;
    jobType: string;
    bdftPerHour: number;
    locationId: number;
}

export interface UpdateDesignREItemRequest {
    id: number;
    designREKey: string;
    jobType: string;
    bdftPerHour: number;
    locationId: number;
}

export interface DesignerTrackingDashboardChartResponse {
  designerTrackingChartData: DesignerTrackingChartData[];
}

export interface DesignerTrackingChartData {
  designerName: string;
  jobNumber?: string;
  jobType: string;
  averageBoardFeetPerHour: number;
  location?: string;
  customer?: string;
  subdivision?: string;
}

export interface DesignerTrackingSummaryGridData {
  location: string;
  shiftDay: string;
  designerName: string;
  activity: string;
  workOrderId: number,
  jobType: string;
  customer: string;
  subdivision: string;
  lotBlockModel: string;
  masterNumber: string;
  jobNumber: string;
  jobBdft: string;
  // workOrderStart: Date;
  // workOrderStartTime: string;
  // workOrderStop: Date;
  // workOrderStopTime: string;
  bdftCompleted?: number;
  timeHours?: number;
  bdftPerHour?: number;
}

