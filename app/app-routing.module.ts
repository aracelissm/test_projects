import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { FeatureFlagGuardService } from './guards/feature-flag-guard.service';
import { AuthComponent } from './layouts/auth/auth.component';
import { MainComponent } from './layouts/main/main.component';
import { ExcelViewer } from './modules/shared/components/dialogs/excel-viewer/excel-viewer.component';
import { customPreloadService } from './services/customPreload.service';

const routerOptions: ExtraOptions = {
    // scrollPositionRestoration: 'enabled',
    // anchorScrolling: 'enabled',
    // scrollOffset: [0,0],
    preloadingStrategy: customPreloadService
};

const routes: Routes = [
    { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
    {
        path: '',
        component: AuthComponent,
        children: [
            {
                path: 'auth',
                loadChildren: () =>
                    import(`./modules/auth/auth.module`).then(
                        (module) => module.AuthModule
                    )
            }
        ]
    },
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: 'dashboard',
                loadChildren: () =>
                    import(`./modules/dashboard/dashboard.module`).then(
                        (module) => module.DashboardModule
                    )
            },
            {
                path: 'users',
                data: { breadcrumb: 'Users' },
                loadChildren: () =>
                    import(`./modules/user/user.module`).then(
                        (module) => module.UserModule
                    )
            },
            {
                path: 'location',
                data: { breadcrumb: 'Location' },
                loadChildren: () =>
                    import(`./modules/location/location.module`).then(
                        (module) => module.LocationModule
                    )
            },
            {
                path: 'employee',
                data: { breadcrumb: 'Employee' },
                loadChildren: () =>
                    import(`./modules/employee/employee.module`).then(
                        (module) => module.EmployeeModule
                    )
            },
            {
                path: 'tableStation',
                data: { breadcrumb: 'Table Station' },
                loadChildren: () =>
                    import(`./modules/table-station/table-station.module`).then(
                        (module) => module.TableStationModule
                    )
            },
            {
                path: 'tenants',
                data: { breadcrumb: 'Tenants' },
                loadChildren: () =>
                    import(`./modules/tenant/tenant.module`).then(
                        (module) => module.TenantModule
                    )
            },
            {
                path: 'roles',
                data: { breadcrumb: 'Roles' },
                loadChildren: () =>
                    import(`./modules/role/role.module`).then(
                        (module) => module.RoleModule
                    )
            },
            {
                path: 'inventory',
                data: { breadcrumb: 'Inventory' },
                loadChildren: () =>
                    import(`./modules/inventory/inventory.module`).then(
                        (module) => module.InventoryModule
                    )
            },
            {
                path: 'permissions',
                data: { breadcrumb: 'Permissions' },
                loadChildren: () =>
                    import(`./modules/permission/permission.module`).then(
                        (module) => module.PermissionModule
                    )
            },
            {
                path: 'po-manager',
                data: { breadcrumb: 'Purchase Order Manager' },
                loadChildren: () =>
                    import(`./modules/po-manager/po-manager.module`).then(
                        (module) => module.PoManagerModule
                    )
            },
            {
                path: 'vendor',
                data: { breadcrumb: 'Vendor' },
                loadChildren: () =>
                    import(`./modules/vendor/vendor.module`).then(
                        (module) => module.VendorModule
                    )
            },
            {
                path: 'holidays',
                data: { breadcrumb: 'Holidays' },
                loadChildren: () =>
                    import(`./modules/holidays/holidays.module`).then(
                        (module) => module.HolidaysModule
                    )
            },
            {
                path: 'resource',
                data: { breadcrumb: 'Resource' },
                loadChildren: () =>
                    import(`./modules/resource/resource.module`).then(
                        (module) => module.ResourceModule
                    )
            },
            {
                path: 'profit-center',
                data: { breadcrumb: 'Profit Center' },
                loadChildren: () =>
                    import(`./modules/profit-center/profit-center.module`).then(
                        (module) => module.ProfitCenterModule
                    )
            },
            {
                path: 'department',
                data: { breadcrumb: 'Department' },
                loadChildren: () =>
                    import(`./modules/department/department.module`).then(
                        (module) => module.DepartmentModule
                    )
            },
            {
                path: 'forecasting',
                data: { breadcrumb: 'Forecasting' },
                loadChildren: () =>
                    import(`./modules/forecasting/forecasting.module`).then(
                        (module) => module.ForecastingModule
                    )
            },
            {
                path: 'reports',
                data: {},
                loadChildren: () =>
                    import(`./modules/reports-model/reports-model.module`).then(
                        (module) => module.ReportsModelModule
                    )
            },
            {
                path: 'lumber',
                data: { breadcrumb: 'Lumber' },
                loadChildren: () =>
                    import(`./modules/lumber-management/lumber-management.module`).then(
                        (module) => module.LumberManagementModule
                    )
            },
            {
                path: 'report',
                data: { breadcrumb: 'Report' },
                loadChildren: () =>
                    import(`./modules/reports-admin/reports-admin.module`).then(
                        (module) => module.ReportsAdminModule
                    )
            },
            {
                path: 'projects',
                data: { breadcrumb: 'Project', featureFlag: 'Create_Project' },
                canActivate: [FeatureFlagGuardService],
                loadChildren: () =>
                    import(`./modules/project/project.module`).then(
                        (module) => module.ProjectModule
                    )
            },
            {
                path: 'lumber-snapshot',
                data: { breadcrumb: 'LumberSnapShot' },

                loadChildren: () =>
                    import(`./modules/lumber-snapshot/lumber-snapshot.module`).then(
                        (module) => module.LumberSnapShotModule
                    )
            },

            {
                path: 'resource',
                data: { breadcrumb: 'Resource' },
                loadChildren: () =>
                    import(`./modules/resource/resource.module`).then(
                        (module) => module.ResourceModule
                    )
            },
            {
                path: 'customer',
                data: { breadcrumb: 'Customer' },
                loadChildren: () =>
                    import(`./modules/customer/customer.module`).then(
                        (module) => module.CustomerModule
                    )
            },
            {
                path: 'device-holidays',
                data: { breadcrumb: 'Out Of Office' },
                loadChildren: () =>
                    import(`./modules/device-holidays/device-holidays.module`).then(
                        (module) => module.DeviceHolidaysModule
                    )
            },
            {
                path: 'label-printers',
                data: { breadcrumb: 'Printers' },
                loadChildren: () =>
                    import(`./modules/label-printers/label-printers.module`).then(
                        (module) => module.LabelPrintersModule
                    )
            },
            {
                path: 'category',
                data: { breadcrumb: 'Category' },
                loadChildren: () =>
                    import(`./modules/category/category.module`).then(
                        (module) => module.CategoryModule
                    )
            },
            {
                path: 'employee-type',
                data: { breadcrumb: 'Employee Types' },
                loadChildren: () =>
                    import(`./modules/employee-type/employee-type.module`).then(
                        (module) => module.EmployeeTypeModule
                    )
            },
            {
                path: 'category',
                data: { breadcrumb: 'Category' },
                loadChildren: () =>
                    import(`./modules/category/category.module`).then(
                        (module) => module.CategoryModule
                    )
            },
            {
                path: 'special-lumber-rates',
                data: { breadcrumb: 'Special Lumber Rates' },
                loadChildren: () =>
                    import(
                        `./modules/special-lumber-rates/special-lumber-rates.module`
                    ).then((module) => module.SpecialLumberRatesModule)
            },
            {
                path: 'countysurtax',
                data: { breadcrumb: 'County Surtax' },
                loadChildren: () =>
                    import(`./modules/county-surtax/county-surtax.module`).then(
                        (module) => module.CountySurtaxModule
                    )
            },
            {
                path: 'inventorymanagement',
                data: { breadcrumb: 'Inventory Management' },
                loadChildren: () =>
                    import(
                        `./modules/inventory-management/inventory-management.module`
                    ).then((module) => module.InventoryManagementModule)
            },

            {
                path: 'contact',
                data: { breadcrumb: 'contact' },
                loadChildren: () =>
                    import(`./modules/contact/contact.module`).then(
                        (module) => module.ContactModule
                    )
            },
            {
                path: 'bid',
                data: { breadcrumb: 'Bid' },
                loadChildren: () =>
                    import(`./modules/bid/bid.module`).then((module) => module.BidModule)
            },
            {
                path: 'bid-lumber-price',
                data: { breadcrumb: 'Bid Lumber Price' },
                loadChildren: () =>
                    import(`./modules/bid-lumber-price/bid-lumber-price.module`).then(
                        (module) => module.BidLumberPriceModule
                    )
            },
            {
                path: 'lumber-size',
                data: { breadcrumb: 'Lumber Size' },
                loadChildren: () =>
                    import(`./modules/lumber-size/lumber-size.module`).then(
                        (module) => module.LumberSizeModule
                    )
            },
            {
                path: 'lumber-grade',
                data: { breadcrumb: 'Lumber Grade' },
                loadChildren: () =>
                    import(`./modules/lumber-grade/lumber-grade.module`).then(
                        (module) => module.LumberGradeModule
                    )
            },
            {
                path: 'lumber-cross',
                data: { breadcrumb: 'Lumber Cross' },
                loadChildren: () =>
                    import(`./modules/lumber-cross/lumber-cross.module`).then(
                        (module) => module.LumberCrossModule
                    )
            },
            {
                path: 'lbr-avail',
                data: { breadcrumb: 'Lumber Availabilities' },
                loadChildren: () =>
                    import(`./modules/lbr-avail/lbr-avail.module`).then(
                        (module) => module.LbrAvailModule
                    )
            },
            {
                path: 'inventory-part-type',
                data: { breadcrumb: 'Inventory Part Type' },
                loadChildren: () =>
                    import(`./modules/inventory-part-type/inventory-part-type.module`).then(
                        (module) => module.InventoryPartTypeModule
                    )
            },
            {
                path: 'work-order',
                data: { breadcrumb: 'Work Order', featureFlag: 'WorkOrder_Scheduling' },
                canActivate: [FeatureFlagGuardService],
                loadChildren: () =>
                    import(`./modules/work-order/work-order.module`).then(
                        (module) => module.WorkOrderModule
                    )
            },
            {
                path: 'time-sheet',
                data: { breadcrumb: 'Time Sheet', featureFlag: 'TimeSheet' },
                canActivate: [FeatureFlagGuardService],
                loadChildren: () =>
                    import(`./modules/time-sheet/time-sheet.module`).then(
                        (module) => module.TimeSheetModule
                    )
            },
            {
                path: 'job',
                data: { breadcrumb: 'Job' },
                canActivate: [FeatureFlagGuardService],
                loadChildren: () =>
                    import(`./modules/job/job.module`).then((module) => module.JobModule)
            },
            {
                path: 'shift',
                data: { breadcrumb: 'Shift' },
                canActivate: [FeatureFlagGuardService],
                loadChildren: () =>
                    import(`./modules/shift/shift.module`).then(
                        (module) => module.ShiftModule
                    )
            },
            {
                path: 'bid-configuration',
                data: { breadcrumb: 'BidConfiguration' },
                canActivate: [FeatureFlagGuardService],
                loadChildren: () =>
                    import(`./modules/bid-configuration/bid-configuration.module`).then(
                        (module) => module.BidConfigurationModule
                    )
            },
            {
                path: 'accounting-period',
                data: { breadcrumb: 'Accounting Period' },
                loadChildren: () =>
                    import(`./modules/accounting-period/accounting-period.module`).then(
                        (module) => module.AccountingPeriodModule
                    )
            },
            {
                path: 'lumber-inventory-code',
                data: { breadcrumb: 'Lumber Inventory' },
                loadChildren: () =>
                    import(
                        `./modules/lumber-inventory-code/lumber-inventory-code.module`
                    ).then((module) => module.LumberInventoryCodeModule)
            },
            {
                path: 'production-calendar',
                data: { breadcrumb: 'Production Calendar' },
                loadChildren: () =>
                    import(
                        `./modules/production-calendar/production-calendar.module`
                    ).then((module) => module.ProductionCalendarModule)
            },
            {
                path: 'shift-title',
                data: { breadcrumb: 'Shift Title' },
                loadChildren: () =>
                    import(`./modules/shift-title/shift-title.module`).then(
                        (module) => module.ShiftTitleModule
                    )
            },
            {
                path: 'schedule',
                data: { breadcrumb: 'Schedule' },
                loadChildren: () =>
                    import(`./modules/schedule/schedule.module`).then(
                        (module) => module.ScheduleModule
                    )
            },
            {
                path: 'batching-category',
                data: { breadcrumb: 'Batching Category' },
                loadChildren: () =>
                    import(`./modules/batching-category/batching-category.module`).then(
                        (module) => module.BatchingCategoryModule
                    )
            },
            {
                path: 'batching-family',
                data: { breadcrumb: 'Batching Family' },
                loadChildren: () =>
                    import(`./modules/batching-family/batching-family.module`).then(
                        (module) => module.BatchingFamilyModule
                    )
            },
            {
                path: 'sales-note-type',
                data: { breadcrumb: 'Sales Note Types' },
                loadChildren: () =>
                    import(`./modules/sales-note-type/sales-note-type.module`).then(
                        (module) => module.SalesNoteTypeModule
                    )
            },
            {
                path: 'finance',
                data: { breadcrumb: 'finance' },
                loadChildren: () =>
                    import(`./modules/shared/modules/finance/finance.module`).then(
                        (module) => module.FinanceModule
                    )
            },
            {
                path: 'notification',
                data: { breadcrumb: 'Notification' },
                loadChildren: () =>
                    import(`./modules/notification/notification.module`).then(
                        (module) => module.NotificationModule
                    )
            },
            {
                path: 'plate-picking-station',
                data: { breadcrumb: 'Home' },
                loadChildren: () =>
                    import(
                        `./modules/plate-picking-station/plate-picking-station.module`
                    ).then((module) => module.PlatePickingStationModule)
            },
            {
                path: 'release-note',
                data: { breadcrumb: 'Release Note' },
                loadChildren: () =>
                    import(`./modules/release-note/release-note.module`).then(
                        (module) => module.ReleaseNoteModule
                    )
            },
            {
                path: 'batching-wizard',
                data: { breadcrumb: 'Batching Wizard' },
                loadChildren: () =>
                    import(`./modules/batching-wizard/batching-wizard.module`).then(
                        (module) => module.BatchingWizardModule
                    )
            },
            {
                path: 'batching-panels-wizard',
                data: { breadcrumb: 'Batching Panel Wizard' },
                loadChildren: () =>
                    import(
                        `./modules/batching-panels-wizard/batching-panels-wizard.module`
                    ).then((module) => module.BatchingWizardModule)
            },
            {
                path: 'extracts',
                data: { breadcrumb: 'Extracts' },
                loadChildren: () =>
                    import(`./modules/extracts/extracts.module`).then(
                        (module) => module.ExtractsModule
                    )
            },
            {
                path: 'Preference',
                data: { breadcrumb: 'Preference' },
                loadChildren: () =>
                    import(`./modules/Preference/Preference.module`).then(
                        (module) => module.PreferenceModule
                    )
            },
            {
                path: 'hr',
                data: { breadcrumb: 'HR' },
                loadChildren: () =>
                    import(`./modules/hr/hr.module`).then((module) => module.HrModule)
            },
            {
                path: 'time-manager',
                data: { breadcrumb: 'Time Manager' },
                loadChildren: () =>
                    import(`./modules/time-management/time-management.module`).then(
                        (module) => module.TimeManagementModule
                    )
            },
            {
                path: 'lumber-receiving',
                data: { breadcrumb: 'Lumber Receiving' },
                loadChildren: () =>
                    import(`./modules/lumber-receiving/lumber-receiving.module`).then(
                        (module) => module.LumberReceivingModule
                    )
            },
            {
                path: 'device-time-manager',
                data: { breadcrumb: 'Device Log In/ Log Out' },
                loadChildren: () =>
                    import(
                        `./modules/device-time-Management/deviceTimeManagement.module`
                    ).then((module) => module.DeviceTimeManagementModule)
            },
            {
                path: 'saw-fetch-station',
                data: { breadcrumb: 'Saw Fetch Details' },
                loadChildren: () =>
                    import(`./modules/saw-fetch-station/saw-fetch-station.module`).then(
                        (module) => module.SawFetchStationModule
                    )
            },
            {
                path: 'ship-station',
                data: { breadcrumb: 'Shipping Details' },
                loadChildren: () =>
                    import(`./modules/ship-station/ship-station.module`).then(
                        (module) => module.ShipStationModule
                    )
            },
            {
                path: 'end-of-shift-manager',
                data: { breadcrumb: 'End Of Shift Manager' },
                loadChildren: () =>
                    import(
                        `./modules/end-of-shift-manager/end-of-shift-manager.module`
                    ).then((module) => module.EndOfShiftManagerModule)
            },
            {
                path: 'plate-receiving',
                data: { breadcrumb: 'Plate Receiving' },
                loadChildren: () =>
                    import(
                        `./modules/po-manager/components/plate-receiving/components/plate-receiving.component`
                    ).then((module) => module.PlateReceivingComponent)
            },
            {
                path: 'plate-management',
                data: { breadcrumb: 'Plate Management' },
                loadChildren: () =>
                    import(`./modules/plate-management/plate-management.module`).then(
                        (module) => module.PlateManagementModule
                    )
            },
            {
                path: 'state-basic-tax-rates',
                data: { breadcrumb: 'Sales Base Tax Rates' },
                loadChildren: () =>
                    import(
                        `./modules/state-basic-tax-rates/state-basic-tax-rates.module`
                    ).then((module) => module.StateBasicTaxRatesModule)
            },
            {
                path: 'excel-viewer',
                component: ExcelViewer
            },
            {
                path: 'back-plating',
                data: { breadcrumb: 'Back Plating' },
                loadChildren: () =>
                    import(`./modules/back-plating/back-plating.module`).then(
                        (module) => module.BackPlatingModule
                    )
            },
            {
                path: 'lumber-forecasting',
                data: { breadcrumb: 'Lumber Price Forecaster' },
                loadChildren: () =>
                    import(`./modules/lumber-forecasting/lumber-forecasting.module`).then(
                        (module) => module.LumberForecastingModule
                    )
            },
            {
                path: 'sw-dev-admin',
                data: { breadcrumb: 'Software Developer Admin' },
                loadChildren: () =>
                    import(`./modules/sw-dev-admin/sw-dev-admin.module`).then(
                        (module) => module.SwDevAdminModule
                    )
            },
            {
                path: 'windows-service-log',
                data: { breadcrumb: 'Windows Service Log' },
                loadChildren: () =>
                    import(
                        `./modules/windows-service-log/windows-service-log.module`
                    ).then((module) => module.WindowsServiceLogModule)
            },
            {
                path: 'design-re',
                data: { breadcrumb: 'Design RE' },
                loadChildren: () =>
                    import(
                        `./modules/design-re/design-re.module`
                    ).then((module) => module.DesignReModule)
            }
        ]
    },

    { path: '**', redirectTo: '/auth/login' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, routerOptions)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
