export interface DataFilter {
    locationId: number;
    selectedFilter: string | null;
    selectedDropdown: string | null;
    widgetRef: string;
}

export interface WidgetDisplayFilter {
    widgetRef: string;
    widgetFilter: string | null;
}

export interface WidgetDisplayConfig {
    chartConfig: DataChartConfig;
    tableConfig: DataTableConfig;
}

export interface DataChartConfig {
    chartSeries: DataChartSeries[];
    commonChartSeries: DataChartCommonSeries;
}

export interface DataTableConfig {
    tableColumns: DataTableColumn[];
}

export interface DataChartSeries {
    name: string;
    valueField: string;
    stack: string;
    color: string;
}

export interface DataChartCommonSeries {
    argumentField: string;
    argumentType: string;
    chartType: string;
}

export interface DataTableColumn {
    caption: string;
    dataField: string;
    dataType: string;
    alignment: string;
}

export interface GetWidgetFilters {
    componentRef: string;
    locationId: number;
}