import { HttpContextToken } from '@angular/common/http';
import {
    CreateWindowsServiceLogCustomProps,
    OpenDirectoryCustomProps
} from 'src/app/models/http-context-token.model';

export const OPEN_DIRECTORY_CUSTOM_PROPS = new HttpContextToken<OpenDirectoryCustomProps>(
    () => ({
        createWindowsServiceLogOnError: null,
        serviceName: null,
        defaultErrMsg: null
    })
);

export const CREATE_WINDOWS_SERVICE_LOG_CUSTOM_PROPS =
    new HttpContextToken<CreateWindowsServiceLogCustomProps>(() => ({
        doNotShowErrorToast: null
    }));
