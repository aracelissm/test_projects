import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DxDataGridComponent } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import { ToastrService } from 'ngx-toastr';
import { WebcamInitError, WebcamImage } from 'ngx-webcam';
import { firstValueFrom, Observable, Subject } from 'rxjs';
import { isNullOrUndefinedOrEmpty } from 'src/app/common/utils';
import { ImagePreview } from 'src/app/models/ShipStation.model';
import { GridConfigurationService } from 'src/app/modules/shared/services/grid-configuration.service';
import { SharedService } from 'src/app/modules/shared/services/shared.service';
import { BackPlatingService } from 'src/app/services/back-Plating.service';

import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import {  RouterModule } from '@angular/router';

import { DevExtremeModule } from 'devextreme-angular';
import { ValidationStatus } from 'devextreme/common';
import {ColumnResizeMode} from 'devextreme/common/grids';
import { MaterialModule } from 'src/app/modules/shared/modules/material.module';

@Component({
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule,
    SharedModule,
    MaterialModule,
    DevExtremeModule
  ],
  selector: 'app-list-work-orders',
  templateUrl: './list-work-orders.component.html',
  styleUrls: ['./list-work-orders.component.scss']
})
export class ListWorkOrdersComponent implements OnInit {
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid!: DxDataGridComponent;
  pageSizeOptions: number[] = [15, 25, 50, 100];
  selectedPageSize: number = this.pageSizeOptions[0];
  dataGridHeight = 0;
  gridCount = 0;
  isUndo = true;
  dataSource!: CustomStore;
  editorOptions = {
    showClearButton: true
  };
  columnChooserModes: any;
  @Output()  selectedWorkOrder: EventEmitter<any> = new EventEmitter<any>();;
  
  constructor(private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private backPlatingService: BackPlatingService,
    public sharedService: SharedService,
    private gridConfigService: GridConfigurationService) {
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
        this.backPlatingService.doRefershEvent.subscribe((res)=>{
          this.getWorkOrders();
        })
        this.getWorkOrders();
    }

    
  private calcDataGridHeight(): void {
    this.dataGridHeight =
        46 +
        60 +
        22 *
            (this.selectedPageSize <= this.gridCount
                ? this.selectedPageSize
                : this.gridCount) +
        43;
  }


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

  onGridClickCancel() {
    this.dataGrid.instance.getScrollable().scrollTo(0);
    this.dataGrid.instance.clearFilter();
   
}

  ngAfterViewInit() {
    const defaultOptions = this.gridConfigService.getCommonGridOptions();
    this.dataGrid.instance.option(defaultOptions);
    // this.sharedService.selectedPlantLocation$.subscribe({
    //   next: (data) => {
    //       if (data) {
    //           this.locationId = data.locationId;
    //           // Update Base Filter for grid.
    //           this.gridBaseFilter();
    //       }
    //     }
    // });
  }



  formatDatetime(datetime: string): string {
    const formattedDate = datetime?.toLocaleString().slice(0, 19).replace('T', ' ') || '';
    return formattedDate;
}
   
    storeData(): void {
        const key = 'backPlatingWorkOrdersHeight';
        const value = localStorage.getItem(key);
        if (value != null) {
            this.selectedPageSize = Number(value);
        }
        this.calcDataGridHeight();
        this.loadStateOfMyWorkOrdersDGH();
    }

    loadStateOfMyWorkOrdersDGH = () => {
        return this.sharedService.getUserDataQueryPreference('backPlatingWorkOrdersHeight');
    };

    saveStateOfMyWorkOrdersDGH = () => {
        this.sharedService.saveUserDataQueryPreference(
            'backPlatingWorkOrdersHeight',
            this.selectedPageSize
        );
    };
    loadState = () => {
      return this.sharedService.getUserDataQueryPreference('backPlatinWorkOrderGrid');
  };

  saveState = (state: any) => {
      this.sharedService.saveUserDataQueryPreference('backPlatinWorkOrderGrid', state);
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


  onRowClick(e:any){
    this.selectedWorkOrder.emit(e.data);
  }

  getWorkOrders(){
    this.dataSource = new CustomStore({
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
              this.backPlatingService.getWorkorders(this.sharedService.selectedPlantLocationValue?.locationName || '')
          )
              .then((res) => {
                  if (res && res.success) {
                      this.gridCount = res.data?.length || 0;
                      this.backPlatingService.listWorkOrders = res.data;
                      if(res.data){
                        res.data.forEach(obj => {
                           obj.esdSchedDate = this.formatDatetime(obj.esdSchedDate)
                      });
                      // this.shipWorkOrders = res.data;
                       const activeJob = res.data.filter(record => record.esdStatus?.trim() === "L");
                      if(activeJob && activeJob.length>0){
                        this.selectedWorkOrder.emit(activeJob[0]);
                      }
                      else{
                        this.selectedWorkOrder.emit(null);
                      }
                    }
                      return {
                          data: res?.data || [],
                          totalCount: res?.data?.length
                      };
                      
                  }
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

  rowPrepared(e:any) {
    if (e.rowType === "data" && e.data.esdStatus?.trim() === "L") {
      e.rowElement.style.backgroundColor = "#e6e6e6";
    }
  }

}