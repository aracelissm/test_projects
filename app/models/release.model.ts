export interface Release{  
  releaseNumber?: number,
  releaseCode: string,
  releaseDate: Date,
  internalNote?: string,
  showInProd: boolean,
  isDeleted: boolean,
  releaseDetails?:ReleaseDetails[]
}

export interface ReleaseDetails{
    releaseDetailID?: number,
    releaseNumber?: number,
    moduleID: number,
    moduleDescription: string,
    ticketNumber?: string,
    moduleName: string
}


export interface BindReleases{
  releaseCode: string,
  showInProd: boolean,
  releaseDate: Date,
  releaseDetails?:BindReleaseDetails[]
}

export interface BindReleaseDetails{
  
  moduleName: string
  moduleDescription: string[],

}

