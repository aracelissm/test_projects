import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BatchingStep } from 'src/app/models/batching-step';
import { SharedService } from 'src/app/modules/shared/services/shared.service';
import { BatchingWizardService } from 'src/app/services/batching-wizard.service';
import { BaseWizardStepComponent } from '../base-wizard-step/base-wizard-step.component';
import { BatchJobService } from 'src/app/services/batch-job.service';
import { BatchPrintSummaryResponse, JobHeadBatchingOptions, SendToShopRequest } from 'src/app/models/batch-job.model';
import { BatchingReportType } from 'src/app/enums/batching-report-type';
import { BatchingReportService } from 'src/app/services/batching-report.service';
import CustomStore from 'devextreme/data/custom_store';
import { Workbook } from 'exceljs';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { saveExcelFileToLocal } from 'src/app/common/helpers';
import { DxDataGridComponent } from 'devextreme-angular';
import { isNullOrUndefinedOrEmpty } from 'src/app/common/utils';
import { firstValueFrom } from 'rxjs';
import { alert } from 'devextreme/ui/dialog';
import { LaserCutReportRequest, PrintAllBatchesRequest, ShopDrawingReportRequest } from 'src/app/models/batching-report.model';
import { BatchedWorkOrder } from 'src/app/models/job-item.model';

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
  selector: 'app-batch-print-labels',
  templateUrl: './batch-print-labels.component.html',
  styleUrls: ['./batch-print-labels.component.scss']
})
export class BatchPrintLabelsComponent extends BaseWizardStepComponent implements OnInit {
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid!: DxDataGridComponent;
  dataSource!: CustomStore;
  columnChooserModes: any;
  gridCount = 0;
  searchResult = '';
  loadingPanelVisible : boolean = false;
  asRoofLabel: boolean = false;
  forMarks = '';
  printMarks = ''
  printMarksMultiSelect = [];
  printMarksOptions : string[] = [];

  lastBatchOptions : JobHeadBatchingOptions | undefined;

  printAllBatchesConfig : PrintAllBatchesRequest = {
    id: '-1',
    includeSummary: true,
    includePlateFetch: false,
    plateFetchByTruss: false,
    includeMaterial: false,
    printAllBatches: false   
  }


  roofLabelCntDisplay = 0;
  floorLabelCntDisplay = 0;
  

  batchPrintSummary : BatchPrintSummaryResponse = {
    floorLabelCnt: 0,
    roofLabelCnt: 0,
    floorMarkAndCnt: [],
    roofMarkAndCnt: []
  }

  editorOptions = {
    showClearButton: true
};

    constructor(
      public sharedService2: SharedService,
      public router2: Router,
      public route2: ActivatedRoute,
      public batchingWizardService2: BatchingWizardService,
      public toastr2: ToastrService,
      public formBuilder2: UntypedFormBuilder,
      private batchingJobService: BatchJobService,
      private batchingReportService: BatchingReportService
    ) {
      super(sharedService2, router2, route2, batchingWizardService2, toastr2, formBuilder2);

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
      console.log('BatchPrintLabelsComponent');

      this.batchingJobService.getBatchingOptions(this.jobKey).subscribe({
            next: (res) => {
                if (res.success)
                {
                  console.log("We made it")
                    console.log(res.data);
                    if(res.data)
                    {
                      this.lastBatchOptions = res.data;
                    }
                }
                else
                {
                  console.log("failed")
                }

            },
            error: (err) => {
            }
        })

      this.batchingJobService.getBatchPrintSummary(this.jobKey).subscribe({
        next: (res) => {
          if (res.success && res.data)
          {
            this.batchPrintSummary = res.data;
            this.roofLabelCntDisplay = this.batchPrintSummary.roofLabelCnt;
            this.floorLabelCntDisplay = this.batchPrintSummary.floorLabelCnt;
          }
        }
      })

      this.loadData();

      this.route.queryParams.subscribe((params: any) => {
        this.searchResult = params.search;
      });
    }

