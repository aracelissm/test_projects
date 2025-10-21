import { PCInfo } from 'src/app/models/PCInfo.model';
import { WorkOrder } from 'src/app/models/work-order.model';

const forceTypeCast = <T>(input: any): T => {
    return input as T;
};

const isNull = <T>(value: T): boolean => {
    return value === null;
};

const isUndefined = <T>(value: T): boolean => {
    return value === undefined;
};

const isNullOrUndefined = <T>(value: T): boolean => {
    return value === null || value === undefined;
};

const isNullOrUndefinedOrEmpty = <T>(value: T): boolean => {
    return isNullOrUndefined(value) || forceTypeCast<string>(value) === '';
};

const isStringArray = (value: any): boolean => {
    return Array.isArray(value) && value.every((value) => typeof value === 'string');
};

const isString = (value: any): boolean => {
    return typeof value === 'string';
};

const isNumber = (value: any): boolean => {
    return (
        (typeof value === 'number' && !isNaN(value)) ||
        (typeof value === 'string' && value.trim() != '' && !isNaN(Number(value)))
    );
};

const isEmptyObj = (obj: Record<string, any>): boolean => {
    return Object.keys(obj).length === 0;
};

const getFormattedWorkOrderIdentifier = (
    workOrder: WorkOrder,
    delimiter: string = ''
): string => {
    return [workOrder.esdJobkey.trim(), (workOrder.esdMark ?? '').trim()].join(delimiter);
};

const getFormattedPieceIdentifier = (piece: PCInfo, delimiter: string = ','): string => {
    return [
        (piece.piJobkey ?? '').trim(),
        (piece.piLabel ?? '').trim(),
        (piece.piTag ?? '').trim()
    ].join(delimiter);
};

const ensure = <T>(
    argument: T | undefined | null,
    message = 'This value was promised to be there.'
): T => {
    if (argument === undefined || argument === null) {
        throw new TypeError(message);
    }

    return argument;
};

const convertBase64ToBlobData = (
    base64Data: string,
    contentType: string,
    sliceSize = 512
): Blob => {
    const byteCharacters = atob(base64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, { type: contentType });
};

const range = (start: number, end: number): number[] => {
    let result: number[] = [];
    for (var i = start; i <= end; i++) {
        result.push(i);
    }
    return result;
};

export {
    forceTypeCast,
    isNull,
    isUndefined,
    isNullOrUndefined,
    isNullOrUndefinedOrEmpty,
    isStringArray,
    isString,
    isNumber,
    isEmptyObj,
    getFormattedWorkOrderIdentifier,
    getFormattedPieceIdentifier,
    ensure,
    convertBase64ToBlobData,
    range
};
