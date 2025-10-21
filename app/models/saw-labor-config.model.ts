import { Device, EShopDeviceTypes } from './device.model';
import { BaseEntity } from './general.model';

export interface SawLaborWorkOrderConfig extends BaseEntity {
    id: number;
    // woTitle: string | null;
    deviceId: number | null;
    woActivity: string | null;
    sawName: string;
    setAng: number;
    seatCutMM: number;
    cutLength1: number;
    cutTimeLTLength1: number;
    cutTimeGTLength1: number;
    woSetupTime: number;
    device: Device | null;
}

export interface CreateSawLaborWorkOrderConfigRequest {
    // woTitle: string | null;
    deviceId: number | null;
    woActivity: string | null;
    sawName: string;
    setAng: number;
    seatCutMM: number;
    cutLength1: number;
    cutTimeLTLength1: number;
    cutTimeGTLength1: number;
    woSetupTime: number;
}

export interface UpdateSawLaborWorkOrderConfigRequest {
    id: number;
    // woTitle: string | null;
    deviceId: number | null;
    woActivity: string | null;
    sawName: string;
    setAng: number;
    seatCutMM: number;
    cutLength1: number;
    cutTimeLTLength1: number;
    cutTimeGTLength1: number;
    woSetupTime: number;
}

export interface CreateUpdateSawLaborWorkOrderConfigDialogData {
    sawLaborWorkOrderConfigId: number;
}

export interface SawLaborWorkOrderPieceConfig extends BaseEntity {
    id: number;
    // woTitle: string | null;
    deviceId: number | null;
    sizeName: string | null;
    qty: number | null;
    setAng: number;
    cutTimeLTLength1: number;
    cutTimeGTLength1: number;
    device: Device | null;
}

export interface CreateSawLaborWorkOrderPieceConfigRequest {
    // woTitle: string | null;
    deviceId: number | null;
    sizeName: string | null;
    qty: number | null;
    setAng: number;
    cutTimeLTLength1: number;
    cutTimeGTLength1: number;
}

export interface UpdateSawLaborWorkOrderPieceConfigRequest {
    id: number;
    // woTitle: string | null;
    deviceId: number | null;
    sizeName: string | null;
    qty: number | null;
    setAng: number;
    cutTimeLTLength1: number;
    cutTimeGTLength1: number;
}

export interface CreateUpdateSawLaborWorkOrderPieceConfigDialogData {
    sawLaborWorkOrderPieceConfigId: number;
}

export interface SawLaborRule extends BaseEntity {
    id: number;
    name: string;
    description: string | null;
    deviceTypeId: number;
    sawLaborRuleConfigs: SawLaborRuleConfig[] | null;
    deviceType: EShopDeviceTypes | null;
}

export interface CreateSawLaborRuleRequest {
    name: string;
    description: string | null;
    deviceTypeId: number;
}

export interface UpdateSawLaborRuleRequest {
    id: number;
    name: string;
    description: string | null;
    deviceTypeId: number;
}

export interface SawLaborRuleConfig extends BaseEntity {
    id: number;
    sawLaborRuleId: number;
    calcREBasedOnDevice: boolean | null;
    calcREBasedOnWoActivity: boolean | null;
    calcREBasedOnPieceSizeAndQty: boolean | null;
    woActivity: string | null;
    sizeName: string | null;
    qty: number | null;
    sawName: string;
    setAng: number;
    seatCutMM: number;
    cutLength1: number;
    cutTimeLTLength1: number;
    cutTimeGTLength1: number;
    woSetupTime: number;
    sawLaborRule: SawLaborRule | null;
}

export interface CreateSawLaborRuleConfigRequest {
    sawLaborRuleId: number;
    calcREBasedOnDevice?: boolean | null;
    calcREBasedOnWoActivity?: boolean | null;
    calcREBasedOnPieceSizeAndQty?: boolean | null;
    woActivity: string | null;
    sizeName: string | null;
    qty: number | null;
    sawName: string;
    setAng: number;
    seatCutMM: number;
    cutLength1: number;
    cutTimeLTLength1: number;
    cutTimeGTLength1: number;
    woSetupTime: number;
}

export interface UpdateSawLaborRuleConfigRequest {
    id: number;
    sawLaborRuleId: number;
    calcREBasedOnDevice?: boolean | null;
    calcREBasedOnWoActivity?: boolean | null;
    calcREBasedOnPieceSizeAndQty?: boolean | null;
    woActivity: string | null;
    sizeName: string | null;
    qty: number | null;
    sawName: string;
    setAng: number;
    seatCutMM: number;
    cutLength1: number;
    cutTimeLTLength1: number;
    cutTimeGTLength1: number;
    woSetupTime: number;
}

export interface CreateUpdateSawLaborRuleConfigDialogData {
    sawLaborRuleConfigId: number;
}

export interface TableLaborRule extends BaseEntity {
    id: number;
    name: string;
    description: string | null;
    deviceTypeId: number;
    tableLaborRuleConfigs: TableLaborRuleConfig[] | null;
    deviceType: EShopDeviceTypes | null;
}

export interface CreateTableLaborRuleRequest {
    name: string;
    description: string | null;
    deviceTypeId: number;
}

export interface UpdateTableLaborRuleRequest {
    id: number;
    name: string;
    description: string | null;
    deviceTypeId: number;
}

export interface TableLaborRuleConfig extends BaseEntity {
    id: number;
    tableLaborRuleId: number;

    trussType: string | null;
    minNumChords: number | null;
    maxNumChords: number | null;
    minNumWebs: number | null;
    maxNumWebs: number | null;
    setupMinutesPerPiece: number | null;
    assemMinutesPerPiece: number | null;
    fabCrewSize: number | null;
    setCrewSize: number | null;
    prePress: number | null;
    setJig: number | null;
    setJigT: number | null;
    setJigB: number | null;

    tableLaborRule: TableLaborRule | null;
}

export interface CreateTableLaborRuleConfigRequest {
    tableLaborRuleId: number;

    trussType: string | null;
    minNumChords: number | null;
    maxNumChords: number | null;
    minNumWebs: number | null;
    maxNumWebs: number | null;
    setupMinutesPerPiece: number | null;
    assemMinutesPerPiece: number | null;
    fabCrewSize: number | null;
    setCrewSize: number | null;
    prePress: number | null;
    setJig: number | null;
    setJigT: number | null;
    setJigB: number | null;
}

export interface UpdateTableLaborRuleConfigRequest {
    id: number;
    tableLaborRuleId: number;

    trussType: string | null;
    minNumChords: number | null;
    maxNumChords: number | null;
    minNumWebs: number | null;
    maxNumWebs: number | null;
    setupMinutesPerPiece: number | null;
    assemMinutesPerPiece: number | null;
    fabCrewSize: number | null;
    setCrewSize: number | null;
    prePress: number | null;
    setJig: number | null;
    setJigT: number | null;
    setJigB: number | null;
}

export interface CreateUpdateTableLaborRuleConfigDialogData {
    tableLaborRuleConfigId: number;
}
