import { Component, ViewChild } from '@angular/core';
import {
    AbstractControl,
    UntypedFormBuilder,
    UntypedFormControl,
    UntypedFormGroup,
    Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/modules/shared/services/shared.service';
import { BatchingPanelsWizardService } from 'src/app/services/batching-panels-wizard.service';
import { BaseWizardStepComponent } from '../base-wizard-step/base-wizard-step.component';
import { BatchJobService } from 'src/app/services/batch-job.service';
import {
    BatchClearBatchRequest,
    BatchJobRequest,
    BatchSummary,
    BatchSummaryWorkOrder
} from 'src/app/models/batch-job.model';
import { DxDataGridComponent } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import { isNullOrUndefinedOrEmpty } from 'src/app/common/utils';
import { firstValueFrom } from 'rxjs';
import { Workbook } from 'exceljs';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { saveExcelFileToLocal } from 'src/app/common/helpers';

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
    selector: 'app-batch-job',
    templateUrl: './batch-job.component.html',
    styleUrls: ['./batch-job.component.scss']
})
export class BatchJobComponent extends BaseWizardStepComponent {
    @ViewChild(DxDataGridComponent, { static: false }) dataGrid!: DxDataGridComponent;
    batchData: BatchSummary | undefined;
    batchDataWorkOrders: BatchSummaryWorkOrder[] | undefined;
    batchSummaryInited = false;
    batchInProgress = false;
    batchAll: boolean = false;
    batchSelected: boolean = false;
    dataSource!: CustomStore;
    selectedKeys: number[] = [];
    searchResult = '';
    batchingErrorText: string | undefined = '';

    showDupError: boolean = false;
    showSelectedJobItemsError: boolean = false;

    batchingInputGroup: UntypedFormGroup = this.formBuilder2.group({
        jobBatchQty: new UntypedFormControl(),
        batchDupJobs: new UntypedFormControl(),
        batchLocation: new UntypedFormControl(),
        batchType: new UntypedFormControl(),
        jacksCombined: new UntypedFormControl(),
        newFloorRules: new UntypedFormControl(),
        als4: new UntypedFormControl(),
        cutByTruss: new UntypedFormControl(),
        allInAls: new UntypedFormControl(),
        hundeggerStacking: new UntypedFormControl(),
        sqCutBevels: new UntypedFormControl(),
        num2Sub: new UntypedFormControl()
    });

    editorOptions = {
        showClearButton: true
    };
    pageSizeOptions: number[] = [15, 25, 50, 100];
    selectedPageSize: number = this.pageSizeOptions[0];
    dataGridHeight = 0;
    columnChooserModes: any;
    gridCount = 0;

