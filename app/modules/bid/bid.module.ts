import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DevExtremeModule } from 'devextreme-angular';
import { ValidationStatus } from 'devextreme/common';
import {ColumnResizeMode} from 'devextreme/common/grids';
import { SharedModule } from '../shared/shared.module';
import { AppDirectivesModule } from '../shared/modules/app-directives.module';
import { BidRoutingModule } from './bid-routing.module';
import { ListBidsComponent } from './components/list-bids/list-bids.component';
import { BidComponent } from './bid.component';
import { CreateBidComponent } from './components/create-bid/create-bid.component';
import { EditBidComponent } from './components/edit-bid/edit-bid.component';
import { RepriceBidComponent } from './components/reprice-bid/reprice-bid.component';
import { BidJobsListComponent } from './components/bid-jobs-list/bid-jobs-list.component';
import { BidWorkOrderListComponent } from './components/bid-work-order-list/bid-work-order-list.component';
import { BidHistoryComponent } from './components/bid-history/bid-history.component';
import { AddBidComponent } from './components/add-bid/add-bid.component';
import { BidEditComponent } from './components/bid-edit/bid-edit.component';
import { DxTextAreaModule } from 'devextreme-angular';
import { MainEditBidComponent } from './components/main-edit-bid/main-edit-bid.component';
import { BidTopHeaderComponent } from './components/bid-top-header/bid-top-header.component';
import { BidAuditTrailComponent } from './components/bid-audit-trail/bid-audit-trail.component';
import { BidIconsComponent } from './components/bid-icons/bid-icons.component';

@NgModule({
    declarations: [
        
       
    ],
    imports: [
        CommonModule,
        BidRoutingModule,
        DevExtremeModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        AppDirectivesModule,
        DxTextAreaModule,
        BidComponent,
        BidIconsComponent,
        ListBidsComponent,
        CreateBidComponent,
        EditBidComponent,
        RepriceBidComponent,
        AddBidComponent,
        BidJobsListComponent,
        BidWorkOrderListComponent,
        BidHistoryComponent,
        BidEditComponent,
        MainEditBidComponent,
        BidTopHeaderComponent,
        BidAuditTrailComponent
    ]
})
export class BidModule {}
