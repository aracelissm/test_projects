import { Component, OnInit } from '@angular/core';
import { ensure } from 'src/app/common/utils';
import { BatchingSteps } from 'src/app/enums/batching-steps';
import { BatchingStep } from 'src/app/models/batching-step';
import { BatchingPanelsWizardService } from 'src/app/services/batching-panels-wizard.service';

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
    selector: 'app-batching-wizard',
    templateUrl: './batching-panels-wizard.component.html',
    styleUrls: ['./batching-panels-wizard.component.scss']
})
export class BatchingPanelsWizardComponent implements OnInit {
    sidnavstatus = false;
    constructor() {}

    ngOnInit(): void {}
}
