import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissionGuard } from 'src/app/guards/permission-guard.service';
import { AccountingPeriodComponent } from './accounting-period.component';
import { AddEditAccountingPeriodComponent } from './components/add-edit-accounting-period/add-edit-accounting-period.component';
import { ListAccountingPeriodComponent } from './components/list-accounting-period/list-accounting-period.component';

const routes: Routes = [
    {
        path: '',
        component: AccountingPeriodComponent,
        children: [
            {
                path: 'list-accounting-period',
                component: ListAccountingPeriodComponent,
                canActivate: [PermissionGuard],
                data: {
                    breadcrumb: 'Accounting Period List',
                    permissionCodes: ['REACCPERIOD']
                }
            },
            {
                path: 'create-accounting-period',
                component: AddEditAccountingPeriodComponent,
                canActivate: [PermissionGuard],
                data: {
                    breadcrumb: 'Create Accounting Period',
                    permissionCodes: ['CRACCPERIOD']
                }
            },
            {
                path: 'edit-accounting-period/:recId',
                component: AddEditAccountingPeriodComponent,
                canActivate: [PermissionGuard],
                data: {
                    breadcrumb: 'Edit Accounting Period',
                    permissionCodes: ['UPACCPERIOD']
                }
            },
            { path: '**', redirectTo: '/accounting-period/list-accounting-period' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountingPeriodRoutingModule {}
