export interface ReportsModel {
    ParamName: string;
    columnWidth: number;
    controlType: string;
    defaultValue: string;
    dispalyName: string;
    filterName: string;
    active: boolean;
    filterId: number;
    isPrimaryFilter: boolean;
    maxDate: string;
    maxLength: number;
    minDate: string;
    position: number;
    reportName: string;
    sourceValues: Array<string>;
    hasLazyLoading: boolean;
    reportId: number;
    paramValue: string;
    sourceList: SourceList[];
    isMandatory: boolean;
    isReadOnly:boolean;
}
export interface PostData {
    name: string;
    value: string | null;
    filterId?: number;
    dispalyName?: string | null;
    hasLazyLoading?: boolean;
}


export interface TransmittalReportRequest {
    JobNo: string;
    RecId: string;
    Type: string;
    LotBlockModel: string;
}
export interface PrintData {
    header?: string | null;
    key?: string | null;
    width?: number;
}
export interface dynData {
    dataField: string;
    caption: string;
    encodeHtml: boolean;
    dataType: string;
}
export class ReportId {
    id = 1;
    id2 = 2;
    id3 = 3;
}
export interface SearchData {
    searchterm: string;
}
export interface GetFilters {
    filterId: number;
    filterName: string;
    controlType: string;
    sourceType: string;
    sourceValues: string;
}

export interface GetFilterById {
    filterId: number;
    filterName: string;
    controlType: string;
    sourceType: string;
    sourceValues: string;
    sourceQuery: string;
    spParamName: string;
    dataField:string
}

export interface Category {
    categoryId: number;
    categoryName: string;
    active: boolean;
    isDeleted: boolean;
}

export interface CreateReport {
    categoryId: number;
    reportName: string;
    active: boolean;
    permissionAttr: string;
    description: string;
    sPName: string;
    subcategory: string;
    hasLazyLoading: boolean;
    isPdf: boolean;
}

export interface GetReport {
    reportId: number;
    categoryId: number;
    categoryName: string;
    subcategory: string;
    reportName: string;
    permissionAttr: string;
    active: boolean;
    description: string;
    spName: string;
    createdOn: Date | string | null;
    hasLazyLoading: boolean;
    isPdf: boolean;
    isFavorite: boolean;
}

export interface UpdateReport {
    reportId: number;
    categoryId: number;
    reportName: string;
    active: boolean;
    permissionAttr: string;
    description: string;
    sPName: string;
    subcategory: string;
    hasLazyLoading: boolean;
    isPdf: boolean;
}
export interface Category {
    categoryName: string;
    reports: ReportNav[];
}

export interface ReportNav {
    reportId: number;
    reportName: string;
    categoryName: string;
}

export interface CreateFilters {
    filterName: string;
    controlType: string;
    sourceType: string;
    sourceValues: string;
    sourceQuery: string;
    spParamName: string;
    dataField:string
}
export interface UpdateFilters {
    filterId: number;
    filterName: string;
    controlType: string;
    sourceType: string;
    sourceValues: string;
    sourceQuery: string;
    spParamName: string;
    dataField:string;
}
export interface FilterControlType {
    id: number;
    controlType: string;
}
export interface FilterSourceType {
    id: number;
    sourceType: string;
}

export interface ColumnWidth {
    id: number;
    value: number;
}

export interface MaxDate {
    id: number;
    value: string;
}

export interface FilterConfig {
    ConfigId: number;
    ReportId: number;
    FilterId: number;
    DispalyName: string;
    Position: number;
    IsPrimaryFilter: boolean;
    IsMandatory: boolean;
    IsReadOnly:boolean;
    DefaultValue: string;
    MaxLength: number;
    ColumnWidth: number;
}

export interface CreateReportFilterMap {
    ReportId: number;
    FilterId: number;
    DispalyName: string;
    Position: number;
    IsPrimaryFilter: boolean;
    IsMandatory: boolean;
    IsReadOnly:boolean;
    DefaultValue: string;
    MaxLength: number;
    MaxDate: string;
    MinDate: string;
    ColumnWidth: number;
}

export interface ExecutionFilters {
    hasLazyLoading: boolean;
    filtersList: ReportsModel[];
    dataSet: string;
}

export interface UserList {
    id: number;
    firstName?: string;
    lastName?: string;
    email: string;
}
export interface SourceList {
    text: string;
    value: string;
}
export interface defaultReports {
    id: number;
    defaultValue: string;
    active: string;
}
export interface createshare {
    executionId: number;
    sharedTo: string;
    notes: string;
}
export interface createsubscribe {
    executionId?: number;
    scheduleType: string;
    scheduleDays: string;
    scheduleMonths: string;
    scheduleTime: string;
    usersInCC: string;
    status: string;
    subject: string;
    notes: string;
    listConfig: listFilters[];
}
export interface listFilters {
    filterId?: number;
    reportDefaultId: string;
    customValue: string | null;
    filterName?: string;
    defaultValue?: string;
}

export interface dynData{
    dataField: string,
    caption: string,
    encodeHtml: boolean,
    dataType: string
}

export interface EngCoverSheetCriteria
{
    Building_Code : string,
    design_Criteria : string,
    wind_Standard : string,
    wind_Speed : string,
    roofLoad : string,
    floorLoad : string,
    roof_TC_LL : string,
    roof_TC_DL : string,
    roof_BC_LL : string,
    roof_BC_DL : string,
    floor_TC_LL : string,
    floor_TC_DL : string,
    floor_BC_LL : string,
    floor_BC_DL : string,
    roofDuration : string,
    floorDuration: string,
    exposure : string

}

export interface EngineeringCoverSheetReportData
{
    engineeringCoverSheetCriteria: EngCoverSheetCriteria,
    cusT_NAME : string,
    projectName: string,
    address: string,
    lot : string,
    block: string,
    model: string,
    state : string,
    county: string,
    city1: string,
    elevation: string,
    joB_REF3:string
    floorRef:string;
    roofRef:string;
}

export interface Rpt_CustomCols
{
    recId: number | null,
    reportId: number,
    columnNo: number,
    dashboardId: number,
    columnType: string,
    dataType: string,
    isHidden: boolean,
    appendWith: string,
    format: string,
    hyperlinkUrl: string,
    decimals: number,
    columnLabel: string
}

export interface ListRptColumnType
{
    id : number,
    code : string,
    name : string,
    description : string,
    sort : number
}

export interface ListRptColumnDataType
{
    id : number,
    code : string,
    name : string,
    description : string,
    sort : number
}


export interface ReportDropDownRequest {
    jobKey: string;
    filterParam: string;
    reportId: number;
    filterId: number;
}

