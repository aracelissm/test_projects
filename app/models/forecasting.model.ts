import { BSTimeFrames, EDateToUpdate, EETimeFrames } from '../enums/forecasting';
import { EDateUpdationType } from '../enums/forecasting';
import { JobBatchMarkService } from '../services/job-batch-mark.service';
import { BatchingStep } from './batching-step';
import { Initiator } from './job.model';
import { Location } from './location.model';
import { User } from './user.model';

export interface GetForecastingDataRequest {
    timeFrame: string;
    showActuals?: boolean;
    showPlaceholders?: boolean;
    showRoofBdFt?: boolean;
    showFloorBdFt?: boolean;
    showPanelBdFt?: boolean;
    separatePanelsFromTrusses?: boolean;
    skipPanelsWhenCalculatingTotalTrusses?: boolean;
    fromDate?: Date | string | number;
    toDate?: Date | string | number;
    customerKey?: string | null;
    salesmanKey?: string | null;
    projectId?: string | null;
    jobType?: string | null;
    jobStatus?: string | null;
    plantLocation?: string | null;
    siteAddress?: string | null;
    scenarioId?: number | null;
    groupByAccountingMonth?: boolean;
    showOnlyTimeFramesWithChangesInBdFt?: boolean;
    excludeFilters?: boolean;
    showRemainingBdFtOnly?: boolean;
    showTotalBiddingPrice?: boolean;
    showTotalEngineeredPrice?: boolean;
    showTotalSoldPrice?: boolean;
    dateToUse?: string | null;
}

export interface ForecastingData {
    y: number;
    m: number | null;
    d: number | null;
    date: Date | string | null;
    monthStartDate: Date | string | null;
    monthEndDate: Date | string | null;
    w: number | null;
    weekStartDate: Date | string | null;
    weekEndDate: Date | string | null;
    q: number | null;
    quarterStartDate: Date | string | null;
    quarterEndDate: Date | string | null;
    accountingMonth: number | null;
    accountingMonthStartDate: Date | string | null;
    accountingMonthEndDate: Date | string | null;
    isAccountingMonthUsed: boolean | null;
    //#region BreakEven, Budget & Sales - Fetched from viperV2.AccPeriodExtensions by matching dbo.AccPeriods.Rec_id with viperV2.AccPeriodExtensions.AccPeriodRecId
    aggrBreakEvenRoofBdFt: number;
    aggrBreakEvenFloorBdFt: number;
    aggrBreakEvenPanelBdFt: number;
    aggrBudgetRoofBdFt: number;
    aggrBudgetFloorBdFt: number;
    aggrBudgetPanelBdFt: number;
    aggrSalesRoofBdFt: number;
    aggrSalesFloorBdFt: number;
    aggrSalesPanelBdFt: number;
    aggrBreakEvenTotalBdFt: number;
    aggrBudgetTotalBdFt: number;
    aggrSalesTotalBdFt: number;
    //#endregion
    actualRoofBdFt: number;
    actualFloorBdFt: number;
    actualPanelBdFt: number;
    placeholderRoofBdFt: number;
    placeholderFloorBdFt: number;
    placeholderPanelBdFt: number;
    removedRoofBdFt: number;
    removedFloorBdFt: number;
    removedPanelBdFt: number;
    addedRoofBdFt: number;
    addedFloorBdFt: number;
    addedPanelBdFt: number;
    actualTotalBdFt: number;
    placeholderTotalBdFt: number;
    removedTotalBdFt: number;
    addedTotalBdFt: number;
    roofBdFt: number;
    floorBdFt: number;
    panelBdFt: number;
    totalBdFt: number;
    hasChangesInBdFt: boolean;
    changesInRoofBdFt: number;
    changesInFloorBdFt: number;
    changesInPanelBdFt: number;
    changesInTotalBdFt: number;
    // roofCapacityDue?: number;
    // floorCapacityDue?: number;
    // totalCapacityDue?: number;
    roofCapacityDue?: string;
    floorCapacityDue?: string;
    panelCapacityDue?: string;
    totalCapacityDue?: string;
    xAxisLabelForDay?: string;
    xAxisLabelForMonth?: string;
    xAxisLabelForWeek?: string;
    xAxisLabelForQuarter?: string;
    colorForRoofBdFtChanges?: string;
    colorForFloorBdFtChanges?: string;
    colorForPanelBdFtChanges?: string;
    colorForTotalBdFtChanges?: string;
    // color?: string | null;
    // TODO: Need to remove the below three lines of code
    // totalBiddingPrice: number;
    // totalEngineeredPrice: number;
    // totalSoldPrice: number;
    actualTotalBiddingPrice: number;
    placeholderTotalBiddingPrice: number;
    removedTotalBiddingPrice: number;
    addedTotalBiddingPrice: number;
    actualTotalEngineeredPrice: number;
    placeholderTotalEngineeredPrice: number;
    removedTotalEngineeredPrice: number;
    addedTotalEngineeredPrice: number;
    actualTotalSoldPrice: number;
    placeholderTotalSoldPrice: number;
    removedTotalSoldPrice: number;
    addedTotalSoldPrice: number;
    totalBiddingPrice: number;
    totalEngineeredPrice: number;
    totalSoldPrice: number;
    hasChangesInTotalBiddingPrice: boolean;
    hasChangesInTotalEngineeredPrice: boolean;
    hasChangesInTotalSoldPrice: boolean;
    changesInTotalBiddingPrice: number;
    changesInTotalEngineeredPrice: number;
    changesInTotalSoldPrice: number;
    colorForTotalBiddingPriceChanges?: string;
    colorForTotalEngineeredPriceChanges?: string;
    colorForTotalSoldPriceChanges?: string;
    // TODO: Need to Remove all the below Completed & Remaining prefixed properties since we are utilizing the actual, placeholder, removed & added properties itself when we need show only the Remaining BdFt which will be calculated from the Completed BdFt Percent
    // completedActualBdFtPercent: number;
    // completedPlaceholderBdFtPercent: number;
    // completedRemovedBdFtPercent: number;
    // completedAddedBdFtPercent: number;
    remainingActualRoofBdFt: number;
    remainingActualFloorBdFt: number;
    remainingActualPanelBdFt: number;
    remainingPlaceholderRoofBdFt: number;
    remainingPlaceholderFloorBdFt: number;
    remainingPlaceholderPanelBdFt: number;
    remainingRemovedRoofBdFt: number;
    remainingRemovedFloorBdFt: number;
    remainingRemovedPanelBdFt: number;
    remainingAddedRoofBdFt: number;
    remainingAddedFloorBdFt: number;
    remainingAddedPanelBdFt: number;
    remainingActualTotalBdFt: number;
    remainingPlaceholderTotalBdFt: number;
    remainingRemovedTotalBdFt: number;
    remainingAddedTotalBdFt: number;
    skipPanelsWhenCalculatingTotalTrusses: boolean;
}