    printLoading(loadingVisible : boolean)
    {
      if (loadingVisible)
      {
        this.loadingPanelVisible = true;
        //disable print buttons
      }
      else{
        this.loadingPanelVisible = false;
        //enable print buttons
      }
    }

    getPrintMarkLabelFn(item: any) {
        return item;
    }

    onPrintMarkSelected(item: any)
    {
      console.log(item);
      this.printMarks = (item.sort().join(','));
      this.markValidator();
    }

    markValidator()
    {
      var printM = this.printMarks.trim();
      if (printM == '' || printM == null || printM == undefined)
      {
        this.forMarks = '';
        this.floorLabelCntDisplay = this.batchPrintSummary.floorLabelCnt;
        this.roofLabelCntDisplay = this.batchPrintSummary.roofLabelCnt;
      }
      else 
      {
        this.forMarks = ` for marks (${printM})`;
        if (this.batchPrintSummary.floorLabelCnt == 0)
        {
          this.floorLabelCntDisplay = 0;
        }
        else
        {
          var floorLblByMarkCnt = 0;
          var marks = printM.split(',');
          for(var i = 0; i < marks.length; i++)
          {
            var mark = marks[i].trim();
            for(var j = 0; j < this.batchPrintSummary.floorMarkAndCnt.length; j++)
            {
              var batchMark = this.batchPrintSummary.floorMarkAndCnt[j];
              if(batchMark.mark == mark)
              {
                floorLblByMarkCnt += batchMark.count;
              }
            }
          }
          this.floorLabelCntDisplay = floorLblByMarkCnt;
        }

        if (this.batchPrintSummary.roofLabelCnt == 0)
        {
          this.roofLabelCntDisplay = 0;
        }
        else
        {
          var roofLblByMarkCnt = 0;
          var marks = printM.split(',');
          for(var i = 0; i < marks.length; i++)
          {
            var mark = marks[i].trim();
            for(var j = 0; j < this.batchPrintSummary.roofMarkAndCnt.length; j++)
            {
              var batchMark = this.batchPrintSummary.roofMarkAndCnt[j];
              if(batchMark.mark == mark)
              {
                roofLblByMarkCnt += batchMark.count;
              }
            }
          }
          this.roofLabelCntDisplay = roofLblByMarkCnt;
        }
      }
    }

    printRoofLabels() {
      this.loadingPanelVisible = true;
      this.batchingJobService.printRoofLabels(this.jobKey, this.printMarks).subscribe({
        next: (res: any) => {
          this.downloadFile(`RoofTruss-${this.jobKey}.pdf`, res);
        },
        complete: () => {
          this.loadingPanelVisible = false;
        }
      });
    }

    printFloorLabels() {
      this.loadingPanelVisible = true;
      this.batchingJobService.printFloorLabels(this.jobKey, this.asRoofLabel, this.printMarks).subscribe({
        next: (res: any) => {
          this.downloadFile(`FloorTruss-${this.jobKey}.pdf`, res);
        },
        complete: () => {
          this.loadingPanelVisible = false;
        }
      });
    }

    //TODO figure out how to get this to open in a new tab.
    downloadFile(fileName: string, res: any) {
      const fileUrl = URL.createObjectURL(res.body);
      window.open(fileUrl, '_blank');
  }

  onClickOpenLaserCutReport() {
    this.loadingPanelVisible = true;
    var request: LaserCutReportRequest = { jobItemRecIds: [], marks: []};

    if(this.printMarksMultiSelect.length > 0)
    {
      request.marks = this.printMarksMultiSelect;
    }


    this.batchingReportService.getLaserCutReport(this.jobKey, request).subscribe({
      next: (res: any) => {
        const fileName = res.headers.get('content-disposition').split(';')[1].split('filename')[1].split('=')[1].trim();
        this.downloadFile(fileName, res);
      },
      complete: () => {
        this.loadingPanelVisible = false;
      }
    });
  }

