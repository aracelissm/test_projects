import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DevExtremeModule, DxTextAreaModule } from 'devextreme-angular';
import { AppDirectivesModule } from '../shared/modules/app-directives.module';
import { SharedModule } from '../shared/shared.module';
import { BatchingFamilyRoutingModule } from './batching-family-routing.module';
import { BatchingFamilyComponent } from './batching-family.component';
import { AddEditBatchingFamilyComponent } from './components/add-edit-batching-family/add-edit-batching-family.component';
import { ListBatchingFamilyComponent } from './components/list-batching-family/list-batching-family.component';

@NgModule({
    declarations: [

    ],
    imports: [
        CommonModule,
        BatchingFamilyRoutingModule,
        DevExtremeModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        DxTextAreaModule,
        AppDirectivesModule,
                BatchingFamilyComponent,
        ListBatchingFamilyComponent,
        AddEditBatchingFamilyComponent
    ],
    providers: [DatePipe]
})
export class BatchingFamilyModule {}
