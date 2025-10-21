import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { EmailVerificationComponent } from './components/email-verification/email-verification.component';
import { ErrorComponent } from './components/error/error/error-component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ResendVerificationComponent } from './components/resend-verification/resend-verification.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

const routes: Routes = [
    { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
    {
        path: '',
        component: AuthComponent,
        children: [
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'register',
                component: RegisterComponent
            },
            {
                path: 'forgot-password',
                component: ForgotPasswordComponent
            },
            {
                path: 'reset-password/:tempToken',
                component: ResetPasswordComponent
            },
            {
                path: 'email-verification/:tempToken',
                component: EmailVerificationComponent
            },
            {
                path: 'resend-verification',
                component: ResendVerificationComponent
            },
            {
                path: 'error',
                component: ErrorComponent
            }
        ]
    },
    { path: '**', redirectTo: '/auth/login' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {}