  onClickOpenShopDrawingReport() {
    this.loadingPanelVisible = true;
    var request: ShopDrawingReportRequest = { jobItemRecIds: [], marks: []};

    if(this.printMarksMultiSelect.length > 0)
    {
      request.marks = this.printMarksMultiSelect;
    }

    this.batchingReportService.getShopDrawingReport(this.jobKey,request).subscribe({
      next: (res: any) => {
        const fileName = res.headers.get('content-disposition').split(';')[1].split('filename')[1].split('=')[1].trim();
        this.downloadFile(fileName, res);
      },
      complete: () => {
        this.loadingPanelVisible = false;
      }
    });
  }

  onClickOpenBatchSummaryReport() {
    this.batchingReportService.getBatchSummaryReport(this.jobKey).subscribe({
      next: (res: any) => {
        const fileName = res.headers.get('content-disposition').split(';')[1].split('filename')[1].split('=')[1].trim();
        this.downloadFile(fileName, res);
      }
    });
  }

  onClickOpenPrintAllBatches() {
    this.loadingPanelVisible = true;
    this.printAllBatchesConfig.id = this.jobKey;
    console.log(this.printAllBatchesConfig);
    this.batchingReportService.getPrintAllBatches(this.printAllBatchesConfig).subscribe({
      next: (res: any) => {
        const fileName = res.headers.get('content-disposition').split(';')[1].split('filename')[1].split('=')[1].trim();
        console.log('FileName');
        console.log(fileName);
        this.downloadFile(fileName, res);
      },
      complete: () => {
        this.loadingPanelVisible = false;
      }
    });
  }

  onExporting(e: any) {
    const name = 'BatchWorkOrders';
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet(name);
    exportDataGrid({
        component: e.component,
        worksheet: worksheet
    }).then(() => saveExcelFileToLocal(workbook, name));
    e.cancel = true;
  }

  loadData() {
    this.dataSource = new CustomStore({
        key: 'woid',
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
                this.batchingJobService.getBatchedWorkOrders(this.jobKey, query)
            )
                .then((res) => {
                    if (res && res.success) {
                        this.gridCount = res.data?.data.length || 0;
                        this.isComplete = res.data?.totalCount === 0;


                        var resData = res.data?.data ||[];
                        var marks = resData.filter((d:BatchedWorkOrder) => d.mark != undefined && d.mark != null && d.mark != '').map((bwo: BatchedWorkOrder) => bwo.mark)
                        this.printMarksOptions = marks.filter((value, index, array) => array.indexOf(value) === index);


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
      this.dataGrid.instance.getScrollable().scrollTo(0);
      this.dataGrid.instance.clearFilter();
  }

  sendToShop()
  {
    console.log('Send To Shop Triggered');

    var request: SendToShopRequest = {
      jobKey: this.jobKey,
      locationName: 'FtPierce Plant',
      locationId: 1,
      marks: []
    }

    
    if(this.printMarksMultiSelect.length > 0)
    {
      request.marks = this.printMarksMultiSelect;
    }

    this.batchingJobService.SendToShop(request).subscribe({
      next: (res) => {
        console.log(res);
        if (res.success)
        {
          this.toastr.success('Batch successfully sent to shop.');

          // Navigate back to batching wizard.
          alert(
            'Batch successfully sent to shop.',
            'Send To Shop Completed'
          ).then((val) => {
            this.router.navigate(['/work-order/batching']);
          }); 
        }
        else
        {
          if (res.message)
          {
            this.toastr.error(res.message);
            alert(
              'Batch failed to send shop: ' + res.message,
              'Send To Shop Failed'
            )
          }
          else this.toastr.error("Failed To Send To Shop");    
        }       
      },
      error: (err) => {
        console.log(err);
        this.toastr.error(err);
      }
    })
    
    
  }
}
