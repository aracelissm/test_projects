import moment from 'moment';import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver';
import { Null } from 'src/app/models/general.model';
import { ensure, forceTypeCast, isNullOrUndefined, isNumber, isString } from '../utils';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { AppInjector } from 'src/app/app.module';
import { AuthService } from 'src/app/services/auth.service';
import { Route, Routes } from '@angular/router';
import { FinanceRoutes } from '../constants/finance-routing';

const calcNoOfWeeksBetweenTwoDates = (startDate: Date, endDate: Date): number => {
    if (startDate.getTime() === endDate.getTime()) return 0;
    const timeDiff: number = Math.abs(
        startDate.getTime() > endDate.getTime()
            ? startDate.getTime() - endDate.getTime()
            : endDate.getTime() - startDate.getTime()
    );
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24) / 7);
};

const formatDateTime = (inputDate: string | Date | null, format = ''): string | null => {
    if (!inputDate) return null;
    const generatedDate = moment(inputDate);
    return generatedDate ? generatedDate.format(format) : null;
};

const getCurrentDateTime = (format = '') => {
    return moment().format(format);
};

const getCurrentYear = () => {
    return new Date().getFullYear();
};

const getMoment = () => {
    return moment();
};

const convertMinstoHoursAndMins = (mins: number, format?: string) => {
    mins = Math.round(mins);
    const isNegativeNum = mins.valueOf() < 0;
    if (isNegativeNum) mins = Math.abs(mins);
    const hours = Math.floor(mins / 60);
    const minutes = mins % 60;
    if (format === 'SHORT') {
        return `${isNegativeNum ? '-' : ''}${padNumToTwoDigits(
            hours
        )}:${padNumToTwoDigits(minutes)}`;
    }
    return `${isNegativeNum ? '-' : ''}${hours} Hours ${minutes} Minutes`;
};

const padNumToTwoDigits = (num: number) => {
    return num.toString().padStart(2, '0');
};

const convertStringToNumber = (value: string, nullable = false): Null<number> => {
    return isNumber(value) ? Number(value) : nullable ? null : 0;
};

const convertStringToBoolean = (str: string | null | undefined) => {
    if (!str) {
        return false;
    }
    return ['1', 'true', 'yes', 'on'].includes(str.toString().toLowerCase().trim());
};

const multiply = (...args: (number | null | undefined)[]): number => {
    const filteredArgs =
        forceTypeCast<number[]>(args.map((e) => (isNullOrUndefined(e) ? 0 : e))) || [];
    return filteredArgs.reduce(
        (acc, cur) => {
            return acc * (isNumber(cur) ? Number(cur) : 0);
        },
        filteredArgs.length ? 1 : 0
    );
};

const add = (...args: (number | null | undefined)[]): number => {
    return (forceTypeCast<number[]>(args.filter((e) => e)) || []).reduce((acc, cur) => {
        return (isNumber(acc) ? Number(acc) : 0) + (isNumber(cur) ? Number(cur) : 0);
    }, 0);
};

const defaultOfString = (val: string, nullable = false) => {
    return isString(val) ? String(val) : nullable ? null : '';
};

const roundUpNumber = (value?: number | null, decimals = 0, nullable = false) => {
    return value && isNumber(value)
        ? Math.ceil(value * Math.pow(10, decimals)) / Math.pow(10, decimals)
        : nullable
        ? null
        : 0;
};

const roundToNearestNumber = (value?: number | null, decimals = 0, nullable = false) => {
    return value && isNumber(value)
        ? Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals)
        : nullable
        ? null
        : 0;
};

const convertBlobToBase64 = (blob: Blob): Promise<string | ArrayBuffer | null> => {
    return new Promise((resolve, _) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
    });
};

const convertSvgToPng = (svgData: string): Promise<string> => {
    return new Promise((resolve) => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = 90;
        canvas.height = 100;
        const img = new Image();
        img.src = svgData;
        img.onload = function () {
            context?.clearRect(0, 0, 90, 100);
            context?.drawImage(img, 0, 0, 90, 100);
            const pngData = canvas.toDataURL('image/png');
            resolve(pngData);
        };
    });
};

const generateUniqueId = (length = 16) => {
    return parseInt(
        Math.ceil(Math.random() * Date.now())
            .toPrecision(length)
            .toString()
            .replace('.', '')
    );
};

const saveExcelFileToLocal = (
    workbook: Workbook,
    fileName: string,
    appendUniqueIdToFileName = true
) => {
    workbook.xlsx.writeBuffer().then((buffer: BlobPart) => {
        saveAs(
            new Blob([buffer], { type: 'application/octet-stream' }),
            `${fileName}${
                appendUniqueIdToFileName ? '_' + generateUniqueId(10) : ''
            }.xlsx`
        );
    });
};

const splitString = (str?: Null<string>, delimiter = ' ', limit = 0) => {
    return str ? str.split(delimiter, limit) : [];
};

const getElementFromArray = <T>(arr: T[], i = 0): Null<T> => {
    return arr[i] ? arr[i] : null;
};

const modifyObjectProperties = <S, K extends keyof S>(state: S, changes: Pick<S, K>): S =>
    Object.assign({}, state, changes);

const firstPermissionRoute = (routes: Routes): string => {
    const authService = AppInjector.get(AuthService);
    for (const route of routes) {
        if (
            route.data &&
            route.data['permissionCodes'] &&
            authService.hasPermission(route.data['permissionCodes'])
        ) {
            return ensure(route.path);
        }
    }
    return '';
};

export {
    calcNoOfWeeksBetweenTwoDates,
    formatDateTime,
    getCurrentDateTime,
    getCurrentYear,
    getMoment,
    convertMinstoHoursAndMins,
    convertStringToNumber,
    convertStringToBoolean,
    multiply,
    add,
    defaultOfString,
    roundUpNumber,
    roundToNearestNumber,
    convertBlobToBase64,
    convertSvgToPng,
    generateUniqueId,
    saveExcelFileToLocal,
    splitString,
    getElementFromArray,
    modifyObjectProperties,
    firstPermissionRoute
};
