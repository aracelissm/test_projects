import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import {  RouterModule } from '@angular/router';

import { DevExtremeModule } from 'devextreme-angular';
import { ValidationStatus } from 'devextreme/common';
import {ColumnResizeMode} from 'devextreme/common/grids';
import { MaterialModule } from 'src/app/modules/shared/modules/material.module';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    sidTopDisabled: boolean = false;
    sidnavstatus: boolean = false;
    routers: any;
    constructor(private route: ActivatedRoute, private router: Router) {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                if (
                    event.urlAfterRedirects.includes('auth') ||
                    event.url.includes('auth') || event.url.includes('excel-viewer')
                ) {
                    this.sidTopDisabled = false;
                } else {
                    this.sidTopDisabled = true;
                }
            }
        });
    }
}