export interface ForeCastingCapacity extends ForecastingData {
    placeholderTotalBdFtIncOverCap: number;
    placeholderRoofBdFtIncOverCap: number;
    placeholderPanelBdFtIncOverCap: number;
    placeholderFloorBdFtIncOverCap: number;
    dateLabel?: string;
    workOrders: number;
}

export interface GetJobsRequest {
    timeFrame: string;
    showActuals?: boolean;
    showPlaceholders?: boolean;
    separatePanelsFromTrusses?: boolean;
    fromDate?: Date | string | number;
    toDate?: Date | string | number;
    customerKey?: string | null;
    salesmanKey?: string | null;
    projectId?: string | null;
    jobType?: string | null;
    jobStatus?: string | null;
    plantLocation?: string | null;
    siteAddress?: string | null;
    scenarioId?: number | null;
    groupByAccountingDate?: boolean;
    showOnlyJobsWithRoofBdFtGreaterThanZero?: boolean;
    showOnlyJobsWithFloorBdFtGreaterThanZero?: boolean;
    showOnlyJobsWithPanelBdFtGreaterThanZero?: boolean;
    dateToUse?: string | null;
    [key: string]: any;
}

export interface Job {
    recId: number;
    jobKey: string;
    roofBdFt: number;
    floorBdFt: number;
    panelBdFt: number;
    jobLoginDate: Date | string | null;
    reqDate: Date | string | null;
    // NOTE: As per the discussion with Peter of A1Truss Team, we need to use the BUILD_DATE column of JOBHEAD table as the BuildDate.
    buildDate: Date | string | null;
    // NOTE: As per the discussion with Peter of A1Truss Team, we need to use the REQD_DATE column of JOBHEAD table as the ShipDate.
    shipDate: Date | string | null;
    // NOTE: As per the discussion with Peter of A1Truss Team, we need to use the DRAFT_SDATE column of JOBHEAD table as the ReqOrigDate i.e. Requested Original Date.
    reqOrigDate: Date | string | null;
    // NOTE: As per the discussion with Peter of A1Truss Team, we need to use the REQCONFDATE column of JOBHEAD table as the Confirmed Date.
    confirmedDate: Date | string | null;
    plantLocation: string | null;
    jobType: string | null;
    jobStatus: string | null;
    customerKey: string | null;
    customerName: string | null;
    projectId: number | null;
    projectSubdivision: string | null;
    siteAddress: string | null;
    salesmanKey: string | null;
    salesmanName: string | null;
    surtaxCountyId: number | null;
    county: string | null;
    state: string | null;
    lot: string | null;
    block: string | null;
    model: string | null;
    elevation: string | null;
    masteR_NUMBER: string;
    joB_REF1: string | null;
    job_bldg: string | null;
    // NOTE: Property rescheduleCount is the number of times a Job has been rescheduled as part of Scenario Execution.
    rescheduleCount: string;
    accountingDate: Date | string | null;
    isAccountingDateUsed: boolean | null;
    completedBdFtPercent: number;
    remainingBdFt: number;
    totalBiddingPrice: number;
    totalEngineeredPrice: number;
    totalSoldPrice: number;
    optionS1: string;
    optionS2: string;
    optionS3: string;
}

