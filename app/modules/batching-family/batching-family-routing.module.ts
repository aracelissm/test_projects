import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BatchingFamilyComponent } from './batching-family.component';
import { AddEditBatchingFamilyComponent } from './components/add-edit-batching-family/add-edit-batching-family.component';
import { ListBatchingFamilyComponent } from './components/list-batching-family/list-batching-family.component';

const routes: Routes = [
    {
        path: '',
        component: BatchingFamilyComponent,
        children: [
            {
                path: 'list-batching-family',
                component: ListBatchingFamilyComponent,
                data: { breadcrumb: 'Batching Family Management' }
            },
            {
                path: 'create-batching-family',
                component: AddEditBatchingFamilyComponent,
                data: { breadcrumb: 'Create Batching Family' }
            },
            {
                path: 'add-edit-batching-family/:recId',
                component: AddEditBatchingFamilyComponent,
                data: { breadcrumb: 'Edit Batching Family' }
            },
            { path: '**', redirectTo: '/batching-family/list-batching-family' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BatchingFamilyRoutingModule {}
