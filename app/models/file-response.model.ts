export interface FileResponse {
    fileContents: string; // Base64 Encoded String
    contentType: string;
    fileDownloadName: string | null;
}

export interface ImageViewer {
    currentIndex: number;
    totalImages: number;
    imageList: string[];
    imageFilename: string | null;
    imageBlob: string | null;
    contentType: string | null;
    imageUrl: string;
}
