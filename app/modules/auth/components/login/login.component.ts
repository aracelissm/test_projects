import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {
    AbstractControl,
    UntypedFormBuilder,
    UntypedFormControl,
    UntypedFormGroup,
    Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import {
    ILoginRequest,
    ILoginUserToFileSyncServiceRequest
} from 'src/app/models/auth.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { FeatureFlagService } from 'src/app/modules/shared/services/featureflags.service';
import { FileSyncService } from 'src/app/services/file-sync.service';
import { IAuthFileSyncRequest } from 'src/app/models/file-sync.model';
import { LocalStorageService } from 'src/app/modules/shared/services/local-storage.service';
import { SharedService } from 'src/app/modules/shared/services/shared.service';

import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import {  RouterModule } from '@angular/router';

import { DevExtremeModule } from 'devextreme-angular';
import { ValidationStatus } from 'devextreme/common';
import {ColumnResizeMode} from 'devextreme/common/grids';
import { MaterialModule } from 'src/app/modules/shared/modules/material.module';

@Component({
    standalone: true,
    imports: [CommonModule, RouterModule,SharedModule,MaterialModule,DevExtremeModule],
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [FeatureFlagService]
})
export class LoginComponent implements OnInit {
    loginForm: UntypedFormGroup = new UntypedFormGroup({
        email: new UntypedFormControl(''),
        password: new UntypedFormControl('')
    });
    submitted = false;
    password!: string;
    show = false;

    constructor(
        private fb: UntypedFormBuilder,
        private router: Router,
        private authService: AuthService,
        private toastr: ToastrService,
        private userservice: UserService,
        private featureFlagService: FeatureFlagService,
        private localStorageService: LocalStorageService,
        private fileSyncService: FileSyncService,
        private sharedService: SharedService
    ) {}

    ngOnInit(): void {
        this.initForm();
        this.password = 'password';
    }
    successmsg(msg: any) {
        this.toastr.success(msg);
    }

    initForm() {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]]
        });
    }

    get lf(): { [key: string]: AbstractControl } {
        return this.loginForm.controls;
    }

    onSubmitLoginForm() {                
        this.submitted = true;
        if (this.loginForm.invalid) {
            return;
        }
        const { email, password } = this.loginForm.value;
        const reqData: ILoginRequest = { email, password };
        this.localStorageService.setItem('isFromLoginPage','1');                
        this.authService.login(reqData).subscribe((res) => {             
            this.featureFlagService.getFeatureFlags();                    
            this.successmsg('Login successful');
        });        
    }
    onClick() {
        if (this.password === 'password') {
            this.password = 'text';
            this.show = true;
        } else {
            this.password = 'password';
            this.show = false;
        }
    }

    loginUserToFileSyncService() {
        const reqData: ILoginUserToFileSyncServiceRequest = {
            email: 'dwp.damodharan@a1truss.com',
            password: 'A1Truss@123'
        };
        this.authService.loginUserToFileSyncService(reqData).subscribe({
            next: (res) => {
                console.log(res);
                if (res && res.success && res.data) {
                    this.successmsg('Login User To FileSync Service Success');
                    this.authFileSync(res.data.authToken);
                }
            },
            error: (err) => {
                console.error(err);
                this.toastr.error(
                    typeof err === 'object' && err.error?.message
                        ? err.error.message
                        : JSON.stringify(err),
                    'Error'
                );
                this.sharedService.handle404NotFoundError(err);
            }
        });
    }

    private authFileSync(authToken: string) {
        // const authToken = this.localStorageService.getItem<string>('authToken');
        // if (authToken) {
        const reqData: IAuthFileSyncRequest = { authToken };
        this.fileSyncService.authFileSync(reqData).subscribe({
            next: (res) => {
                console.log(res);
                if (res && res.success) {
                }
            },
            error: (err) => {
                console.error(err);
                this.toastr.error(
                    typeof err === 'object' && err.error?.message
                        ? err.error.message
                        : JSON.stringify(err),
                    'Error'
                );
            }
        });
        // }
    }
}
