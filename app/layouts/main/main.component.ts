import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/modules/shared/services/shared.service';
import { AuthService } from 'src/app/services/auth.service';

import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { RouterModule } from '@angular/router';
import { DevExtremeModule } from 'devextreme-angular';
import { ValidationStatus } from 'devextreme/common';
import {ColumnResizeMode} from 'devextreme/common/grids';
import { MaterialModule } from 'src/app/modules/shared/modules/material.module';

@Component({
    standalone: true,
    imports: [CommonModule, RouterModule,SharedModule,MaterialModule,DevExtremeModule],
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
    constructor(private authService: AuthService, private sharedService: SharedService) {
        this.authService.isUserLoggedIn$.subscribe((data) => {
                if (data) {
                    this.sharedService.loadPlantLocations();
                } else {
                    this.authService.logout();
                }
            
        });
    }

    ngOnInit(): void {}
}
