import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DxDataGridComponent } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { Workbook } from 'exceljs';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';
import { saveExcelFileToLocal } from 'src/app/common/helpers';
import { isNullOrUndefinedOrEmpty } from 'src/app/common/utils';
import { SharedService } from 'src/app/modules/shared/services/shared.service';
import { BatchingReportService } from 'src/app/services/batching-report.service';

import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import {  RouterModule } from '@angular/router';

import { DevExtremeModule } from 'devextreme-angular';
import { ValidationStatus } from 'devextreme/common';
import {ColumnResizeMode} from 'devextreme/common/grids';
import { MaterialModule } from 'src/app/modules/shared/modules/material.module';

@Component({
    standalone: true,
    imports: [CommonModule, RouterModule,SharedModule,MaterialModule,DevExtremeModule],
    selector: 'app-material-list',
    templateUrl: './material-list.component.html',
    styleUrls: ['./material-list.component.scss']
})
export class MaterialListComponent implements OnInit {
    @ViewChild('lumberDataGrid', { static: false }) lumberDataGrid!: DxDataGridComponent;
    @ViewChild('plateDataGrid', { static: false }) plateDataGrid!: DxDataGridComponent;

    editorOptions = {
        showClearButton: true
    };

    dataSourceLumber!: CustomStore;
    dataSourcePlate!: CustomStore;
    lumberSearchResult = '';
    plateSearchResult = '';
    jobKey!: string;

    constructor(
        private sharedService: SharedService,
        private router: Router,
        private route: ActivatedRoute,
        private toastr: ToastrService,
        private batchingReportService: BatchingReportService
    ) {
        this.storeData();
        this.columnChooserModes = [
            {
                key: 'dragAndDrop',
                name: 'Drag and drop'
            },
            {
                key: 'select',
                name: 'Select'
            }
        ];
    }
    pageSizeOptions: number[] = [15, 25, 50, 100];
    selectedPageSize: number = this.pageSizeOptions[0];
    dataGridHeight = 0;
    columnChooserModes: any;
    gridCount = 0;
    private calcDataGridHeight(): void {
        this.dataGridHeight =
            52 +
            60 +
            22 *
                (this.selectedPageSize <= this.gridCount
                    ? this.selectedPageSize
                    : this.gridCount) +
            43;
    }
    storeData(): void {
        const key = 'materialHeight';
        const value = localStorage.getItem(key);
        if (value != null) {
            this.selectedPageSize = Number(value);
        }
        this.calcDataGridHeight();
        this.loadStateOfMyWorkOrdersDGH();
    }

    loadStateOfMyWorkOrdersDGH = () => {
        return this.sharedService.getUserDataQueryPreference('materialHeight');
    };

    saveStateOfMyWorkOrdersDGH = () => {
        this.sharedService.saveUserDataQueryPreference(
            'materialHeight',
            this.selectedPageSize
        );
    };

    onSelectPageSize() {
        this.calcDataGridHeight();
        this.saveStateOfMyWorkOrdersDGH();
    }
    pageSizeTrackByFn(item: number) {
        return item;
    }

    getPageSizeOptionLabelFn(item: number) {
        return item;
    }

    ngOnInit(): void {
        this.jobKey = this.route.snapshot.params['jobKey'];
        this.route.queryParams.subscribe((params: any) => {
            this.lumberSearchResult = params.search;
        });
        this.route.queryParams.subscribe((params: any) => {
            this.plateSearchResult = params.search;
        });
        this.loadLumberData();
        this.loadPlateData();
    }

    loadLumberData() {
        this.dataSourceLumber = new CustomStore({
            key: 'recId',
            load: async (loadOptions: any) => {
                const query: Record<string, string> = {};
                [
                    'filter',
                    'requireTotalCount',
                    'searchExpr',
                    'searchOperation',
                    'searchValue',
                    'sort',
                    'skip',
                    'take'
                ].forEach(function (i) {
                    if (
                        i in loadOptions &&
                        !isNullOrUndefinedOrEmpty<any>(loadOptions[i])
                    ) {
                        query[i] = JSON.stringify(loadOptions[i]);
                    }
                });
                return await firstValueFrom(
                    this.batchingReportService.getLumberMaterials(this.jobKey, query)
                )
                    .then((res) => {
                        if (res && res.success) {
                            this.gridCount = res.data?.data.length || 0;
                            return {
                                data: res.data?.data || [],
                                totalCount: res.data?.totalCount
                            };
                        }
                        this.gridCount = 0;
                        return {
                            data: [],
                            totalCount: 0
                        };
                    })
                    .catch((err) => {
                        console.error(err);
                        this.gridCount = 0;
                        return {
                            data: [],
                            totalCount: 0
                        };
                    })
                    .finally(() => {
                        this.storeData();
                    });
            }
        });
    }

