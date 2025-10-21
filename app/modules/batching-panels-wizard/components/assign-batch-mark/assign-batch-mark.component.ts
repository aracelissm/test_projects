import {
    Component,
    Input,
    OnDestroy,
    TemplateRef,
    ViewContainerRef,
    ViewChild
} from '@angular/core';
import {
    AbstractControl,
    UntypedFormBuilder,
    UntypedFormControl,
    UntypedFormGroup,
    Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DxDataGridComponent } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { Workbook } from 'exceljs';
import { ToastrService } from 'ngx-toastr';
import { filter, firstValueFrom } from 'rxjs';
import { saveExcelFileToLocal } from 'src/app/common/helpers';
import { ensure, isNullOrUndefinedOrEmpty } from 'src/app/common/utils';
import { BatchMark } from 'src/app/models/job-batch-mark.model';
import { JobItemBatching } from 'src/app/models/job-item.model';
import { SharedService } from 'src/app/modules/shared/services/shared.service';
import { JobBatchMarkService } from 'src/app/services/job-batch-mark.service';
import { BatchingPanelsWizardService } from 'src/app/services/batching-panels-wizard.service';
import { BaseWizardStepComponent } from '../base-wizard-step/base-wizard-step.component';
import { JobMarkType } from 'src/app/enums/job-mark-type';
import { one } from 'devextreme/events';

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
    selector: 'app-assign-batch-mark',
    templateUrl: './assign-batch-mark.component.html',
    styleUrls: ['./assign-batch-mark.component.scss']
})
export class AssignBatchMarkComponent
    extends BaseWizardStepComponent
    implements OnDestroy
{
    /**************
     * This contains an example of a custom filter row filter.
     * This is not defined how to do on the devexpress docs or demos.
     * However, there is a post about it and that post works.
     * This example came from here: https://codesandbox.io/s/custom-editors-devextreme-data-grid-forked-bsnrw?file=/src/app/app.component.ts:0-2829
     * originally sourced from here: https://supportcenter.devexpress.com/ticket/details/t1036228/datagrid-implement-custom-filter-editor-in-filterrow
     * TODO: An exercise for later would be figuring out how to setup a reusable set of ng-templates (not components) that are reusable by reference in typescript.
     *  AKA. A filterRowEditor that did not require me to copy the ng-template to the html portion. Probably easy to do.
     **************/

    @ViewChild('unmarkedDataGrid', { static: false })
    unmarkedDataGrid!: DxDataGridComponent;
    @ViewChild('markedDataGrid', { static: false }) markedDataGrid!: DxDataGridComponent;

    @ViewChild('filterRowEditor', { static: true })
    filterRowEditorRef: TemplateRef<any> | undefined;
    emptyFilterOperations: string[] = [];

    markType: JobMarkType = JobMarkType.BATCHING;

    editorOptions = {
        showClearButton: true
    };
    batchMarkForm: UntypedFormGroup = new UntypedFormGroup({
        mark: new UntypedFormControl('')
    });

    dataSourceUnmarked!: CustomStore;
    dataSourceMarked!: CustomStore;
    unmarkedSearchResult = '';
    markedSearchResult = '';
    selectedUnmarkedKeys: number[] = [];
    selectedMarkedKeys: number[] = [];
    markedFilterOptions: string[] = ['All'];
    filterValue: string = '';
    expandAllGroups: boolean | null | undefined = true;
    tag1: string = '';
    tag2: string = '';
    labelText1: string = '';
    labelText2: string = '';

    onEditorPreparing(e: any) {
        if (!this.filterRowEditorRef) return;

        if (e.dataField === 'validBackplatingDevices' && e.parentType === 'filterRow') {
            e.cancel = true;
            const childView = this.viewContainerRef.createEmbeddedView(
                this.filterRowEditorRef,
                { options: e }
            );
            childView.rootNodes.forEach((element) => {
                e.editorElement.appendChild(element);
            });

            one(e.editorElement, 'dxremove', () => {
                childView.destroy();
            });
        }
    }

    /// Example Return Value
    /// return function (data : any) : boolean { return true };
    calculateFilterExpression(
        filterValue: any,
        selectedFilterOperation: any,
        target: any
    ) {
        if (filterValue) {
            return function (data: JobItemBatching): boolean {
                return (
                    data.validBackplatingDevices != '' &&
                    data.validBackplatingDevices != undefined
                );
            };
        } else {
            return function (data: JobItemBatching) {
                return true;
            };
        }
    }

    constructor(
        public viewContainerRef: ViewContainerRef,
        public sharedService2: SharedService,
        public router2: Router,
        public route2: ActivatedRoute,
        public batchingPanelsWizardService2: BatchingPanelsWizardService,
        public toastr2: ToastrService,
        public formBuilder2: UntypedFormBuilder,
        private jobBatchMarkService: JobBatchMarkService
    ) {
        super(
            sharedService2,
            router2,
            route2,
            batchingPanelsWizardService2,
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
        const key = 'batchingMarkHeight';
        const value = localStorage.getItem(key);
        if (value != null) {
            this.selectedPageSize = Number(value);
        }
        this.calcDataGridHeight();
        this.loadStateOfMyWorkOrdersDGH();
    }

    loadStateOfMyWorkOrdersDGH = () => {
        return this.sharedService.getUserDataQueryPreference('batchingMarkHeight');
    };

    saveStateOfMyWorkOrdersDGH = () => {
        this.sharedService.saveUserDataQueryPreference(
            'batchingMarkHeight',
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
        this.route.queryParams.subscribe((params: any) => {
            this.unmarkedSearchResult = params.search;
        });
        this.route.queryParams.subscribe((params: any) => {
            this.markedSearchResult = params.search;
        });
        this.initForm();
        this.loadUnmarkedData();
        this.loadMarkedData();
    }

    ngOnDestroy(): void {
        this.selectedUnmarkedKeys = [];
        this.selectedMarkedKeys = [];
    }

    calculateTotal(options: any) {
        if (options.name === 'trussTotal') {
            switch (options.summaryProcess) {
                case 'start':
                    options.totalValue = 0;
                    break;
                case 'calculate':
                    options.totalValue += options.value.jiQuant * options.value.jiNumPly;
                    break;
            }
        }
    }

    get lf(): { [key: string]: AbstractControl } {
        return this.batchMarkForm.controls;
    }

    initForm() {
        this.batchMarkForm = this.formBuilder.group({
            mark: ['', Validators.required]
        });
    }

    getCheckboxValue() {
        return ensure(this.expandAllGroups);
    }

    loadUnmarkedData() {
        this.dataSourceUnmarked = new CustomStore({
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
                    this.jobBatchMarkService.getUnmarkedPanelJobItems(this.jobKey, query)
                )
                    .then((res) => {
                        if (res && res.success) {
                            this.gridCount = res.data?.data.length || 0;
                            this.isComplete = res.data?.totalCount === 0;
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

    loadMarkedData() {
        this.dataSourceMarked = new CustomStore({
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
                    this.jobBatchMarkService.getMarkedPanelJobItems(this.jobKey, query)
                )
                    .then((res) => {
                        this.onLoadFilters(res.data?.data || []);
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
                        this.onLoadFilters([]);
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

    onLoadFilters(data: JobItemBatching[]) {
        this.markedFilterOptions = ['All'];
        var filters = data
            .map((item) => ensure(item.jiBmark))
            .filter(
                (obj, index, self) => index === self.findIndex((item) => item === obj)
            )
            .sort();
        this.markedFilterOptions = this.markedFilterOptions.concat(filters);
        if (!this.markedFilterOptions.includes(this.filterValue)) {
            this.filterValue = 'All';
        }
        this.filterSelected();
    }

    loadStateUnmarked = () => {
        var state: any =
            this.sharedService.getUserDataQueryPreference('unmarkedDatagrid');
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

    saveStateUnmarked = (state: any) => {
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
        this.sharedService.saveUserDataQueryPreference('unmarkedDatagrid', state);
    };

    loadStateMarked = () => {
        var state: any = this.sharedService.getUserDataQueryPreference('markedDatagrid');
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

    saveStateMarked = (state: any) => {
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
        this.sharedService.saveUserDataQueryPreference('markedDatagrid', state);
    };

    resetStateUnmarked() {
        const savedState = this.loadStateUnmarked();
        this.unmarkedDataGrid.instance.getScrollable().scrollTo(0);
        this.unmarkedDataGrid.instance.state(savedState);
    }

    resetStateMarked() {
        const savedState = this.loadStateMarked();
        this.markedDataGrid.instance.getScrollable().scrollTo(0);
        this.markedDataGrid.instance.state(savedState);
    }

    onUnmarkedExporting(e: any) {
        const name = 'UnmarkedJobItems';
        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet(name);
        exportDataGrid({
            component: e.component,
            worksheet: worksheet
        }).then(() => saveExcelFileToLocal(workbook, name));
        e.cancel = true;
    }

    onMarkedExporting(e: any) {
        const name = 'MarkedJobItems';
        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet(name);
        exportDataGrid({
            component: e.component,
            worksheet: worksheet
        }).then(() => saveExcelFileToLocal(workbook, name));
        e.cancel = true;
    }

    onMarkBatch() {
        if (this.batchMarkForm.invalid) {
            return;
        }
        if (this.currentStep.isComplete) {
            // this.resetCompleteStatus();
        }

        const { mark } = this.batchMarkForm.value;
        const data: BatchMark = {
            jobKey: this.jobKey,
            mark,
            markType: this.markType,
            jobItemIds: this.selectedUnmarkedKeys
        };
        this.jobBatchMarkService.assignBatchMark(data).subscribe({
            next: (res) => {
                if (res && res.success) {
                    this.toastr.success(
                        res.message ? res.message : 'Batch marked successfully'
                    );
                    this.selectedUnmarkedKeys = [];
                    this.unmarkedDataGrid.instance.refresh();
                    this.markedDataGrid.instance.refresh();
                }
            },
            error: (err) => {
                this.toastr.error(err.error.message);
            }
        });
    }

    onChangeBatchMark() {
        if (this.batchMarkForm.invalid) {
            return;
        }
        if (this.currentStep.isComplete) {
            // this.resetCompleteStatus();
        }

        const { mark } = this.batchMarkForm.value;
        const data: BatchMark = {
            jobKey: this.jobKey,
            mark,
            markType: this.markType,
            jobItemIds: this.selectedMarkedKeys
        };
        this.jobBatchMarkService.changeBatchMark(data).subscribe({
            next: (res) => {
                if (res && res.success) {
                    this.toastr.success(
                        res.message ? res.message : 'Mark changed successfully'
                    );
                    this.selectedMarkedKeys = [];
                    this.unmarkedDataGrid.instance.refresh();
                    this.markedDataGrid.instance.refresh();
                }
            },
            error: (err) => {
                this.toastr.error(err.error.message);
            }
        });
    }

    onUnmarkBatch() {
        if (this.currentStep.isComplete) {
            // this.resetCompleteStatus();
        }
        const data: BatchMark = {
            jobKey: this.jobKey,
            mark: '',
            markType: this.markType,
            jobItemIds: this.selectedMarkedKeys
        };
        this.jobBatchMarkService.removeBatchMark(data).subscribe({
            next: (res) => {
                if (res && res.success) {
                    this.toastr.success(
                        res.message ? res.message : 'Mark removed successfully'
                    );
                    this.selectedMarkedKeys = [];
                    this.unmarkedDataGrid.instance.refresh();
                    this.markedDataGrid.instance.refresh();
                }
            },
            error: (err) => {
                this.toastr.error(err.error.message);
            }
        });
    }

    filterSelected() {
        if (this.filterValue === 'All' || this.filterValue === '') {
            this.markedDataGrid.instance.filter(null);
        } else {
            this.markedDataGrid.instance.filter(['jiBmark', '=', this.filterValue]);
        }
    }

    selectionChangedHandler(event: any) {
        //console.log(event);
        //console.log(event.selectedRowsData.length);
        if (event.selectedRowsData.length > 0) {
            const value: string =
                event.selectedRowsData[event.selectedRowsData.length - 1].jiTag;
            this.tag1 = value;
            this.labelText1 = value;
            //this.jobService.setTag(value + '.PIC');
        } else {
            this.tag1 = 'BLANK';
            this.labelText1 = '';
        }
    }

    selectionChangedHandler2(event: any) {
        //console.log(event);
        //console.log(event.selectedRowsData.length);
        if (event.selectedRowsData.length > 0) {
            const value: string =
                event.selectedRowsData[event.selectedRowsData.length - 1].jiTag;
            this.tag2 = value;
            this.labelText2 = value;
            //this.jobService.setTag(value + '.PIC');
        } else {
            this.tag2 = 'BLANK';
            this.labelText2 = '';
        }
    }
}
