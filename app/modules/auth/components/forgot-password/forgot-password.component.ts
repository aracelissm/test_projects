import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {
    AbstractControl,
    UntypedFormBuilder,
    UntypedFormControl,
    UntypedFormGroup,
    Validators
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

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
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
    forgotPasswordForm: UntypedFormGroup = new UntypedFormGroup({
        email: new UntypedFormControl('')
    });
    showMsg = false;
    submitted = false;
    constructor(
        private fb: UntypedFormBuilder,
        private authService: AuthService,
        private toastr: ToastrService
    ) {}

    ngOnInit(): void {
        this.initForm();
    }
    successmsg(msg: any) {
        this.toastr.success(msg);
    }

    initForm() {
        this.forgotPasswordForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]]
        });
    }

    get lf(): { [key: string]: AbstractControl } {
        return this.forgotPasswordForm.controls;
    }

    forgotPassword() {
        this.submitted = true;
        if (this.forgotPasswordForm.invalid) {
            return;
        }
        const userInfo = this.forgotPasswordForm.value;
        this.authService.sendForgotPasswordEmail(userInfo.email).subscribe((result) => {
                if (result && result.message) {
                    this.showMsg = true;
                    this.successmsg('Forgot Password link has been sent to your Email');
                }
            });
    }
}
