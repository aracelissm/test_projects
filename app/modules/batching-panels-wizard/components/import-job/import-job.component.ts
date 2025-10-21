import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseWizardStepComponent } from '../base-wizard-step/base-wizard-step.component';
import { SharedService } from 'src/app/modules/shared/services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BatchingPanelsWizardService } from 'src/app/services/batching-panels-wizard.service';
import { ToastrService } from 'ngx-toastr';
import { AbstractControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ImportJobService } from 'src/app/services/import-job.service';
import { DxDataGridComponent } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { add, multiply, saveExcelFileToLocal } from 'src/app/common/helpers';
import { isNullOrUndefinedOrEmpty } from 'src/app/common/utils';
import { firstValueFrom } from 'rxjs';
import { JobItemService } from 'src/app/services/job-item.service';
import { Workbook } from 'exceljs';
import { JobItem } from 'src/app/models/job-item.model';
import { JobCopyDownRequest } from 'src/app/models/batch-job.model';
import { JobService } from 'src/app/services/job.service';

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
    selector: 'app-import-job',
    templateUrl: './import-job.component.html',
    styleUrls: ['./import-job.component.scss']
})
export class ImportJobComponent extends BaseWizardStepComponent {
    @ViewChild(DxDataGridComponent, { static: false }) dataGrid!: DxDataGridComponent;
    dataSource!: CustomStore;
    editorOptions = {
        showClearButton: true
    };

    hasMasterNumber = false;
    masterNumber: string = '';
    copyFromPath: string | null = '';
    showJobCopyDown = false;
    bCopying = false;
    submitted = false;
    jobCopyDownForm: UntypedFormGroup = new UntypedFormGroup({
        jobKey: new UntypedFormControl(''),
        copyToJob: new UntypedFormControl(''),
        copyFromPath: new UntypedFormControl(''),
        copyToPath: new UntypedFormControl(''),
        bCopyJob: new UntypedFormControl(false),
        bCopyItems: new UntypedFormControl(true),
        qtyX: new UntypedFormControl('')
    });

    constructor(
        public sharedService2: SharedService,
        public router2: Router,
        public route2: ActivatedRoute,
        public batchingPanelWizardService2: BatchingPanelsWizardService,
        public toastr2: ToastrService,
        public formBuilder2: UntypedFormBuilder,
        private jobService: JobService,
        private jobItemService: JobItemService,
        private importJobService: ImportJobService
    ) {
        super(
            sharedService2,
            router2,
            route2,
            batchingPanelWizardService2,
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
    dataGridHeight = 100;
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
        const key = 'importJobHeight';
        const value = localStorage.getItem(key);
        if (value != null) {
            this.selectedPageSize = Number(value);
        }
        this.calcDataGridHeight();
        this.loadStateOfMyWorkOrdersDGH();
    }

    loadStateOfMyWorkOrdersDGH = () => {
        return this.sharedService.getUserDataQueryPreference('importJobHeight');
    };

    saveStateOfMyWorkOrdersDGH = () => {
        this.sharedService.saveUserDataQueryPreference(
            'importJobHeight',
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
        this.getTrussJobItems(this.jobKey);
        this.jobService.getJobByJobKey(this.jobKey).subscribe({
            next: (res) => {
                if (res.success && res.data) {
                    this.masterNumber = res.data.masteR_NUMBER;

                    if (this.masterNumber != '' && this.masterNumber != undefined) {
                        this.hasMasterNumber = true;

                        if (this.masterNumber != undefined && this.masterNumber != '') {
                            this.jobCopyDownForm.patchValue({
                                jobKey: this.masterNumber,
                                copyFromPath: this.copyFromPath
                            });

                            this.jobService.getJobByJobKey(this.masterNumber).subscribe({
                                next: (res2) => {
                                    if (res2.success && res2.data != undefined) {
                                        this.copyFromPath = res2.data.jobDir;
                                        this.jobCopyDownForm.patchValue({
                                            copyFromPath: this.copyFromPath
                                        });
                                    }
                                }
                            });
                        }
                    }
                }
            }
        });
        this.jobCopyDownForm.patchValue({
            qtyX: 1,
            copyToJob: this.jobKey,
            copyToPath: `F:\\Custom\\${this.jobKey}`
        });

        this.isComplete = true;
    }
    get lf(): { [key: string]: AbstractControl } {
        return this.jobCopyDownForm.controls;
    }

    getTrussJobItems(jobKey: string) {
        if (jobKey) {
            this.dataSource = new CustomStore({
                key: 'recId',
                load: async (loadOptions: any) => {
                    const subQuery: Record<string, string> = {};
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
                            subQuery[i] = JSON.stringify(loadOptions[i]);
                        }
                    });
                    return await firstValueFrom(
                        this.jobItemService.getPanelJobItems({ ...subQuery, jobKey })
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
    }

    onExporting(e: any) {
        const name = 'TrussJobItems';
        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet(name);
        exportDataGrid({
            component: e.component,
            worksheet: worksheet
        }).then(() => saveExcelFileToLocal(workbook, name));
        e.cancel = true;
    }

    resetState() {
        const savedState = this.loadState();
        this.dataGrid.instance.getScrollable().scrollTo(0);
        this.dataGrid.instance.state(savedState);
    }

    loadState = () => {
        var state: any =
            this.sharedService.getUserDataQueryPreference('importJobDatagrid');
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

    saveState = (state: any) => {
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
        this.sharedService.saveUserDataQueryPreference('importJobDatagrid', state);
    };

    getCost(rowData: JobItem) {
        return multiply(rowData.jiQuant, add(rowData.bp, rowData.addOnPrice));
    }

    onCopyDownClick() {
        this.showJobCopyDown = !this.showJobCopyDown;
    }
    onCopyDownCancelClick() {
        this.showJobCopyDown = false;
    }

    onCopyDownSubmit() {
        this.copyDown();
    }
    copyDown() {
        this.isComplete = false;
        //this.resetCompleteStatus();

        const { jobKey, copyToJob, copyToPath, qtyX } = this.jobCopyDownForm.value;

        var request: JobCopyDownRequest = {
            jobKey: jobKey,
            copyToJob: copyToJob,
            copyToPath: copyToPath,
            bCopyJob: false,
            bCopyItems: true,
            qtyX: qtyX,
            jobItemIds: [],
            bFullCopySourceDirectory: true,
            bAppend: false,
            bCopyAllJobItems: true,
            bBatchingWizard: true,
            dupJobs: ''
        };

        this.bCopying = true;

        this.importJobService.copyDownJob(request).subscribe({
            next: (res) => {
                if (res && res.success && res.data) {
                    this.isComplete = true;
                    this.bCopying = false;
                    this.showJobCopyDown = false;
                    this.dataGrid.instance.refresh();
                }
            },
            error: (err) => {
                this.isComplete = false;
                this.bCopying = false;
            }
        });
    }

    processAllFiles() {
        this.isComplete = false;
        //this.resetCompleteStatus();
        //processFileCollection
        this.importJobService.processFiles(this.jobKey).subscribe({
            next: (res) => {
                if (res) {
                    this.isComplete = true;
                    this.dataGrid.instance.refresh();
                }
            },
            error: (err) => {
                this.isComplete = true;
            }
        });
    }
}
