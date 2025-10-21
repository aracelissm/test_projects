export interface DocumentFile {
    recId: number;
    custId: number;
    uploadedUserId: number;
    dateAdded: Date;
    isDeleted: boolean;
    filePath: string;
    fileName: string;
    fileExt: string;
    fileSize: number;
    description: string;
}
