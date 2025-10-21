import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {
    AbstractControl,
    UntypedFormBuilder,
    UntypedFormControl,
    UntypedFormGroup,
    Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IResetPasswordRequest } from 'src/app/models/auth-rp.model';
import { AuthService } from 'src/app/services/auth.service';
import { ConfirmedValidator } from './confirmed.validator';
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
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
    resetForm: UntypedFormGroup = new UntypedFormGroup({
        password: new UntypedFormControl(''),
        confirmPassword: new UntypedFormControl('')
    });
    submitted = false;
    showMsg = false;
    tempToken: any;
    passwords!:string
    show = false;
   
    constructor(
        private fb: UntypedFormBuilder,
        private router: Router,
        private authService: AuthService,
        private route: ActivatedRoute,
        private toastr: ToastrService
    ) {}

    ngOnInit(): void {
        this.initForm();
        this.passwords = 'password'; 
        this.tempToken = this.route.snapshot.paramMap.get('tempToken');
    }
    successmsg(msg: any) {
        this.toastr.success(msg);
    }

    passwordPattern(config: any) {
        return (control: UntypedFormControl) => {
            const urlRegEx: RegExp = config.pattern;
            if (control.value && !control.value.match(urlRegEx)) {
                return {
                    invalidMsg: config.msg
                };
            } else {
                return null;
            }
            return;
        };
    }

    initForm() {
        this.resetForm = this.fb.group(
            {
                password: [
                    '',
                    [
                        Validators.required,
                        this.passwordPattern({
                            pattern: /(.*[~`!@#$%^&*()_+\-=\[\]{};:\\|,.<>\/?])/,
                            msg: 'Password must contain atleast one Special character'
                        }),
                        this.passwordPattern({
                            pattern: /(.*[0-9])/,
                            msg: 'Password must contain atleast one Number'
                        }),
                        this.passwordPattern({
                            pattern: /(.*[a-z])/,
                            msg: 'Password must contain atleast one Lowercase letter'
                        }),
                        this.passwordPattern({
                            pattern: /(.*[A-Z])/,
                            msg: 'Password must contain atleast one Uppercase letter'
                        }),
                        this.passwordPattern({
                            pattern: /(^.{8,25}$)/,
                            msg: 'Password must contain Minimum 8 characters and Maximum 25 characters'
                        })
                    ]
                ],
                confirmPassword: ['', [Validators.required]]
            },
            { validators: ConfirmedValidator('password', 'confirmPassword') }
        );
    }

    get lf(): { [key: string]: AbstractControl } {
        return this.resetForm.controls;
    }

    onSubmitResetForm() {
        this.submitted = true;
        if (this.resetForm.invalid) {
            return;
        }
        const { password, confirmPassword } = this.resetForm.value;
        const tempToken = this.tempToken;
        const reqData: IResetPasswordRequest = { password, confirmPassword, tempToken };
        this.authService.resetPassword(reqData).subscribe((res) => {
                if (res && res.message) {
                    this.showMsg = true;
                    this.successmsg('Password is changed successfully you can now login');
                    this.router.navigate(['auth/login']);
                }
            });
    }
    onClick() {
        if (this.passwords === 'password') {
          this.passwords = 'text';
          this.show = true;
        } else {
          this.passwords = 'password';
          this.show = false;
        }
      }
    
}


