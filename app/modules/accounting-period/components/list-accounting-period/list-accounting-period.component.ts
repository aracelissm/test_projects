import { Component, OnInit, ViewChild } from '@angular/core';
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
import { AccountingPeriodService } from 'src/app/services/accounting-period.service';
import { DatePipe } from '@angular/common';
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
    selector: 'app-list-accounting-period',
    templateUrl: './list-accounting-period.component.html',
    styleUrls: ['./list-accounting-period.component.scss']
})
export class ListAccountingPeriodComponent implements OnInit {
    @ViewChild(DxDataGridComponent, { static: false }) dataGrid!: DxDataGridComponent;
    dataSource!: CustomStore;
    searchResult = '';
    editorOptions = {
        showClearButton: true
    };
    nameHead: any;
    recordId: any;

    constructor(
        private accountingPeriodService: AccountingPeriodService,
        private router: Router,
        private route: ActivatedRoute,
        private toastr: ToastrService,
        private datepipe: DatePipe,
        private sharedService: SharedService,
        private gridConfigService: GridConfigurationService
    ) {
        this.onClickEditAccountingPeriod = this.onClickEditAccountingPeriod.bind(this);
        this.onClickDeleteAccountingPeriod =
            this.onClickDeleteAccountingPeriod.bind(this);
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
        const key = 'listAccountingHeight';
        const value = localStorage.getItem(key);
        if (value != null) {
            this.selectedPageSize = Number(value);
        }
        this.calcDataGridHeight();
        this.loadStateOfMyWorkOrdersDGH();
    }

    loadStateOfMyWorkOrdersDGH = () => {
        return this.sharedService.getUserDataQueryPreference('listAccountingHeight');
    };

    saveStateOfMyWorkOrdersDGH = () => {
        this.sharedService.saveUserDataQueryPreference(
            'listAccountingHeight',
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

    ngAfterViewInit() {
        const defaultOptions = this.gridConfigService.getCommonGridOptions();
        this.dataGrid.instance.option(defaultOptions);
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
        return this.sharedService.getUserDataQueryPreference('accountingGrid');
    };

    saveState = (state: any) => {
        this.sharedService.saveUserDataQueryPreference('accountingGrid', state);
    };
    ngOnInit(): void {
        this.route.queryParams.subscribe((params: any) => {
            this.searchResult = params.search;
        });
        this.dataSource = new CustomStore({
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
                    this.accountingPeriodService.getAccountingPeriod(query)
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

    onClickCreateAccountingPeriod() {
        this.router.navigate(['/accounting-period/create-accounting-period']);
    }
    successmsg(msg: any) {
        this.toastr.success(msg);
    }
    onClickEditAccountingPeriod(e: any) {
        this.router.navigate([
            '/accounting-period/edit-accounting-period',
            e.row.data.recId
        ]);
    }
    onClickDeleteAccountingPeriod(e: any) {
        const id = e.row.data.recId;
        const periodBegin = this.datepipe.transform(
            e.row.data.periodBegin as Date,
            'MM/dd/yyyy'
        );
        const periodEnd = this.datepipe.transform(
            e.row.data.periodEnd as Date,
            'MM/dd/yyyy'
        );
        document.documentElement.style.overflow = 'hidden';
        confirm(
            'Are you sure you want to delete the accounting period ' +
                periodBegin +
                ' - ' +
                periodEnd +
                '?',
            ''
        ).then((res: boolean) => {
            if (res === true) {
                this.accountingPeriodService
                    .deleteAccountingPeriod(id)
                    .subscribe((res) => {
                        if (res && res.success) {
                            this.successmsg('Accounting period is deleted');
                            this.dataGrid.instance.getDataSource().reload();
                        }
                    });
            } else {
                document.documentElement.style.overflow = 'auto';
            }
        });
    }

    onExporting(e: any) {
        const name = 'Accounting Months';
        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet(name);
        exportDataGrid({
            component: e.component,
            worksheet: worksheet
        }).then(() => saveExcelFileToLocal(workbook, name));
        e.cancel = true;
    }

    generateUniqueId(length = 16) {
        return parseInt(
            Math.ceil(Math.random() * Date.now())
                .toPrecision(length)
                .toString()
                .replace('.', '')
        );
    }
    onClickCancel() {
        this.dataGrid.instance.getScrollable().scrollTo(0);
        this.dataGrid.instance.clearFilter();
    }
}
