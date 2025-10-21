import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BatchingCategoryComponent } from './batching-category.component';
import { AddEditBatchingCategoryComponent } from './components/add-edit-batching-category/add-edit-batching-category.component';
import { ListBatchingCategoryComponent } from './components/list-batching-category/list-batching-category.component';

const routes: Routes = [
    {
        path: '',
        component: BatchingCategoryComponent,
        children: [
            {
                path: 'list-batching-category',
                component: ListBatchingCategoryComponent,
                data: { breadcrumb: 'Batching Category Management' }
            },
            {
                path: 'create-batching-category',
                component: AddEditBatchingCategoryComponent,
                data: { breadcrumb: 'Create Batching Category' }
            },
            {
                path: 'add-edit-batching-category/:recId',
                component: AddEditBatchingCategoryComponent,
                data: { breadcrumb: 'Edit Batching Category' }
            },
            { path: '**', redirectTo: '/batching-category/list-batching-category' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BatchingCategoryRoutingModule {}
