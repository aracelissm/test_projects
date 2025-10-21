import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IEmailVerificationRequest } from 'src/app/models/auth-ev.model';
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
    selector: 'app-email-verification',
    templateUrl: './email-verification.component.html',
    styleUrls: ['./email-verification.component.scss']
})
export class EmailVerificationComponent implements OnInit {
    submitted = false;
    tempToken!: any;
    successMsg = false;
    backToLogin = false;

    constructor(
        private authService: AuthService,
        private route: ActivatedRoute,
        private toastr: ToastrService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.tempToken = this.route.snapshot.paramMap.get('tempToken');
        this.submitted = true;
        const tempToken = this.tempToken;
        const reqData: IEmailVerificationRequest = { tempToken };
      this.authService.emailVerification(reqData).subscribe((res) => {
        if (res && res.success) {
          if (res.data?.isPasswordSet == false) {
            this.successMsg = true;
            this.router.navigate(['/auth/reset-password/' + tempToken]);
          } else {
            this.backToLogin = true;
          }
          this.toastr.success(res.message || 'Email is verified');
        }
      });
    }
}
