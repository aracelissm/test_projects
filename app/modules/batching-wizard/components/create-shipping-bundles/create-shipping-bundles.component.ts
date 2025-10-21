import { Component, HostListener, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DxDataGridComponent } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { Workbook } from 'exceljs';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';
import { saveExcelFileToLocal } from 'src/app/common/helpers';
import { isNullOrUndefinedOrEmpty } from 'src/app/common/utils';
import { ComponentCanDeactivate } from 'src/app/guards/pending-changes-guard.service';
import { ShippingBundleItem } from 'src/app/models/shipping-bundle';
import { SharedService } from 'src/app/modules/shared/services/shared.service';
import { BatchingWizardService } from 'src/app/services/batching-wizard.service';
import { ShippingBundleService } from 'src/app/services/shipping-bundle.service';
import { BaseWizardStepComponent } from '../base-wizard-step/base-wizard-step.component';
import { UntypedFormBuilder } from '@angular/forms';

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
    selector: 'app-create-shipping-bundles',
    templateUrl: './create-shipping-bundles.component.html',
    styleUrls: ['./create-shipping-bundles.component.scss']
})
export class CreateShippingBundlesComponent
    extends BaseWizardStepComponent
    implements ComponentCanDeactivate
{
    @ViewChild(DxDataGridComponent, { static: false }) dataGrid!: DxDataGridComponent;
    @HostListener('window:beforeunload')
    editorOptions = {};

    dataSource!: CustomStore;
    searchResult = '';

    constructor(
        public sharedService2: SharedService,
        public router2: Router,
        public route2: ActivatedRoute,
        public batchingWizardService2: BatchingWizardService,
        public toastr2: ToastrService,
        public formBuilder2: UntypedFormBuilder,
        private shippingBundleService: ShippingBundleService
    ) {
        super(
            sharedService2,
            router2,
            route2,
            batchingWizardService2,
            toastr2,
            formBuilder2
        );
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
        const key = 'createShippingHeight';
        const value = localStorage.getItem(key);
        if (value != null) {
            this.selectedPageSize = Number(value);
        }
        this.calcDataGridHeight();
        this.loadStateOfMyWorkOrdersDGH();
    }

    loadStateOfMyWorkOrdersDGH = () => {
        return this.sharedService.getUserDataQueryPreference('createShippingHeight');
    };

    saveStateOfMyWorkOrdersDGH = () => {
        this.sharedService.saveUserDataQueryPreference(
            'createShippingHeight',
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

    override onInit(): void {
        this.getJobItemsToBundle();
    }

    canDeactivate() {
        if (this.dataGrid.instance.hasEditData()) {
            return false;
        }
        return true;
    }

    onSaving(e: any) {
        if (this.currentStep.isComplete) {
            this.resetCompleteStatus();
        }
        e.cancel = true;
        let bundleChanges: ShippingBundleItem[] = [];
        let quantityChanges: ShippingBundleItem[] = [];

        if (e.changes.length) {
            e.changes.forEach((element: ShippingBundleItem) => {
                element.data.bundle =
                    element.data.bundle === '' ? null : element.data.bundle;
            });

            e.changes.forEach((element: ShippingBundleItem) => {
                if (element.data.bundle !== undefined) {
                    bundleChanges.push(element);
                }
                if (element.data.jiQuant) {
                    quantityChanges.push(element);
                }
            });

            this.shippingBundleService
                .assignShippingBundle({
                    bundleData: bundleChanges,
                    quantityData: quantityChanges
                })
                .subscribe({
                    next: (res) => {
                        if (res && res.success) {
                            this.dataGrid.instance.cancelEditData();
                            this.dataGrid.instance.refresh();
                        }
                    },
                    error: (err) => {
                        this.toastr.error(err.error.message);
                    }
                });
        }
    }

    getJobItemsToBundle() {
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
                    this.shippingBundleService.getJobItemsToBundle(this.jobKey, query)
                )
                    .then((res) => {
                        if (res && res.success) {
                            this.gridCount = res.data?.data.length || 0;
                            this.isComplete =
                                res.data?.data.find(
                                    (ele) =>
                                        ele.jiQuant === null || ele.jiQuant === undefined
                                ) === undefined;
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
                        this.toastr.error(err.error.message);
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

    loadState = () => {
        var state: any = this.sharedService.getUserDataQueryPreference(
            'shippingBundleDataGrid'
        );
        if (state) {
            if (state.pageIndex) {
                state.pageIndex = 0;
            }
            if (state.searchText) {
                state.searchText = '';
            }
            for (var i = 0; i < state.columns.length; i++) {
                delete state.columns[i].filterValue;
                delete state.columns[i].sortIndex;
                delete state.columns[i].sortOrder;
            }
        }
        return state;
    };

    saveState = (state: any) => {
        if (state) {
            if (state.pageIndex) {
                state.pageIndex = 0;
            }
            if (state.searchText) {
                state.searchText = '';
            }
            for (var i = 0; i < state.columns.length; i++) {
                delete state.columns[i].filterValue;
                delete state.columns[i].sortIndex;
                delete state.columns[i].sortOrder;
            }
        }
        this.sharedService.saveUserDataQueryPreference('shippingBundleDataGrid', state);
    };

    resetState() {
        const savedState = this.loadState();
        this.dataGrid.instance.getScrollable().scrollTo(0);
        this.dataGrid.instance.state(savedState);
        this.dataGrid.instance.cancelEditData();
    }

    onExporting(e: any) {
        const name = 'ShippingBundles';
        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet(name);
        exportDataGrid({
            component: e.component,
            worksheet: worksheet
        }).then(() => saveExcelFileToLocal(workbook, name));
        e.cancel = true;
    }
}

