import { DocumentFile } from './documentFile.model';

export interface CreateSalesNote {
    custId: number;
    createdByUserId: number;
    noteTypeId: number;
    salesNotes: string;
    documentId: number;
}

export interface UpdateSalesNote {
    recId: number;
    custId: number;
    createdByUserId: number;
    dateAdded: Date;
    noteTypeId: number;
    salesNotes: string;
    documentId: number;
}

export interface SalesNote {
    recId: number | undefined;
    custId: number;
    createdByUserId: number;
    dateAdded: Date;
    noteTypeId: number;
    salesNotes: string;
    documentId: number;
}

export interface GetAllSalesNotes {
    recId: number;
    custId: number;
    createdByUserId: number;
    noteTypeId: number;
    salesNotes: string;
    documentId: number;
}

export interface SalesNotewithDocumentName {
    recId: number;
    custId: number;
    createdByUserId: number;
    userFirstName: string;
    userLastName: string;
    userFullName: string;
    noteTypeId: number;
    noteTypeName: string;
    salesNotes: string;
    dateAdded: Date;
    documentId: number;
    documentName: string;
    description: string;
}
export interface SalesNoteAndDocument {
    salesNote: SalesNote;
    documentFile: DocumentFile | undefined;
}
export interface DefaultSalesNote {
    id: number;
    defaultBid: string;
}
export interface GetCustomerForKey {
    reC_ID: number;
    cusT_NAME: string;
    cusT_KEY: string;
}

export interface DefaultSalesNote {
    id: number;
    defaults: string;
}
export interface GetCustomerForKey {
    reC_ID: number;
    cusT_NAME: string;
    cusT_KEY: string;
}
