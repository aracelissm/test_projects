import { Component, OnInit } from '@angular/core';

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
    selector: 'app-error-component.ts',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
