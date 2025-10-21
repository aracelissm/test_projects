export interface JobStatusQueue {
    jobStatusId: number;
    title: string | null;
    description: string | null;
    jobStatusCode: string | null;
    jobGroup: string | null;
    department: string | null;
    activeCode: boolean | null;
    adding: boolean;
    defaultReportName: string | null;
    design: boolean;
    inProduction: boolean;
    listViewName: string | null;
    filterSql: string | null;
    selectSql: string | null;
    sortSql: string | null;
    status: number | null;
    type: number | null;
}
