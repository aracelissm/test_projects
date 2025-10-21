import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DxDataGridComponent } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { Workbook } from 'exceljs';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';
import { isNullOrUndefined, isNullOrUndefinedOrEmpty } from 'src/app/common/utils';
import { confirm } from 'devextreme/ui/dialog';
import { saveExcelFileToLocal } from 'src/app/common/helpers';
import { BatchingFamilyService } from 'src/app/services/batching-family.service';
import { DatePipe } from '@angular/common';
import {
    BatchingFamily,
    BatchingFamilyGridItem
} from 'src/app/models/batching-family.model';
import { SharedService } from 'src/app/modules/shared/services/shared.service';
import {
    BatchingCategory,
    GetBatchingCategoriesByNameRequest
} from 'src/app/models/batching-category.model';
import { BatchingCategoryService } from 'src/app/services/batching-category.service';
import { GridConfigurationService } from 'src/app/modules/shared/services/grid-configuration.service';

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
    selector: 'app-list-batching-family',
    templateUrl: './list-batching-family.component.html',
    styleUrls: ['./list-batching-family.component.scss']
})
export class ListBatchingFamilyComponent implements OnInit, AfterViewInit {
    @ViewChild(DxDataGridComponent, { static: false }) dataGrid!: DxDataGridComponent;

    batchingCategoryLookupData: any[] = [];
    locationId = -1;
    dataSource!: CustomStore;
    searchResult = '';
    editorOptions = {
        showClearButton: true
    };
    recordId: any;
    nameHead: any;

    constructor(
        private batchingFamilyService: BatchingFamilyService,
        private batchingCategoryService: BatchingCategoryService,
        private router: Router,
        private route: ActivatedRoute,
        private toastr: ToastrService,
        private datepipe: DatePipe,
        public sharedService: SharedService,
        private gridConfigService: GridConfigurationService
    ) {
        this.onClickEditBatchingFamily = this.onClickEditBatchingFamily.bind(this);
        this.onClickDeleteBatchingFamily = this.onClickDeleteBatchingFamily.bind(this);
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
        const key = 'listBatchingFamilyHeight';
        const value = localStorage.getItem(key);
        if (value != null) {
            this.selectedPageSize = Number(value);
        }
        this.calcDataGridHeight();
        this.loadStateOfMyWorkOrdersDGH();
    }

    loadStateOfMyWorkOrdersDGH = () => {
        return this.sharedService.getUserDataQueryPreference('listBatchingFamilyHeight');
    };

    saveStateOfMyWorkOrdersDGH = () => {
        this.sharedService.saveUserDataQueryPreference(
            'listBatchingFamilyHeight',
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

    isUndo = true;
    onContentReady(e: any) {
        if (
            e.component.getCombinedFilter() !== undefined &&
            e.component.getCombinedFilter().length > 0
        ) {
            this.isUndo = false;
        } else {
            this.isUndo = true;
        }
    }
    loadState = () => {
        return this.sharedService.getUserDataQueryPreference('batchingFamilyGrid');
    };

    saveState = (state: any) => {
        this.sharedService.saveUserDataQueryPreference('batchingFamilyGrid', state);
    };
    ngAfterViewInit(): void {
        const defaultOptions = this.gridConfigService.getCommonGridOptions();
        this.dataGrid.instance.option(defaultOptions);
        this.sharedService.selectedPlantLocation$.subscribe((data) => {
            if (data) {
                this.locationId = data.locationId;
                // Update Filter for grid.
                this.dataGrid.instance.filter(['locationID', '=', this.locationId]);

                const query: GetBatchingCategoriesByNameRequest = {
                    locationId: this.locationId,
                    limit: 100
                };

                this.batchingCategoryService
                    .getBatchingCategoriesByName(query)
                    .subscribe((data) => {
                        if (data) {
                            if (data.data) {
                                this.batchingCategoryLookupData = data.data;
                                this.batchingCategoryLookupData.splice(0, 0, {
                                    id: -1,
                                    name: '[Not Set]'
                                });
                            }
                        }
                    });
            }
        });
    }

    ngOnInit(): void {
        this.route.queryParams.subscribe((params: any) => {
            this.searchResult = params.search;
        });
        this.setupDataSource();
    }

    getActiveBatchingCategory(rowData: BatchingFamilyGridItem) {
        return !isNullOrUndefined(rowData.batchingCategoryName)
            ? rowData.batchingCategoryName
            : null;
    }

    setupDataSource() {
        this.dataSource = new CustomStore({
            key: 'id',
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
                    this.batchingFamilyService.getBatchingFamilies(query)
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

    onClickCreateBatchingFamily() {
        this.router.navigate(['/batching-family/create-batching-family']);
    }
    successmsg(msg: any) {
        this.toastr.success(msg);
    }
    onClickEditBatchingFamily(e: any) {
        this.router.navigate([
            '/batching-family/add-edit-batching-family',
            e.row.data.id
        ]);
    }

    onClickDeleteBatchingFamily(e: any) {
        const id = e.row.data.id;
        const itemName = e.row.data.name;
        const itemDescription = e.row.data.descr;
        document.documentElement.style.overflow = 'hidden';
        confirm(
            'Are you sure you want to delete the batching family: ' +
                id +
                ' - ' +
                itemName +
                ' - ' +
                itemDescription +
                '?',
            ''
        ).then((res: boolean) => {
            if (res === true) {
                this.batchingFamilyService.deleteBatchingFamily(id).subscribe((res) => {
                    if (res && res.success) {
                        this.successmsg('Batching family is deleted');
                        this.dataGrid.instance.getDataSource().reload();
                    }
                });
            } else {
                document.documentElement.style.overflow = 'auto';
            }
        });
    }

    onGridClickCancel() {
        this.dataGrid.instance.getScrollable().scrollTo(0);
        this.dataGrid.instance.clearFilter();
        this.gridBaseFilter();
    }
    gridBaseFilter() {
        this.dataGrid.instance.filter(['locationID', '=', this.locationId]);
    }

    onExporting(e: any) {
        const name = 'Batching Families';
        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet(name);
        exportDataGrid({
            component: e.component,
            worksheet: worksheet
        }).then(() => saveExcelFileToLocal(workbook, name));
        e.cancel = true;
    }
}
