export interface PlanJson {
    trusses: Plan_Truss[];
}

export interface Plan_Truss {
    name: string;
    fileName: string;
    transform: Plan_Transform;
    platedBoards: Plan_Platedboard[];
    manualBoards: Plan_Manualboard[];
    manualPlates: Plan_Manualplate[];
}

export interface Plan_Transform {
    mirror: Plan_Mirror;
    rotation: number;
    sequence: any[];
    manualBoards: any[];
    manualPlates: any[];
    priorRemnant: boolean;
}

export interface Plan_Mirror {
    horizontal: boolean;
    vertical: boolean;
}

export interface Plan_Platedboard {
    name: string;
    infeedVertices: Plan_Infeedvertice[];
    attachedPlates: Plan_Attachedplate[];
}

export interface Plan_Infeedvertice {
    x: number;
    y: number;
}

export interface Plan_Attachedplate {
    label: string;
    gauge: string;
    description: string;
}

export interface Plan_Manualboard {
    label: string;
}

export interface Plan_Manualplate {
    label: string;
    gauge: string;
    description: string;
}