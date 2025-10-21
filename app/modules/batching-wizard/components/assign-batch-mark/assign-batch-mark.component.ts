import {
    Component,
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
import { exportDataGrid } from 'devextreme/excel_exporter';
import { Workbook } from 'exceljs';
import { ToastrService } from 'ngx-toastr';
import { saveExcelFileToLocal } from 'src/app/common/helpers';
import { ensure, isNullOrUndefinedOrEmpty, range } from 'src/app/common/utils';
import { BatchMark } from 'src/app/models/job-batch-mark.model';
import { JobItemBatching, JobItemBatchingOrder } from 'src/app/models/job-item.model';
import { SharedService } from 'src/app/modules/shared/services/shared.service';
import { JobBatchMarkService } from 'src/app/services/job-batch-mark.service';
import { BatchingWizardService } from 'src/app/services/batching-wizard.service';
import { BaseWizardStepComponent } from '../base-wizard-step/base-wizard-step.component';
import { JobMarkType } from 'src/app/enums/job-mark-type';
import { one } from 'devextreme/events';
import dxDataGrid from 'devextreme/ui/data_grid';
import { Null } from 'src/app/models/general.model';

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
    markTypeHtmlAcessor = JobMarkType;

    editorOptions = {
        showClearButton: true
    };
    batchMarkForm: UntypedFormGroup = new UntypedFormGroup({
        mark: new UntypedFormControl('')
    });

    unmarkedGridLoadingPanelVisible = true;
    markedGridLoadingPanelVisible = true;

    dataSourceUnmarked: JobItemBatching[] = [];
    dataSourceMarked: JobItemBatching[] = [];
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
    unmarkedGridCount = 0;
    markedGridCount = 0;

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
        public batchingWizardService2: BatchingWizardService,
        public toastr2: ToastrService,
        public formBuilder2: UntypedFormBuilder,
        private jobBatchMarkService: JobBatchMarkService
    ) {
        super(
            sharedService2,
            router2,
            route2,
            batchingWizardService2,
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
        this.loadStateOfMyWorkOrdersDGH();
    }

    columnChooserModes: any;

    loadStateOfMyWorkOrdersDGH = () => {
        return this.sharedService.getUserDataQueryPreference('batchingMarkHeight');
    };

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
                    options.totalValue += isNullOrUndefinedOrEmpty(options.value.jiTag) ? 0 : options.value.jiQuant * options.value.jiNumPly;
                    break;
            }
        }
        if (options.name === 'designTotal') {
            switch (options.summaryProcess) {
                case 'start':
                    options.totalValue = 0;
                    break;
                case 'calculate':
                    options.totalValue += isNullOrUndefinedOrEmpty(options.value.jiTag) ? 0 : 1;
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

    loadUnmarkedData(){
        this.unmarkedGridLoadingPanelVisible = true;
        const query: Record<string, string> = {};
        this.jobBatchMarkService.getUnmarkedJobItems(this.jobKey, query).subscribe({
            next: (res) => {
                if(res && res.data){
                    this.dataSourceUnmarked = res.data.data;
                    this.unmarkedGridCount = res.data?.data.length || 0;
                }
                this.unmarkedDataGrid.instance.refresh();
                this.unmarkedGridLoadingPanelVisible = false;
            },
            error: (err) => {
                this.toastr.error(err.error.message);
                console.error(err);
                this.unmarkedGridCount = 0;
                this.dataSourceUnmarked = [];
                this.unmarkedDataGrid.instance.refresh();
                this.unmarkedGridLoadingPanelVisible = false;
                
            },
            complete: () => {
                this.isComplete = (this.unmarkedGridCount == 0 && this.markedGridCount >= 0);
                this.unmarkedGridLoadingPanelVisible = false;
                
            }
        });
    }

    loadMarkedData(){
        this.markedGridLoadingPanelVisible = true;
        const query: Record<string, string> = {};
        this.jobBatchMarkService.getMarkedJobItems(this.jobKey, query).subscribe({
            next: (res) => {
                this.onLoadFilters(res.data?.data || []);
                if(res && res.data){
                    this.dataSourceMarked = res.data.data;
                    this.markedGridCount = res.data?.data.length || 0;
                    this.isComplete = res.data?.totalCount === 0;
                }
                this.markedDataGrid.instance.refresh();
                this.markedGridLoadingPanelVisible = false;
            },
            error: (err) => {
                this.onLoadFilters([]);
                console.error(err);
                this.toastr.error(err.error.message);
                this.markedGridCount = 0;
                this.dataSourceMarked = [];
                this.markedDataGrid.instance.refresh();
                this.markedGridLoadingPanelVisible = false;
            },
            complete: () => {
                
                this.isComplete = (this.unmarkedGridCount == 0 && this.markedGridCount >= 0);
                this.markedGridLoadingPanelVisible = false;
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
            this.resetCompleteStatus();
        }

        var orderedKeys = this.fixSelectionOrder(this.selectedUnmarkedKeys, this.unmarkedDataGrid.instance)

        this.selectedUnmarkedKeys = orderedKeys;

        const { mark } = this.batchMarkForm.value;
        const data: BatchMark = {
            jobKey: this.jobKey,
            mark,
            markType: this.markType,
            jobItemIds: this.selectedUnmarkedKeys
        };

        this.markedGridLoadingPanelVisible = true;
        this.unmarkedGridLoadingPanelVisible = true;

        this.jobBatchMarkService.assignBatchMark(data).subscribe({
            next: (res) => {
                if (res && res.success) {
                    this.toastr.success(
                        res.message ? res.message : 'Batch marked successfully'


                        
                    );

                    // Move the items. For crying out loud!
                    // pop unmarked and push to marked.

                    
                    if(res.data)
                    {
                        console.log(res.data);

                        for(var i = 0; i < res.data.jobItemIds.length; i++)
                        {
                            var item = res.data.jobItemIds[i];
                            var pushItems = this.dataSourceUnmarked.filter((it) => it.recId == item);
                            for(var j = 0 ; j < pushItems.length; j++)
                            {
                                var pushThisItem = pushItems[j];
                                pushThisItem.jiBmark = res.data.mark;
                                this.dataSourceMarked.push(pushThisItem);
                            }
                            
                            this.dataSourceUnmarked = this.dataSourceUnmarked.filter((it) => it.recId != item);
                        }          
                        
                        this.jobBatchMarkService.getMarkedJobItemsOrder(this.jobKey).subscribe({
                            next: (resOrder) => {
                                if(resOrder.data && resOrder.data != null)
                                {
                                    this.updateBatchMarkOrder(resOrder.data);                                    
                                }
                            }
                        });
                    }

                    this.markedGridLoadingPanelVisible = false;
                    this.unmarkedGridLoadingPanelVisible = false;
                    this.selectedUnmarkedKeys = [];
                }
            },
            error: (err) => {
                this.toastr.error(err.error.message);
                this.markedGridLoadingPanelVisible = false;
                this.unmarkedGridLoadingPanelVisible = false;
            },
            complete: () => {
                // this.loadUnmarkedData();
                // this.loadMarkedData();
                this.markedGridLoadingPanelVisible = false;
                this.unmarkedGridLoadingPanelVisible = false;
            }
        });
    }

    private fixSelectionOrder(source: number[], grid: dxDataGrid<any, any>) {
        var selectedItemsDict: Record<number, number> = {};

        source.forEach(element => {
            var idx = grid.getRowIndexByKey(element);

            if (idx > -1) {
                selectedItemsDict[idx] = element;
            }
        });

        var tempSelectedKeys: number[] = [];

        for (var key in selectedItemsDict) {
            tempSelectedKeys.push(selectedItemsDict[key]);
        }

        return tempSelectedKeys;
    }

    onChangeBatchMark() {
        if (this.batchMarkForm.invalid) {
            return;
        }
        if (this.currentStep.isComplete) {
            this.resetCompleteStatus();
        }

        var orderedKeys = this.fixSelectionOrder(this.selectedMarkedKeys, this.markedDataGrid.instance)

        this.selectedMarkedKeys = orderedKeys;

        const { mark } = this.batchMarkForm.value;
        const data: BatchMark = {
            jobKey: this.jobKey,
            mark,
            markType: this.markType,
            jobItemIds: this.selectedMarkedKeys
        };

        this.markedGridLoadingPanelVisible = true;
        this.unmarkedGridLoadingPanelVisible = true;
        this.jobBatchMarkService.changeBatchMark(data).subscribe({
            next: (res) => {
                if (res && res.success) {
                    this.toastr.success(
                        res.message ? res.message : 'Mark changed successfully'
                    );

                    this.changeMarkInternal(mark, this.selectedMarkedKeys);

                    this.jobBatchMarkService.getMarkedJobItemsOrder(this.jobKey).subscribe({
                        next: (resOrder) => {
                            if(resOrder.data && resOrder.data != null)
                            {
                                this.updateBatchMarkOrder(resOrder.data);                                    
                            }
                            this.markedDataGrid.instance.refresh();
                        }
                    });

                    this.selectedMarkedKeys = [];
                }
                this.markedGridLoadingPanelVisible = false;
                this.unmarkedGridLoadingPanelVisible = false;
            },
            error: (err) => {
                this.toastr.error(err.error.message);
                this.markedGridLoadingPanelVisible = false;
                this.unmarkedGridLoadingPanelVisible = false;
            },
            complete: () => {
                // this.loadUnmarkedData();
                // this.loadMarkedData();
                this.markedGridLoadingPanelVisible = false;
                this.unmarkedGridLoadingPanelVisible = false;
            }
        });
    }

    onUnmarkBatch() {
        if (this.currentStep.isComplete) {
            this.resetCompleteStatus();
        }
        const data: BatchMark = {
            jobKey: this.jobKey,
            mark: '',
            markType: this.markType,
            jobItemIds: this.selectedMarkedKeys
        };

        this.markedGridLoadingPanelVisible = true;
        this.unmarkedGridLoadingPanelVisible = true;
        this.jobBatchMarkService.removeBatchMark(data).subscribe({
            next: (res) => {
                if (res && res.success) {
                    this.toastr.success(
                        res.message ? res.message : 'Mark removed successfully'
                    );

                    if(res.data)
                    {
                        console.log(res.data);

                        for(var i = 0; i < res.data.jobItemIds.length; i++)
                        {
                            var item = res.data.jobItemIds[i];
                            var pushItems = this.dataSourceMarked.filter((it) => it.recId == item);
                            for(var j = 0 ; j < pushItems.length; j++)
                            {
                                var pushThisItem = pushItems[j];
                                pushThisItem.jiBmark = res.data.mark;
                                this.dataSourceUnmarked.push(pushThisItem);
                            }
                            
                            this.dataSourceMarked = this.dataSourceMarked.filter((it) => it.recId != item);


                            
                            this.jobBatchMarkService.getMarkedJobItemsOrder(this.jobKey).subscribe({
                                next: (resOrder) => {
                                    if(resOrder.data && resOrder.data != null)
                                    {
                                        this.updateBatchMarkOrder(resOrder.data);                                    
                                    }
                                }
                            })
                        }                         
                    }
                    this.markedGridLoadingPanelVisible = false;
                    this.unmarkedGridLoadingPanelVisible = false;
                    this.selectedMarkedKeys = [];
                }
            },
            error: (err) => {
                this.toastr.error(err.error.message);
                this.markedGridLoadingPanelVisible = false;
                this.unmarkedGridLoadingPanelVisible = false;
            },
            complete: () => {
                // this.loadUnmarkedData();
                // this.loadMarkedData();
                this.markedGridLoadingPanelVisible = false;
                this.unmarkedGridLoadingPanelVisible = false;
            }
        });
    }

    changeMarkInternal(mark: string, jobItemIds: number[])
    {
        for(var i = 0; i < jobItemIds.length ; i++)
        {
            var jobItemId = jobItemIds[i];
            for(var j = 0; j < this.dataSourceMarked.length; j++)
            {
                var oldOrder = this.dataSourceMarked[j];

                if(oldOrder.recId == jobItemId)
                {
                    oldOrder.jiBmark = mark;
                }
            }
        }
    }

    updateBatchMarkOrder(data : JobItemBatchingOrder[])
    {
        //jiBmarkOrder
        for(var i = 0; i < data.length ; i++)
        {
            var newOrder = data[i];

            for(var j = 0; j< this.dataSourceMarked.length; j++)
            {
                var oldOrder = this.dataSourceMarked[j];

                if(oldOrder.recId == newOrder.recId)
                {
                    oldOrder.jiBmarkOrder = newOrder.jiBmarkOrder;
                }
            }
        }  
    }

    filterSelected() {
        if (this.filterValue === 'All' || this.filterValue === '') {
            this.markedDataGrid.instance.filter(null);
        } else {
            this.markedDataGrid.instance.filter(['jiBmark', '=', this.filterValue]);
        }
    }

    selectionChangedHandler(event: any) {
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

    onActivateMark() {
        const data: BatchMark = {
            jobKey: this.jobKey,
            mark: '',
            markType: this.markType,
            jobItemIds: []
        };
        this.jobBatchMarkService.activateMark(data).subscribe({
            next: (res) => {
                if (res && res.success) {
                    this.toastr.success(
                        res.message ? res.message : 'Marks activated successfully'
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

    onRowClickUnmarked(e: any) {
        if (e.rowType === "data") {
            if (e.event.shiftKey) {
                const loadedItemIndex = e.rowIndex;
                let lastIdx = 0;
                if (this.selectedUnmarkedKeys.length > 0) {
                    lastIdx = this.unmarkedDataGrid.instance.getRowIndexByKey(this.selectedUnmarkedKeys[this.selectedUnmarkedKeys.length - 1]);
                }

                let idxArray: number[] = [];

                if (loadedItemIndex > lastIdx) {
                    idxArray = range(lastIdx, loadedItemIndex);
                } else if (lastIdx > loadedItemIndex) {
                    idxArray = range(loadedItemIndex, lastIdx);
                }

                this.unmarkedDataGrid.instance.selectRowsByIndexes(idxArray);
            } else {
                e.isSelected ? e.component.deselectRows([e.key]) : e.component.selectRows([e.key], true);
            }
        }
    }

    onRowClickMarked(e: any) {
        if (e.rowType === "data") {
            if (e.event.shiftKey) {
                const loadedItemIndex = e.rowIndex;
                let lastIdx = 0;
                if (this.selectedMarkedKeys.length > 0) {
                    lastIdx = this.markedDataGrid.instance.getRowIndexByKey(this.selectedMarkedKeys[this.selectedMarkedKeys.length - 1]);
                }

                let idxArray: number[] = [];

                if (loadedItemIndex > lastIdx) {
                    idxArray = range(lastIdx, loadedItemIndex);
                } else if (lastIdx > loadedItemIndex) {
                    idxArray = range(loadedItemIndex, lastIdx);
                }

                this.markedDataGrid.instance.selectRowsByIndexes(idxArray);
            } else {
                e.isSelected ? e.component.deselectRows([e.key]) : e.component.selectRows([e.key], true);
            }
        }
    }

    onDragChange = (e: any) => {
        const sourceData = e.fromComponent.getVisibleRows()[e.fromIndex]?.data;
        const targetData = e.component.getVisibleRows()[e.toIndex]?.data;
      
        if (sourceData?.jiBmark !== targetData?.jiBmark) {
          e.cancel = true;
        }
      };          

    onReorder = (e: any) => {        
        const visibleRows = e.component.getVisibleRows();
        const fromData = visibleRows[e.fromIndex]?.data;
        const toData = visibleRows[e.toIndex]?.data;
      
        const sourceGroup = fromData?.jiBmark;
      
        const selectedIds = this.selectedMarkedKeys;
        const groupRows = this.dataSourceMarked.filter(
          row => selectedIds.includes(row.recId) && row.jiBmark === sourceGroup
        );
      
        if (!groupRows.length) {
          e.cancel = true;
          return;
        }
      
        // Remove dragged rows
        const remaining = this.dataSourceMarked.filter(row => !groupRows.includes(row));
      
        // Find index of target row in filtered list
        const toIndex = remaining.findIndex(i => i.recId === toData?.recId);
      
        // Determine direction: up or down
        const isDraggingDown = e.toIndex > e.fromIndex;
      
        let insertIndex = toIndex;
      
        // If dragging down, insert AFTER target (default behavior)
        // If dragging up, insert BEFORE target (subtract 1, unless already 0)
        if (!isDraggingDown && insertIndex > 0) {
          insertIndex = toIndex - 1;
        } else if (isDraggingDown && insertIndex > -1) {
          insertIndex = toIndex + 1;
        }
      
        // Fallback: if no valid toIndex, just append
        if (insertIndex < 0 || insertIndex > remaining.length) {
          insertIndex = remaining.length;
        }
      
        remaining.splice(insertIndex, 0, ...groupRows);
      
        this.dataSourceMarked = remaining;
        this.updateBmarkOrder();
        
        // trigger reordering call to DB.
        this.onReorderInternal(sourceGroup);
      };
      
      
      updateBmarkOrder() {
        this.dataSourceMarked.forEach((item, index) => {
           item.jiBmarkOrder = index + 1;
        });
      }

       onReorderInternal(markInput : string) {

        // Fetch all that match on mark.
        var itemsInMark : JobItemBatching[] = [];

        for(var i = 0; i < this.dataSourceMarked.length; i++)
        {
            var item : JobItemBatching = this.dataSourceMarked[i];
            if(item.jiBmark == markInput)
            {
                itemsInMark.push(item);
            }
        }
      
        var itemsInMarkIds = itemsInMark.map((it) => it.recId);

        const data: BatchMark = {
            jobKey: this.jobKey,
            mark: markInput,
            markType: this.markType,
            jobItemIds: itemsInMarkIds
        };

        this.markedGridLoadingPanelVisible = true;
        this.unmarkedGridLoadingPanelVisible = true;
        this.jobBatchMarkService.changeBatchMark(data).subscribe({
            next: (res) => {
                if (res && res.success) {
                    this.toastr.success(
                        res.message ? res.message : 'Batch order changed successfully'
                    );

                    this.changeMarkInternal(markInput, this.selectedMarkedKeys);

                    this.jobBatchMarkService.getMarkedJobItemsOrder(this.jobKey).subscribe({
                        next: (resOrder) => {
                            if(resOrder.data && resOrder.data != null)
                            {
                                this.updateBatchMarkOrder(resOrder.data);                                    
                            }
                            this.markedDataGrid.instance.refresh();
                        }
                    });

                    this.selectedMarkedKeys = [];
                }
                this.markedGridLoadingPanelVisible = false;
                this.unmarkedGridLoadingPanelVisible = false;
            },
            error: (err) => {
                this.toastr.error(err.error.message);
                this.markedGridLoadingPanelVisible = false;
                this.unmarkedGridLoadingPanelVisible = false;
            },
            complete: () => {
                // this.loadUnmarkedData();
                // this.loadMarkedData();
                this.markedGridLoadingPanelVisible = false;
                this.unmarkedGridLoadingPanelVisible = false;
            }
        });
    }
}
