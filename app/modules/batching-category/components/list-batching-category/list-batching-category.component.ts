import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DxDataGridComponent } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { Workbook } from 'exceljs';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';
import { isNullOrUndefinedOrEmpty } from 'src/app/common/utils';
import { confirm } from 'devextreme/ui/dialog';
import { saveExcelFileToLocal } from 'src/app/common/helpers';
import { BatchingCategoryService } from 'src/app/services/batching-category.service';
import { DatePipe } from '@angular/common';
import { BatchingCategory } from 'src/app/models/batching-category.model';
import { SharedService } from 'src/app/modules/shared/services/shared.service';
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
    selector: 'app-list-batching-category',
    templateUrl: './list-batching-category.component.html',
    styleUrls: ['./list-batching-category.component.scss']
})
export class ListBatchingCategoryComponent implements OnInit, AfterViewInit {
    @ViewChild(DxDataGridComponent, { static: false }) dataGrid!: DxDataGridComponent;

    locationId = -1;
    dataSource!: CustomStore;
    searchResult = '';
    editorOptions = {
        showClearButton: true
    };
    nameHead: any;
    recordId: any;

    constructor(
        private batchingCategoryService: BatchingCategoryService,
        private router: Router,
        private route: ActivatedRoute,
        private toastr: ToastrService,
        private datepipe: DatePipe,
        public sharedService: SharedService,
        private gridConfigService: GridConfigurationService
    ) {
        this.onClickEditBatchingCategory = this.onClickEditBatchingCategory.bind(this);
        this.onClickDeleteBatchingCategory =
            this.onClickDeleteBatchingCategory.bind(this);
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
            47 +
            60 +
            34 *
                (this.selectedPageSize <= this.gridCount
                    ? this.selectedPageSize
                    : this.gridCount) +
            43;
    }
    storeData(): void {
        const key = 'listBatchingHeight';
        const value = localStorage.getItem(key);
        if (value != null) {
            this.selectedPageSize = Number(value);
        }
        this.calcDataGridHeight();
        this.loadStateOfMyWorkOrdersDGH();
    }

    loadStateOfMyWorkOrdersDGH = () => {
        return this.sharedService.getUserDataQueryPreference('listBatchingHeight');
    };

    saveStateOfMyWorkOrdersDGH = () => {
        this.sharedService.saveUserDataQueryPreference(
            'listBatchingHeight',
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
        return this.sharedService.getUserDataQueryPreference('batchingGrid');
    };

    saveState = (state: any) => {
        this.sharedService.saveUserDataQueryPreference('batchingGrid', state);
    };
    ngAfterViewInit(): void {
        const defaultOptions = this.gridConfigService.getCommonGridOptions();
        this.dataGrid.instance.option(defaultOptions);
        this.sharedService.selectedPlantLocation$.subscribe((data) => {
            if (data) {
                this.locationId = data.locationId;
                // Update Filter for grid.
                this.dataGrid.instance.filter(['locationID', '=', this.locationId]);
            }
        });
    }

    ngOnInit(): void {
        this.route.queryParams.subscribe((params: any) => {
            this.searchResult = params.search;
        });
        this.setupDataSource();
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
                    this.batchingCategoryService.getBatchingCategories(query)
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

    onClickCreateBatchingCategory() {
        this.router.navigate(['/batching-category/create-batching-category']);
    }
    successmsg(msg: any) {
        this.toastr.success(msg);
    }
    onClickEditBatchingCategory(e: any) {
        this.router.navigate([
            '/batching-category/add-edit-batching-category',
            e.row.data.id
        ]);
    }

    onClickDeleteBatchingCategory(e: any) {
        const id = e.row.data.id;
        const itemName = e.row.data.name;
        const itemDescription = e.row.data.descr;
        document.documentElement.style.overflow = 'hidden';
        confirm(
            'Are you sure you want to delete the batching category: ' +
                id +
                ' - ' +
                itemName +
                ' - ' +
                itemDescription +
                '?',
            ''
        ).then((res: boolean) => {
            if (res === true) {
                this.batchingCategoryService
                    .deleteBatchingCategory(id)
                    .subscribe((res) => {
                        if (res && res.success) {
                            this.successmsg('Batching category is deleted');
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
        const name = 'Batching Categories';
        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet(name);
        exportDataGrid({
            component: e.component,
            worksheet: worksheet
        }).then(() => saveExcelFileToLocal(workbook, name));
        e.cancel = true;
    }
}
