export interface ReportFilterDTO {
    reportName: string;
    filterId: number;
    dataField: string;
    reportId: number;
    filterName: string;
    controlType: string;
    sourceValues: string[];
    spParamName: string; // Mapped from "ParamName"
    dispalyName: string;
    position: number;
    isPrimaryFilter: boolean;
    defaultValue: string;
    maxLength: number;
    minDate: string;
    maxDate: string;
    columnWidth: number;
    hasLazyLoading: boolean;
    paramValue: string;
    isMandatory: boolean;
    sourceList: ReportDropdownDTO[];
  
     sourceType?: string;
     sourceQuery?: string;
  
  }
  
  export interface ReportDropdownDTO {
    text?: string;
    value?: string;
  }
  
  