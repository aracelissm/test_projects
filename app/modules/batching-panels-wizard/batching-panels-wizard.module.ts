import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImportJobComponent } from './components/import-job/import-job.component';
import { BatchingPanelsWizardRoutingModule } from './batching-panels-wizard-routing.module';
import { BatchingPanelsWizardComponent } from './batching-panels-wizard.component';
import { SharedModule } from '../shared/shared.module';
import { AppDirectivesModule } from '../shared/modules/app-directives.module';
import { CreateShippingBundlesComponent } from './components/create-shipping-bundles/create-shipping-bundles.component';
import { AssignBatchMarkComponent } from './components/assign-batch-mark/assign-batch-mark.component';
import { MaterialListComponent } from './components/material-list/material-list.component';
import { BatchJobComponent } from './components/batch-job/batch-job.component';
import { BatchPrintLabelsComponent } from './components/batch-print-labels/batch-print-labels.component';
import { PdfReportsComponent } from './components/pdf-reports/pdf-reports.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { DxLoadPanelModule, DevExtremeModule } from 'devextreme-angular';
import { BatchJobPanelComponent } from './components/batch-job-panel/batch-job-panel.component';
import { TrussViewerModule } from '../truss-viewer/truss-viewer.module';

@NgModule({
    declarations: [
        
    ],
    imports: [
        CommonModule,
        BatchingPanelsWizardRoutingModule,
        DevExtremeModule,
        SharedModule,
        AppDirectivesModule,
        PdfViewerModule,
        DxLoadPanelModule,
        TrussViewerModule,
        BatchingPanelsWizardComponent,
        CreateShippingBundlesComponent,
        AssignBatchMarkComponent,
        MaterialListComponent,
        ImportJobComponent,
        BatchJobComponent,
        BatchPrintLabelsComponent,
        PdfReportsComponent,
        BatchJobPanelComponent
    ]
})
export class BatchingWizardModule {}
