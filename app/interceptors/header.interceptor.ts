import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../modules/shared/services/local-storage.service';
import { isString } from '../common/utils';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
    // private readonly errMsg = 'Something went wrong. Please contact System Administrator.';
    constructor(
        private authService: AuthService,
        private localStorageService: LocalStorageService
    ) {}

    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        if (request.url.startsWith(environment.apiBaseUrl)) {
            let authRequest = request.clone({
                setHeaders: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                }
            });
            const authToken = this.localStorageService.getItem<string>('authToken');
            if (authToken !== null) {
                authRequest = request.clone({
                    setHeaders: { Authorization: `Bearer ${authToken}` }
                });
            }
            return next.handle(authRequest).pipe(
                catchError((error) => {
                    if (error instanceof HttpErrorResponse && error.status === 401) {
                        this.authService.logout();
                    }
                    // console.log(error.error?.message || `${error.error?.title} for ${error.url}` || (isString(error.error) ? `${error.error} for ${error.url}` : this.errMsg));
                    // console.log(error.error?.message || error.error?.title || (isString(error.error) ? error.error : this.errMsg));
                    return throwError(() => error);
                })
            );
        }
        return next.handle(request);
    }
}