    loadPlateData() {
        this.dataSourcePlate = new CustomStore({
            key: 'recId',
            load: async (loadOptions: any) => {
                const query: Record<string, string> = {};
                [
                    'filter',
                    'requireTotalCount',
                    'searchExpr',
                    'searchOperation',
                    'searchValue',
                    'sort',
                    'skip',
                    'take'
                ].forEach(function (i) {
                    if (
                        i in loadOptions &&
                        !isNullOrUndefinedOrEmpty<any>(loadOptions[i])
                    ) {
                        query[i] = JSON.stringify(loadOptions[i]);
                    }
                });
                return await firstValueFrom(
                    this.batchingReportService.getPlateMaterials(this.jobKey, query)
                )
                    .then((res) => {
                        if (res && res.success) {
                            return {
                                data: res.data?.data || [],
                                totalCount: res.data?.totalCount
                            };
                        }
                        return {
                            data: [],
                            totalCount: 0
                        };
                    })
                    .catch((err) => {
                        console.error(err);
                        return {
                            data: [],
                            totalCount: 0
                        };
                    })
                    .finally(() => {
                        this.storeData();
                    });
            }
        });
    }

    loadStateLumber = () => {
        var state: any = this.sharedService.getUserDataQueryPreference('lumberDatagrid');
        if (state) {
            if (state.pageIndex) {
                state.pageIndex = 0;
            }
            if (state.searchText) {
                state.searchText = '';
            }
            if (state.selectedRowKeys) {
                state.selectedRowKeys = [];
            }
            for (var i = 0; i < state.columns.length; i++) {
                delete state.columns[i].filterValue;
                delete state.columns[i].sortIndex;
                delete state.columns[i].sortOrder;
            }
        }
        return state;
    };

    saveStateLumber = (state: any) => {
        if (state) {
            if (state.pageIndex) {
                state.pageIndex = 0;
            }
            if (state.searchText) {
                state.searchText = '';
            }
            if (state.selectedRowKeys) {
                state.selectedRowKeys = [];
            }
            for (var i = 0; i < state.columns.length; i++) {
                delete state.columns[i].filterValue;
                delete state.columns[i].sortIndex;
                delete state.columns[i].sortOrder;
            }
        }
        this.sharedService.saveUserDataQueryPreference('lumberDatagrid', state);
    };

    loadStatePlate = () => {
        var state: any = this.sharedService.getUserDataQueryPreference('plateDatagrid');
        if (state) {
            if (state.pageIndex) {
                state.pageIndex = 0;
            }
            if (state.searchText) {
                state.searchText = '';
            }
            if (state.selectedRowKeys) {
                state.selectedRowKeys = [];
            }
            for (var i = 0; i < state.columns.length; i++) {
                delete state.columns[i].filterValue;
                delete state.columns[i].sortIndex;
                delete state.columns[i].sortOrder;
            }
        }
        return state;
    };

    saveStatePlate = (state: any) => {
        if (state) {
            if (state.pageIndex) {
                state.pageIndex = 0;
            }
            if (state.searchText) {
                state.searchText = '';
            }
            if (state.selectedRowKeys) {
                state.selectedRowKeys = [];
            }
            for (var i = 0; i < state.columns.length; i++) {
                delete state.columns[i].filterValue;
                delete state.columns[i].sortIndex;
                delete state.columns[i].sortOrder;
            }
        }
        this.sharedService.saveUserDataQueryPreference('plateDatagrid', state);
    };

    resetStateLumber() {
        const savedState = this.loadStateLumber();
        this.lumberDataGrid.instance.getScrollable().scrollTo(0);
        this.lumberDataGrid.instance.state(savedState);
    }

    resetStatePlate() {
        const savedState = this.loadStatePlate();
        this.plateDataGrid.instance.getScrollable().scrollTo(0);
        this.plateDataGrid.instance.state(savedState);
    }

    onLumberExporting(e: any) {
        const name = 'LumberMaterials';
        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet(name);
        exportDataGrid({
            component: e.component,
            worksheet: worksheet
        }).then(() => saveExcelFileToLocal(workbook, name));
        e.cancel = true;
    }

    onPlateExporting(e: any) {
        const name = 'PlateMaterials';
        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet(name);
        exportDataGrid({
            component: e.component,
            worksheet: worksheet
        }).then(() => saveExcelFileToLocal(workbook, name));
        e.cancel = true;
    }
}
