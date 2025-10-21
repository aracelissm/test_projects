import { Component, ViewChild } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/modules/shared/services/shared.service';
import { BatchingWizardService } from 'src/app/services/batching-wizard.service';
import { BaseWizardStepComponent } from '../base-wizard-step/base-wizard-step.component';
import { BatchJobService } from 'src/app/services/batch-job.service';
import { BatchClearBatchByMarksRequest, BatchClearBatchRequest, BatchedMarks as BatchedMark, BatchJobRequest, BatchSummary, BatchSummaryWorkOrder, GenerateSMP2Request } from 'src/app/models/batch-job.model';
import { DxDataGridComponent } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import { isNullOrUndefinedOrEmpty } from 'src/app/common/utils';
import { firstValueFrom } from 'rxjs';
import { Workbook } from 'exceljs';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { saveExcelFileToLocal } from 'src/app/common/helpers';
import { JobItemBatching } from 'src/app/models/job-item.model';
import { CurrentTheme } from 'src/app/models/user-preference.model';
import { confirm } from 'devextreme/ui/dialog';

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
    batchMarkList: BatchedMarkList;


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
    batchingErrorText: string |undefined = "";

    forMarks = '';
    batchMarks = ''
    batchMarksTemp : string [] = [];
    batchMarksMultiSelect : string[] = [];
    batchMarksOptions : string[] = [];

    existingMarks : BatchedMark[] = [];

    showDupError: boolean = false;
    showQtyError: boolean = false;
    qtyReadOnly: boolean = false;
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
    timeElapsed! : number | null | undefined;
    smp2TimeElapsed! : number | null | undefined;

    constructor(
        public sharedService2: SharedService,
        public router2: Router,
        public route2: ActivatedRoute,
        public batchingWizardService2: BatchingWizardService,
        public toastr2: ToastrService,
        public formBuilder2: UntypedFormBuilder,
        private batchingJobService: BatchJobService,
    ) {
        super(
            sharedService2,
            router2,
            route2,
            batchingWizardService2,
            toastr2,
            formBuilder2
        );
        this.isComplete = true;
        this.batchMarkList = new BatchedMarkList();
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
        this.route.queryParams.subscribe((params: any) => {
            this.searchResult = params.search;
        });
        this.loadData();
        this.initForm();

        this.batchingJobService.getBatchingOptions(this.jobKey).subscribe({
            next: (res) => {
                if (res.success)
                {
                    //patch
                    this.batchingInputGroup.patchValue({
                        jobBatchQty: res.data?.batchOptionsNumDups,
                        batchDupJobs: res.data?.batchDupJobs
                    });
                }
                else
                {
                    // Nothing.
                }

            },
            error: (err) => {

            }
        })

        this.batchingJobService.getBatchSummary(this.jobKey).subscribe({
            next: (data) => {
                this.batchData = data.data?.batchSummary;
                this.batchDataWorkOrders = data.data?.batchSummaryWorkOrders;
                this.timeElapsed = data.data?.timeElapsedMilliseconds;
                this.smp2TimeElapsed = data.data?.smp2TimeElapsedMilliseconds;
                this.batchSummaryInited = true;          
            }
        });
    }

    getPrintMarkLabelFn(item: any) {
        return item;
    }

    onBatchMarkSelected(item: any)
    {
      this.batchMarks = (item.sort().join(','));
      this.batchMarksTemp = item.sort();
      this.markValidator();
    }

    markValidator()
    {
      var printM = this.batchMarks.trim();
      if (printM == '' || printM == null || printM == undefined)
      {
        this.forMarks = '';
      }
      else 
      {
        this.forMarks = ` for marks (${printM})`;
      }

      this.refreshBatchedMarksInPlace();
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
            sqCutBevels: [true],
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
                    this.batchingJobService.getAllJobItems(this.jobKey, query)
                )
                    .then((res) => {
                        if (res && res.success) {
                            this.gridCount = res.data?.data.length || 0;

                        var resData = res.data?.data ||[];
                        var marks = resData.filter((jib:JobItemBatching) => jib.jiBmark != undefined && jib.jiBmark != null && jib.jiBmark != '').map((jib: JobItemBatching) => jib.jiBmark || '')
                        this.batchMarksOptions = marks.filter((value, index, array) => array.indexOf(value) === index);
                        this.refreshBatchedMarks();

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

        return !this.batchInProgress && canClear && !this.batchMarkList.bAllClear;
    }
    canTriggerBatch() {
        var canTrigger = false;
        if (this.batchDataWorkOrders == undefined)
        {
                canTrigger = true;
        }
        else if (this.batchDataWorkOrders?.length == 0){            
         canTrigger = true;
        }

        var result = !this.batchInProgress && canTrigger && this.batchSummaryInited
        return result;
    }

    generateSMP2() {
        var request: GenerateSMP2Request = {
            jobKey: this.jobKey
        };
        this.batchingJobService.GenerateSMP2Files(request).subscribe({
            next: (res) => {
                if (res.success) {
                    this.toastr.success('SMP2 Files Generated');
                } else {
                    this.toastr.error('SMP2 File Generation Failed');
                }
            },
            error: (err) => {
                this.batchInProgress = false;
                this.toastr.error('Batching has failed.');
            }
        });
    }



    clearBatchMouseOn = false;
    batchMouseOn = false;

    clearBatch_MouseEnter()
    {
        this.clearBatchMouseOn = true;
    }
    clearBatch_MouseLeave()
    {
        this.clearBatchMouseOn = false;
    }

    batch_MouseEnter()
    {
        this.batchMouseOn = true;
    }
    batch_MouseLeave()
    {
        this.batchMouseOn = false;
    }
    batchMarkDisplay(item: BatchedMarksState)
    {
        if(this.batchMarksTemp.length == 0)
        {
            if(item.markStatus == "<Empty>") return "Batching";
            else if(item.markStatus == "Batched") return "Rebatching";
            else return "Error"
        }

        // If there are marks selected then we want to be specific.
        if(!item.bAction) return item.markStatus;

        if(item.markStatus == "<Empty>") return "Batching";
        else if(item.markStatus == "Batched") return "Rebatching";
        else return "Error"
    }

    itemInShop(item: BatchedMarksState)
    {
        if(item.bInShop)
        {
            return " - In Shop";
        }
        else return "";

    }

    clearBatchMarkDisplay(item: BatchedMarksState)
    {

        if(this.batchMarksTemp.length == 0) 
        {
            if (item.markStatus == "<Empty>") return item.markStatus;
            return "Clearing";
        }
       
        if(this.batchMarksTemp.length != 0) 
        {
                    if(!item.bAction) return item.markStatus;     
            if (item.markStatus == "<Empty>") return item.markStatus;
            return "Clearing";
        }
        return item.markStatus;
    }

    getBatchMarksSelected(): BatchedMark[]
    {

        console.log(this.batchMarksTemp);
        // Only add item if it is selected
        if (this.batchMarksTemp.length > 0)
        {
            console.log('Narrow');
            var result : BatchedMark[] = [];
            for(var i = 0; i < this.batchMarksTemp.length; i++)
            {
                console.log(`Length${this.batchMarksTemp.length}`)
                console.log(`Item(${i})`);
                var batchMark = this.batchMarksTemp[i];
                var markInShop = this.existingMarks.filter((em:BatchedMark) => em.mark == batchMark && em.bInShop);
                if(markInShop.length > 0)
                {
                    console.log(`Item(${i}) Added`);
                    result.push(markInShop[0]);
                }
            }
            return result;
        }
        else
        {
            return this.existingMarks.filter((em:BatchedMark) => em.bInShop);
        }
    }


    clearBatchConfirm() {
        var popupText = '';
        var shopMarks : BatchedMark[] = this.getBatchMarksSelected();

        this.batchMarksTemp
        var warningText = '';

        if (shopMarks.length > 0)
        {
            warningText= '<p class="batch-confirm-warning"> Warning you will be deleting the following work orders that are in the shop.</p><ul class="batch-confirm-warning">'
            shopMarks.forEach((em:BatchedMark) => warningText = warningText + `<li>${em.mark} is in SHOP </li>`);
            warningText = warningText +  '</ul>'
        }

        if (this.forMarks == '')
        {
            var popupTextAll = `Confirm Clearing All <br/><br/> ${warningText}`;
            popupText = popupTextAll;
        }
        else
        {
            var popupTextMark = `Confirm Clearing Batch ${this.forMarks} <br/><br/> ${warningText}`    
            popupText = popupTextMark;
        }        

        confirm(
                    popupText,
                    `Confirm Clearing Batch`
                ).then((res: boolean) => 
                {
                    if (res === true) {
                        this.clearBatchMouseOn = true;
                        this.clearBatch();
                        
                    } else {
                        // document.documentElement.style.overflow = 'auto';
                    }
                });
    }
    clearBatch() {
        this.clearBatchMouseOn = true;
        if(this.batchMarks != undefined && this.batchMarks != null && this.batchMarks != '')
        {
         
            var requestMarks: BatchClearBatchByMarksRequest = {
                        jobKey: this.jobKey,
                        marks: this.batchMarksTemp
                    };

            this.batchingJobService.clearBatchByMarks(requestMarks).subscribe({
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
                                this.timeElapsed = null;
                                this.smp2TimeElapsed = null;

                                this.batchingJobService.getBatchSummary(this.jobKey).subscribe({
                                    next: (data) => {
                                        console.log("We are here.");
                                        console.log(data);
                                        this.batchData = data.data?.batchSummary;
                                        this.batchDataWorkOrders = data.data?.batchSummaryWorkOrders;
                                        this.timeElapsed = data.data?.timeElapsedMilliseconds;
                                        this.smp2TimeElapsed = data.data?.smp2TimeElapsedMilliseconds
                                        this.refreshBatchedMarks();
                                        this.clearBatchMouseOn = false;
                                    }
                                });
                            }
                        }
                    });
        }
        else
        {
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
                                this.timeElapsed = null;
                                this.smp2TimeElapsed = null;

                                this.batchingJobService.getBatchSummary(this.jobKey).subscribe({
                                    next: (data) => {
                                        console.log("We are here.");
                                        console.log(data);
                                        this.batchData = data.data?.batchSummary;
                                        this.batchDataWorkOrders = data.data?.batchSummaryWorkOrders;
                                        this.timeElapsed = data.data?.timeElapsedMilliseconds;
                                        this.smp2TimeElapsed = data.data?.smp2TimeElapsedMilliseconds;
                                        this.refreshBatchedMarks();
                                        this.clearBatchMouseOn = false;
                                    }
                                });
                            }
                        }
                    });
        }       
    }


    refreshBatchedMarks()
    {
        this.batchingJobService.getBatchedMarks(this.jobKey).subscribe({
            next: (res) => {
                if (res.success)
                {
                    if (res.data)
                    {
                        this.existingMarks = res.data;

                        this.batchMarksOptions.forEach((mark: string) => this.batchMarkList.SetMarkStatus(mark, "<Empty>", false));
                        console.log(this.existingMarks);
                        this.existingMarks.forEach((batchedMark : BatchedMark) => this.batchMarkList.SetMarkStatus(batchedMark.mark, "Batched", batchedMark.bInShop));
                        this.batchMarksTemp.forEach((mark : string ) => this.batchMarkList.SetMarkAction(mark));
                    }
                }
            }
        })
    }

    refreshBatchedMarksInPlace()
    {
        this.batchMarksOptions.forEach((mark: string) => this.batchMarkList.SetMarkStatus(mark, "<Empty>", false));
        this.existingMarks.forEach((batchedMark : BatchedMark) => this.batchMarkList.SetMarkStatus(batchedMark.mark, "Batched", batchedMark.bInShop));
        this.batchMarksTemp.forEach((mark : string ) => this.batchMarkList.SetMarkAction(mark));
    }

    get lf(): { [key: string]: AbstractControl } {
        return this.batchingInputGroup.controls;
    }

    calculateCost(data: any) {
        return data.jiQuant * (data.bp + data.addOnPrice);
    }

    triggerBatchConfirm() {
        this.batchMouseOn = true;
        if (
            this.batchingInputGroup.invalid ||
            this.showDupError ||
            this.showSelectedJobItemsError
        ) {
            return;
        }

        var popupText = '';

        var shopMarks : BatchedMark[] = this.getBatchMarksSelected();

        var warningText = '';

        if (shopMarks.length > 0)
        {
            warningText= '<p class="batch-confirm-warning"> Warning you will be deleting the following work orders that are in the shop.</p><ul class="batch-confirm-warning">'
            shopMarks.forEach((em:BatchedMark) => warningText = warningText + `<li>${em.mark} is in SHOP </li>`);
            warningText = warningText +  '</ul>'
        }

        if (this.forMarks == '')
        {
            var popupTextAll = `Confirm Batching All <br/><br/> ${warningText}`;

            popupText = popupTextAll;
        }
        else
        {
            var popupTextMark = `Confirm Batching ${this.forMarks} <br/><br/> ${warningText}`    
            popupText = popupTextMark;
        }
        

        confirm(
                    popupText,
                    `Confirm Batching`
                ).then((res: boolean) => 
                {
                    if (res === true) {
                        this.batchMouseOn = true;
                        this.triggerBatch();
                        
                    } else {
                        // document.documentElement.style.overflow = 'auto';
                    }
                });
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
            marks: this.batchMarksTemp,
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
        this.batchingErrorText = "";
        this.batchingJobService.BatchCutJob(batchJobrequest).subscribe({
            next: (res) => {
                if (res.success) {

                    this.batchInProgress = false;
                    this.completeStep();
                    this.batchingJobService.getBatchSummary(this.jobKey).subscribe({
                        next: (data) => {
                            this.batchData = data.data?.batchSummary;
                            this.batchDataWorkOrders = data.data?.batchSummaryWorkOrders;
                            this.timeElapsed = data.data?.timeElapsedMilliseconds;
                            this.smp2TimeElapsed = data.data?.smp2TimeElapsedMilliseconds;
                            this.refreshBatchedMarks();
                            this.batchMouseOn = false;
                        }
                    });
                } else {
                    //TODO: Clean messages here.
                    this.batchInProgress = false;                    
                    this.batchingErrorText = `Batch Failed: ${res.message}`;
                    this.toastr.error(`Batch Failed: ${res.message}`);
                }
            },
            error: (err) => {
                this.batchInProgress = false;
                this.toastr.error('Batching has failed.');
            }
        });
    }

    batchItemClass(item: any)
    {
        var part1 = "";
        var part2 = "";
        if (this.batchMarksTemp.length == 0) part1 = "batch-target";
        if(item.bAction) part1 = "batch-target";



        if(item.markStatus == "Batched")
        {
            if(item.bInShop)
            {
                part2 = "batch-mark-batch-batchedinshop";
                // return "color:green !important;";
            }
            else
            {
                part2 = "batch-mark-batch-batched";
                // return "color:black !important;";
            }
            
        }
        else if(item.markStatus == "<Empty>") 
        {
            part2 = "batch-mark-batch-empty";
            // return "color:red !important;";
        }
        else if(item.markStatus == "Done")
        {
            part2 = "batch-mark-batch-batchedinshop";
            // return "color:green !important;";
        } 
        else
        {
            part2 = "batch-mark-batch-none";
            // return "color:blue !important;";
        }         
        if (CurrentTheme.SelectedThemeText != '')
        {
            return `${part1} ${CurrentTheme.SelectedThemeText}-${part2}`;
        }
        else
        {
        return `${part1} ${part2}`;    
        }

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

        // TODO: Reason through if we are going to force the multiplier or not.
        this.showDupError = jobBatchQty > 1 && batchDupJobs === '';
        var expectedJobQty = batchDupJobs.trim().split(" ").length + 1;        
        this.showQtyError = batchDupJobs != '' && jobBatchQty < expectedJobQty;
        this.qtyReadOnly = expectedJobQty > 1;
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

export class BatchedMarksState
{
    mark: string;   
    markStatus: string;
    markActionStatus: string;
    bAction: boolean;
    bInShop: boolean;

    constructor(mark: string, status: string, bInShop: boolean)
    {
        this.mark = mark;
        this.markStatus = status;
        this.markActionStatus = this.markStatus;
        this.bAction = false;
        this.bInShop = bInShop;
    }
}

export class BatchedMarkList
{
    marks : BatchedMarksState[] = [];

    bAllClear = false;

    ClearAll()
    {
        this.marks = [];
    }

    AddMark(mark : string, status: string, bInShop: boolean) : BatchedMarksState
    {
        var batchedMark = new BatchedMarksState(mark, status, bInShop);
        this.marks.push(batchedMark);
        this.RefreshData();
        return batchedMark;
    }

    RefreshData()
    {
        if (this.marks.every(markItem => markItem.markStatus == "<Empty>"))
        {
            this.bAllClear = true;
        }
        else
        {
            this.bAllClear = false;
        }
    }

    SetMarkStatus(mark: string, status: string, bInShop: boolean)
    {
        var filteredMarks = this.marks.filter(m => m.mark == mark);
        if (filteredMarks.length > 0)
        {
            var filteredMark = filteredMarks[0];
            filteredMark.bAction = false;
            filteredMark.bInShop = bInShop;
            filteredMark.markStatus = status;
            this.RefreshData();
        }
        else
        {
            var newMark = this.AddMark(mark, status, bInShop);
            newMark.bAction = false;
            newMark.bInShop = bInShop;
            newMark.markStatus = status;
            this.RefreshData();
        }
    }

    SetMarkAction(mark: string)
    {
        var filteredMarks = this.marks.filter(m => m.mark == mark);
        if (filteredMarks.length > 0)
        {
            var filteredMark = filteredMarks[0];
            filteredMark.bAction = true;
            this.RefreshData();
        }
        else
        {
            var newMark = this.AddMark(mark, 'Not Batched', false);
            newMark.bAction = true;
            this.RefreshData();
        }
    }

    SetActionStatus(mark: string, status: string)
    {
        var filteredMarks = this.marks.filter(m => m.mark == mark);
        if (filteredMarks.length > 0)
        {
            var filteredMark = filteredMarks[0];
            filteredMark.bAction = true;
            filteredMark.markActionStatus = status;
            this.RefreshData();
        }
        else
        {
            var newMark = this.AddMark(mark, status, false);
            newMark.bAction = true;
            newMark.markStatus = "Not Batched";
            newMark.markActionStatus = status;
            this.RefreshData();
        }
    }
}