    constructor(
        public sharedService2: SharedService,
        public router2: Router,
        public route2: ActivatedRoute,
        public batchingPanelWizardService2: BatchingPanelsWizardService,
        public toastr2: ToastrService,
        public formBuilder2: UntypedFormBuilder,
        private batchingJobService: BatchJobService
    ) {
        super(
            sharedService2,
            router2,
            route2,
            batchingPanelWizardService2,
            toastr2,
            formBuilder2
        );
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

    override onInit(): void {
        console.log('BatchJobComponent');
        this.route.queryParams.subscribe((params: any) => {
            this.searchResult = params.search;
        });
        this.loadData();
        this.initForm();

        this.batchingJobService.getBatchSummary(this.jobKey).subscribe({
            next: (data) => {
                this.batchData = data.data?.batchSummary;
                this.batchDataWorkOrders = data.data?.batchSummaryWorkOrders;

                this.isComplete = !this.canTriggerBatch();
                this.batchSummaryInited = true;
            }
        });
    }

    initForm() {
        this.batchingInputGroup = this.formBuilder2.group({
            jobBatchQty: [1, [Validators.required, Validators.pattern(/^\d+$/)]],
            batchDupJobs: [''],
            batchLocation: ['Normal Sort'],
            batchType: ['All', Validators.required],
            jacksCombined: [false],
            newFloorRules: [false],
            als4: [false],
            cutByTruss: [false],
            allInAls: [false],
            hundeggerStacking: [false],
            sqCutBevels: [false],
            num2Sub: [false]
        });
    }

    loadData() {
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
                    this.batchingJobService.getAllPanelJobItems(this.jobKey, query)
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
                    });
            }
        });
    }

    loadState = () => {
        return this.sharedService.getUserDataQueryPreference('AllJobItemsDatagrid');
    };

    saveState = (state: any) => {
        this.sharedService.saveUserDataQueryPreference('AllJobItemsDatagrid', state);
    };

    resetState() {
        this.selectedKeys = [];
        this.dataGrid.instance.getScrollable().scrollTo(0);
        this.dataGrid.instance.clearFilter();
    }

    onExporting(e: any) {
        const name = 'JobItems';
        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet(name);
        exportDataGrid({
            component: e.component,
            worksheet: worksheet
        }).then(() => saveExcelFileToLocal(workbook, name));
        e.cancel = true;
    }

    canClearbatch() {
        var canClear = false;
        if (
            this.batchDataWorkOrders != undefined &&
            this.batchDataWorkOrders.length > 0
        ) {
            canClear = true;
        }

        return !this.batchInProgress && canClear && this.batchSummaryInited;
    }
    canTriggerBatch() {
        var canTrigger = false;
        if (this.batchDataWorkOrders == undefined) canTrigger = true;
        else if (this.batchDataWorkOrders?.length == 0) canTrigger = true;
        return !this.batchInProgress && canTrigger && this.batchSummaryInited;
    }

    clearBatch() {
        var request: BatchClearBatchRequest = {
            jobKey: this.jobKey
        };
        this.batchingJobService.clearBatch(request).subscribe({
            next: (res) => {
                if (res.success) {
                    this.batchData = {
                        totalLumberFetch: 0,
                        totalPieceCuts: 0,
                        totalPlateFetch: 0,
                        totalTrusses: 0,
                        totalTrussPieces: 0
                    };
                    this.batchDataWorkOrders = [];
                    this.isComplete = false;
                }
            }
        });
    }

    get lf(): { [key: string]: AbstractControl } {
        return this.batchingInputGroup.controls;
    }

    calculateCost(data: any) {
        return data.jiQuant * (data.bp + data.addOnPrice);
    }

    triggerBatch() {
        if (
            this.batchingInputGroup.invalid ||
            this.showDupError ||
            this.showSelectedJobItemsError
        ) {
            return;
        }

        const {
            jobBatchQty,
            batchDupJobs,
            batchLocation,
            jacksCombined,
            bladeOneFile,
            batchType,
            cutByTruss,
            allInAls,
            newFloorRules,
            sqCutBevels,
            num2Sub,
            hundeggerStacking,
            als4
        } = this.batchingInputGroup.value;

        var batchJobrequest: BatchJobRequest = {
            jobKey: this.jobKey,
            jobItemIds: this.selectedKeys,
            marks: [],
            jobBatchQty: jobBatchQty,
            batchDupJobs: batchDupJobs,
            batchLocation: batchLocation,
            jacksCombined: jacksCombined,
            bladeOneFile: bladeOneFile,
            batchAll: batchType === 'All',
            batchSelected: batchType === 'Selected',
            cutByTruss: cutByTruss,
            allInAls: allInAls,
            newFloorRules: newFloorRules,
            sqCutBevels: sqCutBevels,
            num2Sub: num2Sub,
            hundeggerStacking: hundeggerStacking,
            als4: als4
        };

        this.batchInProgress = true;
        this.batchingErrorText = '';
        this.batchingJobService.BatchCutJob(batchJobrequest).subscribe({
            next: (res) => {
                if (res.success) {
                    //TODO: Clean messages here.
                    console.log(
                        `Batch Completed: ${res.message} and msg: ${res.data?.statusMessage}`
                    );
                    this.batchInProgress = false;
                    // this.completeStep();
                    this.isComplete = true;
                    this.batchingJobService.getBatchSummary(this.jobKey).subscribe({
                        next: (data) => {
                            this.batchData = data.data?.batchSummary;
                            this.batchDataWorkOrders = data.data?.batchSummaryWorkOrders;
                        }
                    });
                } else {
                    //TODO: Clean messages here.
                    this.isComplete = false;
                    this.batchInProgress = false;
                    this.batchingErrorText = `Batch Failed: ${res.message}`;
                    this.toastr.error(`Batch Failed: ${res.message}`);
                }
            },
            error: (err) => {
                this.isComplete = false;
                this.batchInProgress = false;
                this.toastr.error('Batching has failed.');
            }
        });
    }

    batchDupJobsValidator() {
        const {
            jobBatchQty,
            batchDupJobs,
            batchLocation,
            jacksCombined,
            bladeOneFile,
            batchType,
            cutByTruss,
            allInAls,
            newFloorRules,
            sqCutBevels,
            num2Sub,
            hundeggerStacking,
            als4
        } = this.batchingInputGroup.value;

        this.showDupError = jobBatchQty > 1 && batchDupJobs === '';
    }

    batchSelectedValidator() {
        const {
            jobBatchQty,
            batchDupJobs,
            batchLocation,
            jacksCombined,
            bladeOneFile,
            batchType,
            cutByTruss,
            allInAls,
            newFloorRules,
            sqCutBevels,
            num2Sub,
            hundeggerStacking,
            als4
        } = this.batchingInputGroup.value;

        this.showSelectedJobItemsError =
            batchType === 'Selected' && this.selectedKeys.length === 0;
    }
}