export interface JobForBuildCapacity extends Job {
    joB_PHONE3: string;
    customerId: number;
    contactName: string;
    office_Mobile: string;
    shipTime: string;
    saw_STAT: string;
    ship_STAT: string;
    pcS_SHOP: number;
    shippingComment: string;
    workOrderCount: number;
    days: number;
}

export interface JobHeadWithProject {
    recId: number;
    jobKey: string;
    lot: string;
    block: string;
    parcel: string;
    model: string;
    location: string;
    jobRef2: string;
    jobRef3: string;
    jobDesc: string;
    customer: string;
    salesman: string;
    jobStatus: string;
    designer: string;
    projectId: number;
    invoiceDate: Date;
    shipDate: Date;
    invoiceNum: string;
    jobType: string;
    masterId?: number;
    masterNumber: string;
    subdivision: string;
    jobPO: string;
    soldMisc: number;
    reqDate: Date;
    county: string;
    planRack: string;
    buildDate: Date;
    surtaxCountyID: number;
    jobDirections: string;
    shopEDate: Date;
    invoicePost: string;
    engCompany: string;
    locationName: string;
}

export interface CapacityConfiguration {
    id: number;
    timeFrame: EETimeFrames;
    numberOfDays: number;
    roofCapacity: number;
    floorCapacity: number;
    panelCapacity: number;
    locationId: number;
    location?: Location | null;
    totalCapacity?: number;
}

export interface GetCapacityConfigurationsRequest {
    locationIds?: string | null;
    skipPanelsWhenCalculatingTotalTrusses: boolean;
}

export interface GetCapacityConfigurationsResponse {
    timeFrame: EETimeFrames;
    roofCapacity: number;
    floorCapacity: number;
    panelCapacity: number;
    totalCapacity: number;
    bsTimeFrame: BSTimeFrames;
    skipPanelsWhenCalculatingTotalTrusses: boolean;
}

export interface JobConfiguration {
    id?: number;
    bufferDaysBetweenBuildDateAndShipDate: number;
}

export interface GetCustomersRequest {
    customerName?: string | null;
    showAlsoCustomersWithStatusTarget?: boolean;
    limit?: number | null;
}

export interface GetCustomersResponse {
    customerKey: string;
    customerName: string;
}

export interface GetCustomerOptionsRequest {
    customerKey?: string | null;
    showActiveCustomers?: boolean | null;
    showInActiveCustomers?: boolean | null;
    showTargetCustomers?: boolean | null;
    limit?: number | null;
}

export interface GetCustomerOptionsResponse {
    customerKey: string;
    customerName: string;
}

export interface GetSalesRepresentativeOptionsRequest {
    salesmanName?: string | null;
    fromDate?: Date | string | number;
    toDate?: Date | string | number;
    limit?: number | null;
}

export interface GetProjectsRequest {
    subdivision?: string | null;
    customerKey?: string | null;
    showOnlyProjectsWithFutureJobBuildDate?: boolean;
    limit?: number | null;
}

export interface GetProjectsResponse {
    projectId: number | null;
    subdivision: string;
}

