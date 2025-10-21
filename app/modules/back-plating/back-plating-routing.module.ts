import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackPlatingComponent } from './back-plating.component';

const routes: Routes = [
    {
        path: '',
        component: BackPlatingComponent,
        
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BackPlatingRoutingModule {}

