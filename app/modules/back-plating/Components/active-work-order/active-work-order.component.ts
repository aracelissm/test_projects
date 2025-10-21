import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/modules/shared/services/shared.service';
import { BackPlatingService } from 'src/app/services/back-Plating.service';

import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { RouterModule } from '@angular/router';
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
  selector: 'app-active-work-order',
  templateUrl: './active-work-order.component.html',
  styleUrls: ['./active-work-order.component.scss']
})
export class ActiveWorkOrderComponent implements OnInit {
  @Input() activeWorkOrder!:{
  jobNumber:string,
  Mark:string
  scheduleDate:string,
  customerNumber:string,
  project:string,
  jobRef:string,
  woStatus:string,
  woid:number
 } ;
 
 @Output() doRefershEvent: EventEmitter<boolean> = new EventEmitter();
  constructor(private backPlatingService: BackPlatingService , 
    private sharedService: SharedService,
    private toastService: ToastrService) { }

  ngOnInit(): void {
  }

  start():void {
   const inprogressWorkOrder =  this.backPlatingService.listWorkOrders?.filter(e=> e.esdStatus?.trim()== 'L');
   if(!!inprogressWorkOrder && inprogressWorkOrder?.length>0){
    this.toastService.error("Already a job is in progress. Please finish it before starting another");
   }
   else
   this.backPlatingService.start(this.activeWorkOrder.woid).subscribe((res)=>{
    this.toastService.success("Work Order Started Successfully");
    this.backPlatingService.doRefershEvent.next(true);
   });
  }

  stop(): void {
    if(this.activeWorkOrder?.woid>0){
    this.backPlatingService.stop(this.activeWorkOrder.woid , this.sharedService.selectedPlantLocationValue?.locationId||0).subscribe((res)=>{
      this.toastService.success("Work Order Completed Successfully");
      this.backPlatingService.doRefershEvent.next(true);
    });
  }
  }

}
