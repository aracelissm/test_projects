export interface LabelType  {
    id: number;
    labelCode: string;
    labelName: string;
    labelDescription: string;
    isActive: boolean;
    isDeleted: boolean;
    comments: string;
    createdDate: Date;
    modifiedDate: Date;
}