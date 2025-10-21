export enum ETimeFrames {
    Month = 'month',
    Day = 'day',
    Week = 'week',
    Quarter = 'quarter'
}

export enum BSTimeFrames {
    Day = 1,
    Week = 2
}

export enum EETimeFrames {
    Day = 1,
    Week = 2,
    Month = 3,
    Quarter = 4
}

export enum EFilters {
    Customer,
    Project
}

export enum EDateToUpdate {
    NewBuildDate = 1, // dbo.JOBHEAD.BUILD_DATE
    NewShipDate = 2 // dbo.JOBHEAD.REQD_DATE
}

export enum EDateUpdationType {
    MoveNoOfDays = 1,
    MoveToParticularDate = 2
}

export enum EForecastingChartSeriesItems {
    ActualRoofBdFt = 'Actual Roof BdFt',
    PlaceholderRoofBdFt = 'Placeholder Roof BdFt',
    ActualFloorBdFt = 'Actual Floor BdFt',
    PlaceholderFloorBdFt = 'Placeholder Floor BdFt',
    ActualPanelBdFt = 'Actual Panel BdFt',
    PlaceholderPanelBdFt = 'Placeholder Panel BdFt',
    ActualTotalBdFt = 'Actual Total BdFt',
    PlaceholderTotalBdFt = 'Placeholder Total BdFt',
    RoofBdFt = 'Roof BdFt',
    FloorBdFt = 'Floor BdFt',
    PanelBdFt = 'Panel BdFt',
    TotalBdFt = 'Total BdFt',
    ChangesInTotalBdFt = 'Changes In Total BdFt',
    ChangesInRoofBdFt = 'Changes In Roof BdFt',
    ChangesInFloorBdFt = 'Changes In Floor BdFt',
    ChangesInPanelBdFt = 'Changes In Panel BdFt',
    AddedBdFt = 'Added BdFt',
    RemovedBdFt = 'Removed BdFt',
    NoChangesInBdFt = 'No Changes In BdFt',
    // TODO: Need to remove the below three lines of code
    TotalBiddingPrice = 'Total Bidding Price',
    TotalEngineeredPrice = 'Total Engineered Price',
    TotalSoldPrice = 'Total Sold Price',
    ActualTotalBiddingPrice = 'Actual Total Bidding Price',
    PlaceholderTotalBiddingPrice = 'Placeholder Total Bidding Price',
    RemovedTotalBiddingPrice = 'Removed Total Bidding Price',
    AddedTotalBiddingPrice = 'Added Total Bidding Price',
    ActualTotalEngineeredPrice = 'Actual Total Engineered Price',
    PlaceholderTotalEngineeredPrice = 'Placeholder Total Engineered Price',
    RemovedTotalEngineeredPrice = 'Removed Total Engineered Price',
    AddedTotalEngineeredPrice = 'Added Total Engineered Price',
    ActualTotalSoldPrice = 'Actual Total Sold Price',
    PlaceholderTotalSoldPrice = 'Placeholder Total Sold Price',
    RemovedTotalSoldPrice = 'Removed Total Sold Price',
    AddedTotalSoldPrice = 'Added Total Sold Price',
    ChangesInTotalBiddingPrice = 'Changes In Total Bidding Price',
    ChangesInTotalEngineeredPrice = 'Changes In Total Engineered Price',
    ChangesInTotalSoldPrice = 'Changes In Total Sold Price',
    NoChangesInTotalBiddingPrice = 'No Changes In Total Bidding Price',
    NoChangesInTotalEngineeredPrice = 'No Changes In Total Engineered Price',
    NoChangesInTotalSoldPrice = 'No Changes In Total Sold Price',
    OverCapacity = 'Over Capacity',
    WorkOrders = 'Work Orders'
}
