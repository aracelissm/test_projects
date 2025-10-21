import { Injectable } from '@angular/core';
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from '../modules/shared/services/local-storage.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { isString } from '../common/utils';
import { WindowsServiceLogService } from '../services/windows-service-log.service';
import {
    CREATE_WINDOWS_SERVICE_LOG_CUSTOM_PROPS,
    OPEN_DIRECTORY_CUSTOM_PROPS
} from '../common/http-context-tokens';

@Injectable({
    providedIn: 'root'
})
export class HttpErrorInterceptor implements HttpInterceptor {
    private readonly errMsg =
        'Something went wrong. Please contact System Administrator.';
    constructor(
        private toast: ToastrService,
        private authService: AuthService,
        private windowsServiceLogService: WindowsServiceLogService
    ) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                const createWindowsServiceLogCustomProps = request.context.get(
                    CREATE_WINDOWS_SERVICE_LOG_CUSTOM_PROPS
                );
                const {
                    doNotShowErrorToast = Boolean(
                        createWindowsServiceLogCustomProps.doNotShowErrorToast
                    ) || false
                } = request.context.get(CREATE_WINDOWS_SERVICE_LOG_CUSTOM_PROPS);
                const openDirectoryCustomProps = request.context.get(
                    OPEN_DIRECTORY_CUSTOM_PROPS
                );
                const {
                    createWindowsServiceLogOnError = Boolean(
                        openDirectoryCustomProps.createWindowsServiceLogOnError
                    ) || false,
                    serviceName,
                    defaultErrMsg
                } = openDirectoryCustomProps;
                if (createWindowsServiceLogOnError) {
                    if (serviceName) {
                        this.windowsServiceLogService.createWindowsServiceLogWithErrorLogLevel(
                            error,
                            serviceName,
                            defaultErrMsg
                        );
                    }
                }
                if (
                    request.url.indexOf('GetMasterJobsByJobKey') > 1 ||
                    request.url.indexOf('GetTrussJobItems') > 1 ||
                    request.url.indexOf('GetPanelJobItems') > 1 ||
                    request.url.indexOf('GetPartialImportByJobKey') > 1 ||
                    request.url.indexOf('GetAdditionalCustomers') > 1 ||
                    request.url.indexOf('GetBidsByProject') > 1 ||
                    request.url.indexOf('GetProjectsByCustomer') > 1 ||
                    request.url.indexOf('GetBidsByCustomer') > 1 ||
                    request.url.indexOf('GetAllMasterJobNumbers') > 1 ||
                    request.url.indexOf('GetBidByBidNumber') > 1 ||
                    request.url.indexOf('RunReport') > 1 ||
                    request.url.indexOf('open-directory') > 1
                ) {
                    return throwError(error);
                } else if (error.status == 500) {
                    this.toast.error(this.errMsg, 'Error');
                } else if (error.status == 557) {
                    console.log(error);

                    if (error.error instanceof Blob) {
                        var b = error.error;
                        console.log(b);
                        var fr = new FileReader();
                        var jsonThing = fr.readAsText(b);
                        var jsonText = b.text() as Promise<any>;
                        console.log(jsonThing);
                        console.log(jsonText);
                        jsonText.then((t) => {
                            let h = JSON.parse(t);
                            console.log(h);
                            this.toast.error(h.message, 'Error');
                        });
                    } else if (
                        error.error?.message ||
                        error.error?.title ||
                        isString(error.error)
                    ) {
                        this.toast.error(
                            error.error?.message ||
                                error.error?.title ||
                                (isString(error.error) ? error.error : this.errMsg),
                            'Error'
                        );
                    } else {
                        this.toast.error(this.errMsg, 'Error');
                    }
                } else if (error.status == 401) {
                    this.authService.logout();
                } else if (
                    error.status != 404 &&
                    error.status != 401 &&
                    !doNotShowErrorToast
                ) {
                    this.toast.error(
                        error.error?.message ||
                            error.error?.title ||
                            (isString(error.error) ? error.error : this.errMsg),
                        'Error'
                    );
                }
                return throwError(error);
            })
        );
    }
}
