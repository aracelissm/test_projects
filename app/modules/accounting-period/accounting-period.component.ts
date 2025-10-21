import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { RouterModule } from '@angular/router';

import { DevExtremeModule } from 'devextreme-angular';
import { ValidationStatus } from 'devextreme/common';
import {ColumnResizeMode} from 'devextreme/common/grids';
import { MaterialModule } from 'src/app/modules/shared/modules/material.module';
import { SawFetchStationModule } from '../saw-fetch-station/saw-fetch-station.module';

@Component({
    standalone: true,
    imports: [
      CommonModule, 
      RouterModule,
      SharedModule,
      MaterialModule,
      DevExtremeModule,
      SawFetchStationModule
    ],
    selector: 'app-accounting-period',
    templateUrl: './accounting-period.component.html',
    styleUrls: ['./accounting-period.component.scss']
})
export class AccountingPeriodComponent implements OnInit {
    constructor() {}
  sidnavstatus = false;
    ngOnInit (): void {}
}
