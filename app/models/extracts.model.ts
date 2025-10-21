import { PureDate } from "./general.model";
import { Location } from "./location.model";

export interface CompletedToExport {
    date: Date;
    imIssue: string;
    genericItemNumber: string;
    uom: string;
    units: number;
    totalCost: number;
    unitCost: number;
    sageLotNumber: string;
    plantLoc: string;
}

export interface ShippedToExport {
    invoiceNo: string | null;
    invoiceDate: Date | null;
    buildDate: Date | null;
    arDivisionNo: string | null;
    customerNo: string | null;
    billToDivisionNo: string | null;
    billToCustomerNo: string | null;
    salesPersonCode: string | null;
    fob: string | null;
    shipVia: string | null;
    headerComment: string | null;
    salesTaxSchedule: string | null;
    shipToCode: string | null;
    shipToName: string | null;
    shipToAddress1: string | null;
    shipToAddress2: string | null;
    shipToAddress3: string | null;
    shipToCity: string | null;
    shipToState: string | null;
    shipToZipCode: string | null;
    shipDate: Date | null;
    customerPONo: string | null;
    soInvoiceHeaderWarehouseCode: string | null;
    itemCode: string | null;
    itemCodeDesc: string | null;
    discount: string | null;
    soInvoiceDetailWarehouseCode: string | null;
    unitOfMeasure: string | null;
    commentText: string | null;
    soInvoiceDetailQuantityOrdered: number | null;
    soInvoiceDetailQuantityShipped: number | null;
    unitPrice: string | null;
    extendedCost: number | null;
    unitCost: string | null;
    soInvoiceDetailUnitOfMeasureConvFactor: string | null;
    lotSerialNo: string | null;
    soInvoiceTierDistributionWarehouseCode: string | null;
    soInvoiceTierDistributionQuantityOrdered: number | null;
    soInvoiceTierDistributionQuantityShipped: number | null;
    tierUnitCost: string | null;
    unitOfMeasureConvFactor: string | null;
    project: string | null;
}

export interface CompletedExtractRequest {
    startDate: string | number | Date;
    endDate: string | number | Date;
    locations: string[];
    updateData?: boolean;
}

export interface ShippedExtractRequest {
    startDate: PureDate;
    endDate: PureDate;
    locations: string[];
    updateData?: boolean;
}

export interface PayrollRequest {
    startDate: string | number | Date;
    endDate: string | number | Date;
    location: Location[];
}

export interface PayrollExport {
    punch1Type: string;
    punch2Type: string;
    eeid: number;
    punch1Date: Date;
    punch1Time: Date;
    punch2Date: Date;
    punch2Time: Date;
}