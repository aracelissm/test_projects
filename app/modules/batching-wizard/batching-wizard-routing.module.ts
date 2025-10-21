import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BatchingWizardComponent } from './batching-wizard.component';
import { AssignBatchMarkComponent } from './components/assign-batch-mark/assign-batch-mark.component';
import { CreateShippingBundlesComponent } from './components/create-shipping-bundles/create-shipping-bundles.component';
import { PendingChangesGuard } from 'src/app/guards/pending-changes-guard.service';
import { MaterialListComponent } from './components/material-list/material-list.component';
import { BatchJobComponent } from './components/batch-job/batch-job.component';
import { BatchPrintLabelsComponent } from './components/batch-print-labels/batch-print-labels.component';
import { PdfReportsComponent } from './components/pdf-reports/pdf-reports.component';
import { ImportJobComponent } from './components/import-job/import-job.component';
import { BatchJobPanelComponent } from './components/batch-job-panel/batch-job-panel.component';

const routes: Routes = [
  {
    path: '',
    component: BatchingWizardComponent,
    children: [
      {
        path: 'import-job/:jobKey/:stepOrder',
        component: ImportJobComponent,
        data: { breadcrumb: 'Import Job' }
      },
      {
        path: 'assign-batch-mark/:jobKey/:stepOrder',
        component: AssignBatchMarkComponent,
        data: { breadcrumb: 'Assign Batch Mark' }
      },
      {
        path: 'create-shipping-bundles/:jobKey/:stepOrder',
        component: CreateShippingBundlesComponent,
        canDeactivate: [PendingChangesGuard],
        data: { breadcrumb: 'Create Shipping Bundle' }
      },
      {
        path: 'batch-job/:jobKey/:stepOrder',
        component: BatchJobComponent,
        data: { breadcrumb: 'Batch Job Truss' }
      },
      {
        path: 'batch-job-panel/:jobKey',
        component: BatchJobPanelComponent,
        data: { breadcrumb: 'Batch Job Panel' }
      },
      {
        path: 'batch-print-labels/:jobKey/:stepOrder',
        component: BatchPrintLabelsComponent,
        data: { breadcrumb: 'Print All Paperwork' }
      },
      {
        path: 'material-list/:jobKey',
        component: MaterialListComponent,
        data: { breadcrumb: 'List Materials' }
      },
      {
        path: 'pdf-reports/:jobKey/:report',
        component: PdfReportsComponent,
        data: { breadcrumb: 'PDF' }
      },
      { path: '**', redirectTo: '/work-order/batching' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BatchingWizardRoutingModule { }