export interface GetJobTypesRequest {
    jobType?: string | null;
    limit?: number | null;
}

export interface GetJobTypesResponse {
    type: string;
}

export interface GetJobTypeCodesRequest {
    jobType?: string | null;
    limit?: number | null;
}

export interface GetJobTypeCodesReponse {
    recId: number;
    group: string;
    code: string;
    description: string;
    order: number;
}

export interface GetPricingCodesRequest {
    pricingCode?: string | null;
    limit?: number | null;
    plantLocation: string;
}

export interface GetPricingCodesReponse {
    rec_id: number;
    level_key: string;
    level_Comment: string;
    create_date: Date;
    created_by: string;
    restricted: boolean;
    isCurrent: boolean;
    lastMod: Date;
    locked: boolean;
    tableRate: number;
    tableSupport: number;
    tableFSupport: number;
    sawRate: number;
    sawSupport: number;
    wave_Cost: number;
    wave_Price: number;
    hS_Cost: number;
    hS_Price: number;
    trulox_Cost: number;
    trulox_Price: number;
    g90_Cost: number;
    g90_Price: number;
    g185_Cost: number;
    g185_Price: number;
    sS_Cost: number;
    sS_Price: number;
    indirectLabor: number;
    location: string;

}

export interface TrussPricingRequest {
    jobKey: string;
    mark: string;
    bidEng: string;
    lumberPriceCode: string;
    roofFloor: string;
    updateJob: boolean;
    printDetail: boolean;
    plateDetail: boolean;
    lumberDetail: boolean;
    batchQty: number;
    priceQty: number;
    jobType: string;
    excludeStdStuds: boolean;
    excludeTopPlatePieces: boolean;
    wallPanelMode: boolean;
    plantLocation: string;
}
export interface PriceTrussResponse {
    success: boolean;
    errors: PriceTrussError[];
    bidCostBreakoutId: number;
}

export interface PriceTrussError {
    errorType: number;
    errorMessage: string;
    arg1: string | null;
    arg2: string | null;
    arg3: string | null;
}

export interface TrussPricingReponse {
    v0_TotalTruss: number;
    v1_BidLumber: number;
    v2_BidPlate: number;
    v3_BidLabor: number;
    v4_TotalManHour: number;
    v5_BdFt: number;
    v6_OverHead: number;
    v7_CalcProfit: number;
    v0f_FloorTotals: number;
    v1f_FloorLumber: number;
    v2f_FloorPlate: number;
    v3f_FloorLabor: number;
    v4F: number;
    v5f_FloorBdFt: number;
    v6f_FloorOverhead: number;
    v7r_FloorCalcProfit: number;
    v0r_RoofTotals: number;
    v1r_RoofLumber: number;
    v2r_RoofPlate: number;
    v3r_RoofLabor: number;
    v4r: number;
    v5r_RoofBdFt: number;
    v6r_RoofOverhead: number;
    v7r_RoofCalcProfit: number;
    v8_PCSEst: number;
    v9_JobSawDirect: number;
    v10_JobSawSupport: number;
    v11_JobTableDirect: number;
    v12_JobTableSupport: number;
    v13_DesignsEst: number;
    v13r_RoofDesignsEst: number;
    v13f_FloorDesignsEst: number;
    v14_TrussesEst: number;
    v14r_NumRoofTrusses: number;
    v14f_NumFloorTrusses: number;
    v15_DelChrg: number;
    v16_OverheadCost: number;
    v17_Profit: number;
    v18_PercentOfNonTrussItems: number;
    TotHardware: number;
    TotBeams: number;
    TableHours: number;
    SawHours: number;
    InFooter: number;
    DeliveryCounty: string;
}

export interface GetJobStatusesRequest {
    jobStatus?: string | null;
    limit?: number | null;
}

export interface GetJobStatusesResponse {
    status: string;
}

export interface GetPlantLocationsRequest {
    plantLocation?: string | null;
    limit?: number | null;
}

export interface GetPlantLocationsResponse {
    location: string;
}

export interface GetSiteAddressesRequest {
    siteAddress?: string | null;
    projectId?: string | null;
    limit?: number | null;
}

export interface GetSiteAddressesResponse {
    address: string;
}

export interface UpdateScenarioRequest {
    id: number;
    name: string;
    comment?: string | null;
    scenarioReasonId?: number | null;
}

