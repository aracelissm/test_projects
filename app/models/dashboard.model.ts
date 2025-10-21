import { GridsterItem } from "angular-gridster2";

export interface Dashboard {
    dashboardId: number;
    userId: number;
    name: string;
    isActive: boolean;
    layoutItems: DashboardItem[];
    widgets: DashboardWidget[];
}

export interface DashboardItem extends GridsterItem {
    id: string;
    cols: number;
    rows: number;
    x: number;
    y: number;
}

export interface DashboardWidget {
    id: string;
    componentRef: string;
    selectedFilterOption: string | null;
    selectedDropdownFilterOption: string | null;
    hasGridView: boolean;
    hasChartView: boolean;
    isDataView: boolean;
    navigation: DashboardWidgetNavigation[];
}

export interface DashboardWidgetNavigation {
    componentRef: string;
    selectedFilterOption: string | null;
    selectedDropdownFilterOption: string | null;
    navigationOrder: number;
}
  
export interface Widget {
    id: number;
    name: string;
    componentRef: string;
    imageURL: string;
    refreshInterval: number;
    hasGridView: boolean;
    hasChartView: boolean;
}

export interface WidgetFilterOption {
    optionId: number;
    name: string;
    displayText: string;
    shorthand: string;
    isDefault: boolean;
    isDropdown: boolean;
    optionOrder: number;
}
