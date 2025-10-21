import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DevExtremeModule, DxTextAreaModule } from 'devextreme-angular';
import { AppDirectivesModule } from '../shared/modules/app-directives.module';
import { SharedModule } from '../shared/shared.module';
import { BatchingCategoryRoutingModule } from './batching-category-routing.module';
import { BatchingCategoryComponent } from './batching-category.component';
import { AddEditBatchingCategoryComponent } from './components/add-edit-batching-category/add-edit-batching-category.component';
import { ListBatchingCategoryComponent } from './components/list-batching-category/list-batching-category.component';

@NgModule({
    declarations: [

    ],
    imports: [
        CommonModule,
        BatchingCategoryRoutingModule,
        DevExtremeModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        DxTextAreaModule,
        AppDirectivesModule,
                BatchingCategoryComponent,
        ListBatchingCategoryComponent,
        AddEditBatchingCategoryComponent
    ],
    providers: [DatePipe]
})
export class BatchingCategoryModule {}
