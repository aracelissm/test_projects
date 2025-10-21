import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PreferenceService } from 'src/app/services/preference.service';
import { LocalStorageService } from 'src/app/modules/shared/services/local-storage.service';

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
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
    constructor(private authService: AuthService, 
        private router: Router,
        private preferenceService: PreferenceService,
        private localStorageService: LocalStorageService,
        ) 
        {
        this.authService.isUserLoggedIn$.subscribe( (data) => {
                if (data) {                      
                    if(this.localStorageService.getItem('isFromLoginPage') === '1'){
                        this.localStorageService.removeItem('isFromLoginPage');
                        this.preferenceService.GetLandingPage().subscribe( (res) => {
                        if(res.data)
                            this.router.navigate([''+ res.data +'']);
                        else
                            this.router.navigate(['/dashboard']);
                    });
                    }
                    else{
                        this.router.navigate(['/dashboard']);
                    }                                            
                }
        });
        }

    ngOnInit(): void {
        this.authService.getLoggedInUser();
    }
}
