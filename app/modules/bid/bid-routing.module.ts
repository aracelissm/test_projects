import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AddWorkorderComponent } from '../work-order/components/add-workorder/add-workorder.component';
import { EditProdWorkorderComponent } from '../work-order/components/edit-prod-workorder/edit-prod-workorder.component';
import { MainEditWorkorderComponent } from '../work-order/components/main-edit-workorder/main-edit-workorder.component';
import { BidComponent } from './bid.component';
import { AddBidComponent } from './components/add-bid/add-bid.component';
import { BidEditComponent } from './components/bid-edit/bid-edit.component';
import { CreateBidComponent } from './components/create-bid/create-bid.component';
import { EditBidComponent } from './components/edit-bid/edit-bid.component';
import { ListBidsComponent } from './components/list-bids/list-bids.component';
import { MainEditBidComponent } from './components/main-edit-bid/main-edit-bid.component';
import { RepriceBidComponent } from './components/reprice-bid/reprice-bid.component';
const routerOptions: ExtraOptions = {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    scrollOffset: [0, 64]
};

const routes: Routes = [
    {
        path: '',
        component: BidComponent,
        children: [
            { path: '', redirectTo: '/bid/list-bids', pathMatch: 'full' },
            {
                path: 'list-bids',
                component: ListBidsComponent,
                data: { breadcrumb: 'Bid List' }
            },
            {
                path: 'create-bid',
                component: AddBidComponent,
                data: { breadcrumb: 'Create Bid' }
            },
            {
                path: 'add-bid',
                component: CreateBidComponent,
                data: { breadcrumb: 'Create Bid' }
            },
            {
                path: 'edit-bid/:rec_Id',
                component: MainEditBidComponent,
                data: { preload: true, breadcrumb: 'Edit Bid' }
            },
            {
                path: 'add-work-order',
                component: AddWorkorderComponent,
                data: { breadcrumb: 'Add Workorder' }
            },
            {
                path: 'edit-work-order/:woid',
                component: MainEditWorkorderComponent,
                data: { breadcrumb: 'Edit Workorder' }
            },
            // {
            //     path: 'bid-edit/:rec_Id',
            //     component: BidEditComponent,
            //     data: { breadcrumb: 'Edit Bid' }
            // },
            {
                path: 'reprice-bid/:rec_Id',
                component: RepriceBidComponent,
                data: { breadcrumb: 'Reprice Bid' }
            },
            // {
            //     path: 'bid-configuration',
            //     component: BidConfigurationComponent,
            //     data: { breadcrumb: 'Bid Configuration' }
            // },
            { path: '**', redirectTo: '/bid/list-bids' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BidRoutingModule {}
