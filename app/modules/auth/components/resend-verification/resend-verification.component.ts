import { Component, OnInit } from '@angular/core';
import {
    AbstractControl,
    UntypedFormBuilder,
    UntypedFormControl,
    UntypedFormGroup,
    Validators
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

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
    selector: 'app-resend-verification',
    templateUrl: './resend-verification.component.html',
    styleUrls: ['./resend-verification.component.scss']
})
export class ResendVerificationComponent implements OnInit {
    emailVerificationForm: UntypedFormGroup = new UntypedFormGroup({
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
        this.emailVerificationForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]]
        });
    }

    get lf(): { [key: string]: AbstractControl } {
        return this.emailVerificationForm.controls;
    }

    onSubmitEmailVerificationForm() {
        this.submitted = true;
        if (this.emailVerificationForm.invalid) {
            return;
        }
        const userInfo = this.emailVerificationForm.value;
        this.authService.requestEmailVerification(userInfo.email).subscribe((res) => {
                if (res && res.success) {
                    this.showMsg = true;
                    this.successmsg(
                        'Email verification link has been sent to your Email'
                    );
                }
            });
    }
}
