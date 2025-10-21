import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';

import { AuthComponent } from './auth.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { EmailVerificationComponent } from './components/email-verification/email-verification.component';
import { ResendVerificationComponent } from './components/resend-verification/resend-verification.component';
import { ErrorComponent } from './components/error/error/error-component';

@NgModule({
    declarations: [

    ],
    imports: [CommonModule, AuthRoutingModule, SharedModule,        
        AuthComponent,
        LoginComponent,
        RegisterComponent,
        ForgotPasswordComponent,
        ResetPasswordComponent,
        EmailVerificationComponent,
        ResendVerificationComponent,
        ErrorComponent]
})
export class AuthModule {}