export class Scenario {
    id!: number;
    scenarioReasonId!: number | null;
    name!: string;
    comment!: string | null;
    isExecuted!: boolean;
    executedByUserId!: number | null;
    executedAt!: Date | string;
    scenarioReason!: ScenarioReason | null;
    executedByUser!: User | null;
    createdAt!: Date | string | null;
}

export interface ScenarioReason {
    id: number;
    code: string;
    name: string;
    description: string | null;
    initiatorRecordId: number | null;
    initiator: Initiator | null;
}

export interface ScenarioJob {
    id: number;
    recId: number;
    buildDate: Date | string | null;
    newBuildDate: Date | string | null;
    shipDate: Date | string | null;
    newShipDate: Date | string | null;
    scenarioId: number;
}

export interface GetScenarioJobsForScenarioResponse extends Job {
    id: number;
    // NOTE: As per the discussion with Peter of A1Truss Team, we need to use the BUILD_DATE column of JOBHEAD table as the BuildDate.
    newBuildDate: Date | string | null;
    // NOTE: As per the discussion with Peter of A1Truss Team, we need to use the REQD_DATE column of JOBHEAD table as the ShipDate.
    newShipDate: Date | string | null;
    scenarioId: number;
}

export interface GetScenarioJobsSummaryForScenarioResponse {
    scenarioId: number;
    scenarioJobsTotalCount: number | null;
    totalRoofBdFt: number | null;
    totalFloorBdFt: number | null;
    totalPanelBdFt: number | null;
    minNewBuildDate: Date | string | null;
    maxNewBuildDate: Date | string | null;
}

export interface SaveScenarioJobsToScenarioRequest {
    recId: number;
    buildDate: Date | string | null;
    shipDate: Date | string | null;
}

export interface AddJobsToScenarioRequest {
    recId: number;
    buildDate: Date | string | null;
    shipDate: Date | string | null;
}

export interface RemoveJobsFromScenarioRequest {
    recId: number;
}

export interface UpdateScenarioJobRequest {
    id: number;
    newBuildDate?: Date | string | null;
    newShipDate?: Date | string | null;
}

export interface BulkUpdateScenarioJobsRequest {
    scenarioJobIds: number[];
    dateToUpdate: EDateToUpdate;
    dateUpdationType: EDateUpdationType;
    noOfDaysToMove?: number | null;
    particularDateToMove?: Date | string | null;
}

export interface BulkUpdateScenarioJobsDialogData {
    selectedRecIds: {
        id: number;
        recId: number;
    }[];
}

export interface BulkUpdateJobsBuildDateRequest {
    jobRecIds: number[];
    newBuildDate: Date | string;
    updateShipDate: boolean;
    newShipDate?: Date | string;
    currentDateTime: Date | string;
}

export interface BulkUpdateJobsBuildDateDialogData {
    selectedJobs: JobForBuildCapacity[];
}

export interface ExecuteScenarioRequest {
    dateTime: Date | string;
    setReqOrigDateWithNewShipDate?: boolean;
    setReqConfDateWithCurrentDate?: boolean;
}

export type GridData = {
    columns: GridDataColumn[];
    rows: GridDataRow[];
};

export type GridDataRow = string[];

export type GridDataColumn = { header: string; key: string; order: number };

export interface JobForWebScheduler {
    recId: number;
    jobKey: string;
    location: string;
    customerKey: string;
    customerId: number;
    projectSubdivision: string;
    projectId: number;
    joB_REF1: string;
    lot?: string;
    job_Status: string;
    customerNote: string;
    permit: boolean;
    slab: boolean;
    block: boolean;
    beam: boolean;
    currentDelivery: Date | string | null;
    originalRequestedDate: Date | string | null;
    customerUpdateOccurred: Date | string | null;
    customerRequestedDate: Date | string | null;
}

export interface WebScheduelerForecastingDataRequest {
    jobKey?: string | null;
    plantLocation?: string | null;
    dateToUse?: string | null;
}

export interface WebSchedulerForecastingData {
    date: Date | string | null;
    dateLabel?: string;
    roofBdFt: number;
    floorBdFt: number;
    panelBdFt: number;
    totalBdFt: number;
    roofOverCapacity?: number;
    floorOverCapacity: number;
    panelOverCapacity: number;
    totalOverCapacity: number;
}

export interface WebScheduelerRequest {
    jobKey?: string | null;
    requestStatus?: string | null;
    proposed_Date?: Date | string | number;
    JobNotes?: string | null;
}
