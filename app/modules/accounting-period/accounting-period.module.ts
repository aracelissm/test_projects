import { CommonModule, DatePipe } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DevExtremeModule } from 'devextreme-angular';
import { ValidationStatus } from 'devextreme/common';
import {ColumnResizeMode} from 'devextreme/common/grids';
import { AppDirectivesModule } from '../shared/modules/app-directives.module';
import { SharedModule } from '../shared/shared.module';
import { AccountingPeriodRoutingModule } from './accounting-period-routing.module';
import { AccountingPeriodComponent } from './accounting-period.component';
import { AddEditAccountingPeriodComponent } from './components/add-edit-accounting-period/add-edit-accounting-period.component';
import { ListAccountingPeriodComponent } from './components/list-accounting-period/list-accounting-period.component';

@NgModule({
    declarations: [

    ],
    imports: [
        CommonModule,
        AccountingPeriodRoutingModule,
        DevExtremeModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        AppDirectivesModule,
        AccountingPeriodComponent,
        ListAccountingPeriodComponent,
        AddEditAccountingPeriodComponent
    ],
    schemas:[CUSTOM_ELEMENTS_SCHEMA],
    providers: [DatePipe]
})
export class AccountingPeriodModule {}
