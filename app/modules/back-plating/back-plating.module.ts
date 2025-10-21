import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackPlatingComponent } from './back-plating.component';
import { ListWorkOrdersComponent } from './Components/list-work-orders/list-work-orders.component';
import { DevExtremeModule} from 'devextreme-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AppDirectivesModule } from '../shared/modules/app-directives.module';
import { BackPlatingRoutingModule } from './back-plating-routing.module';
import { ActiveWorkOrderComponent } from './Components/active-work-order/active-work-order.component';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    DevExtremeModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AppDirectivesModule,
    CommonModule,
    BackPlatingRoutingModule,
    BackPlatingComponent, 
    ListWorkOrdersComponent, 
    ActiveWorkOrderComponent
  ]
})
export class BackPlatingModule { }
