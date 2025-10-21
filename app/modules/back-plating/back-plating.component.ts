import { Component, OnInit} from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import { Null } from 'src/app/models/general.model';
import { BackPlatingService } from 'src/app/services/back-Plating.service';
import { SharedService } from '../shared/services/shared.service';

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
  selector: 'app-back-plating',
  templateUrl: './back-plating.component.html',
  styleUrls: ['./back-plating.component.scss']
})
export class BackPlatingComponent implements OnInit {
  selectedEmployee!: Null<{label:string,
  value:number}>;
  employeeName:string='';
  employeeOptions: {label:string,
    value:number}[] = [];
  employees: any;
  isEmployeeExist=false;
  clockinmsg='';
  dataSource!: CustomStore;

  activeWorkOrder!:{
    jobNumber:string,
    Mark:string
    scheduleDate:string| Date|any,
    customerNumber:string,
    project:string,
    jobRef:string,
    woStatus:string,
    woid:number
   }

  constructor(private backPlateService: BackPlatingService,
    private sharedService: SharedService) { }

  ngOnInit(): void {
    this.backPlateService.getLoggedInEmployees(this.sharedService.selectedPlantLocationValue?.locationName||'')
    .subscribe((res:any) => {
        let data = res.data;
        this.employeeOptions=[]
        this.isEmployeeExist =  data.length>0? true:false;
        if(!this.isEmployeeExist){
          this.clockinmsg = "Employees Was not logged in"
        }
        const inprogressWorkOrder = data.filter((e:any)=> e.esdStatus == 'L')[0];
        if(inprogressWorkOrder){
        this.activeWorkOrder = {
          jobNumber:inprogressWorkOrder.esdJobkey,
            Mark:inprogressWorkOrder.esdMark,
            scheduleDate:inprogressWorkOrder.esdSchedDate,
            customerNumber:inprogressWorkOrder.jobCustomerKey,
            project:inprogressWorkOrder.project,
            jobRef:inprogressWorkOrder.JobRef,
            woStatus:inprogressWorkOrder.esdStatus?.trim(),
            woid: inprogressWorkOrder.woid
        }
      }
        data.forEach((element:any) => {
            this.employeeOptions.push({
                label:(element.firstName || '') + ' ' + element?.lastName + ' - ' + element.empNumber,
                value:element.empNumber
            })
        });
        this.employees = res.data;
    });
  }
  employeeTrackByFn(item: any) {
    return item.value;
}

  onSelectEmployee(event: any) {
   //  this.getWorkOrders();
}

  employeeOptionLabelFn(item: any) {
    return item?.label;
}

getSelectedWorkOrder(e:any){
  if(e){
      this.activeWorkOrder = {
        jobNumber:e.esdJobkey,
          Mark:e.esdMark,
          scheduleDate:e.esdSchedDate,
          customerNumber:e.jobCustomerKey,
          project:e.project,
          jobRef:e.JobRef,
          woStatus:e.esdStatus?.trim(),
          woid: e.woid
      }
  }
  else {
    this.activeWorkOrder = {
      jobNumber:'',
        Mark:'',
        scheduleDate:'',
        customerNumber:'',
        project:'',
        jobRef:'',
        woStatus:'',
        woid: 0
    
  }
}
}


}
