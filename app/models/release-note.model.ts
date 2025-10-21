export interface ReleaseNote {
    releaseNumber: number;
    releaseCode: string;
    releaseDescription: string;
    showInProd: boolean;
    releaseDate: Date | string | null;
}

export interface CreateRelease {
    releaseNumber: number;
    releaseCode: string;
    releaseDescription: string;
    showInProd: boolean;
    releaseDate: Date | string | null;
}

export interface UpdateRelease {
    releaseNumber: number;
    releaseCode: string;
    showInProd: boolean;
    releaseDate: Date | string | null;
}