import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, UntypedFormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DxDataGridComponent } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { Workbook } from 'exceljs';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject, catchError, concat, debounceTime, distinctUntilChanged, firstValueFrom, map, of, switchMap, tap } from 'rxjs';
import { saveExcelFileToLocal } from 'src/app/common/helpers';
import { isNullOrUndefinedOrEmpty } from 'src/app/common/utils';
import { BatchSummary, BatchSummaryWorkOrder, BatchClearBatchRequest, BatchJobRequest, BatchJobRequestPanel } from 'src/app/models/batch-job.model';
import { Null } from 'src/app/models/general.model';
import { SharedService } from 'src/app/modules/shared/services/shared.service';
import { BatchJobService } from 'src/app/services/batch-job.service';
import { BatchingWizardService } from 'src/app/services/batching-wizard.service';
import { GetLocationsRequest, Location } from 'src/app/models/location.model';
import { GetPlantLocationsResponse } from 'src/app/models/forecasting.model';
import { LocationService } from 'src/app/services/location.service';

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
    selector: 'app-batch-job-panel',
    templateUrl: './batch-job-panel.component.html',
    styleUrls: ['./batch-job-panel.component.scss']
})
export class BatchJobPanelComponent implements OnInit {
    @ViewChild(DxDataGridComponent, { static: false }) dataGrid!: DxDataGridComponent;
    jobKey!: string;
    batchData: BatchSummary | undefined;
    batchDataWorkOrders: BatchSummaryWorkOrder[] | undefined;
    batchSummaryInited = false;
    batchInProgress = false;
    batchAll: boolean = false;
    batchSelected: boolean = false;
    dataSource!: CustomStore;
    selectedKeys: number[] = [];
    searchResult = '';

    showDupError: boolean = false;
    showSelectedJobItemsError: boolean = false;

    batchingInputGroup: UntypedFormGroup = this.formBuilder.group({
        batchType: new UntypedFormControl(),
        stdStudsCombined: new UntypedFormControl(),
        excludeStdStuds: new UntypedFormControl(),
        panelPlatesCombined: new UntypedFormControl(),
        similarPiecesLabels: new UntypedFormControl(),
        excludeVtp: new UntypedFormControl()
    });

    editorOptions = {
        showClearButton: true
    };

    plantLocationOptions$: Observable<any> = new Observable<any>();
    plantLocationOptionsLoading = false;
    plantLocationOptionsInput$: Subject<string> = new Subject<string>();
    selectedPlantLocation!: Null<Location>;
    plantLocationFilterOptions: GetPlantLocationsResponse[] = [];
    minLengthTerm = 0;
    columnChooserModes: any;

    constructor(
        public sharedService: SharedService,
        public router: Router,
        public route: ActivatedRoute,
        public batchingWizardService: BatchingWizardService,
        public toastr: ToastrService,
        public formBuilder: UntypedFormBuilder,
        private batchingJobService: BatchJobService,
        private locationService: LocationService
    ) {
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

    ngOnInit(): void {
        this.jobKey = this.route.snapshot.params['jobKey'];
        this.route.queryParams.subscribe((params: any) => {
            this.searchResult = params.search;
        });
        this.loadOptions();
        this.loadData();
        this.initForm();
        this.selectedPlantLocation = this.sharedService.selectedPlantLocationValue;

        this.batchingJobService.getBatchSummary(this.jobKey).subscribe({
            next: (data) => {
                this.batchData = data.data?.batchSummary;
                this.batchDataWorkOrders = data.data?.batchSummaryWorkOrders;
                this.batchSummaryInited = true;
            }
        });
    }

    loadOptions() {
        this.plantLocationOptions$ = concat(
            this.getPlantLocations().pipe(
                map((res) => {
                    return res.data || [];
                }),
                catchError(() => of([]))
            ),
            this.plantLocationOptionsInput$.pipe(
                distinctUntilChanged(),
                debounceTime(800),
                tap(() => (this.plantLocationOptionsLoading = true)),
                switchMap((term) => {
                    return this.getPlantLocations(term).pipe(
                        map((res) => {
                            return res.data || [];
                        }),
                        catchError(() => of([])),
                        tap(() => (this.plantLocationOptionsLoading = false))
                    );
                })
            )
        );
    }

    getPlantLocations(searchTerm?: string) {
        const query: GetLocationsRequest = {
            limit: 100
        };
        if (searchTerm) {
            query.locationName = searchTerm;
        }
        if (this.sharedService.isSuperAdminLoggedIn) {
            return this.locationService.getTenantLocations(query);
        } else return this.locationService.getLocationsByuserId(query);
    }

    initForm() {
        this.batchingInputGroup = this.formBuilder.group({
            batchType: ['All', Validators.required],
            stdStudsCombined: [true],
            excludeStdStuds: [false],
            panelPlatesCombined: [false],
            similarPiecesLabels: [false],
            excludeVtp: [false]
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
                    this.batchingJobService.getAllJobItems(this.jobKey, query)
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
                    });
            }
        });
    }

    plantLocationTrackByFn(item: Location) {
        return item.locationId;
    }

    getPlantLocationOptionLabelFn(item: Location) {
        return item.locationName;
    }

    loadState = () => {
        return this.sharedService.getUserDataQueryPreference('AllJobItemsDatagridPanel');
    };

    saveState = (state: any) => {
        this.sharedService.saveUserDataQueryPreference('AllJobItemsDatagridPanel', state);
    };

    resetState() {
        this.selectedKeys = [];
        this.dataGrid.instance.getScrollable().scrollTo(0);
        this.dataGrid.instance.clearFilter();
    }

    onExporting(e: any) {
        const name = 'JobItemsPanel';
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
        this.batchingJobService.clearPanelBatch(request).subscribe({
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
            this.showSelectedJobItemsError ||
            !this.selectedPlantLocation?.locationName
        ) {
            return;
        }

        const {
            batchType,
            stdStudsCombined,
            excludeStdStuds,
            panelPlatesCombined,
            similarPiecesLabels,
            excludeVtp
        } = this.batchingInputGroup.value;

        var batchJobrequest: BatchJobRequestPanel = {
            jobKey: this.jobKey,
            jobItemIds: this.selectedKeys,
            Location: this.selectedPlantLocation.locationName,
            batchAll: batchType === 'All',
            batchSelected: batchType === 'Selected',
            stdStudsCombined: stdStudsCombined,
            excludeStdStuds: excludeStdStuds,
            panelPlatesCombined: panelPlatesCombined,
            similarPiecesLabels: similarPiecesLabels,
            excludeVtp: excludeVtp
        };

        this.batchInProgress = true;
        this.batchingJobService.BatchCutJobPanel(batchJobrequest).subscribe({
            next: (res) => {
                if (res.success) {
                    this.batchInProgress = false;
                    this.batchingJobService.getBatchSummary(this.jobKey).subscribe({
                        next: (data) => {
                            this.batchData = data.data?.batchSummary;
                            this.batchDataWorkOrders = data.data?.batchSummaryWorkOrders;
                        }
                    });
                } else {
                    //TODO: Clean messages here.
                    this.batchInProgress = false;
                    this.toastr.error(`Batch Failed: ${res.message}`);
                }
            },
            error: (err) => {
                this.batchInProgress = false;
                this.toastr.error('Batching has failed.');
            }
        });
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
