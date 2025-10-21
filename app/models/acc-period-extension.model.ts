import { AccountingPeriod } from './accounting-period.model';
import { BaseEntity } from './general.model';
import { Location } from './location.model';

export interface AccPeriodExtension extends BaseEntity {
    id: number;
    locationId: number;
    accPeriodRecId: number;
    breakEvenRoofBdFt: number;
    breakEvenFloorBdFt: number;
    breakEvenPanelBdFt: number;
    budgetRoofBdFt: number;
    budgetFloorBdFt: number;
    budgetPanelBdFt: number;
    salesRoofBdFt: number;
    salesFloorBdFt: number;
    salesPanelBdFt: number;
    location: Location | null;
    accountingPeriod: AccountingPeriod | null;
}

export interface SaveAccPeriodExtensionRequest {
    locationId: number;
    accPeriodRecId: number;
    breakEvenRoofBdFt: number;
    breakEvenFloorBdFt: number;
    breakEvenPanelBdFt: number;
    budgetRoofBdFt: number;
    budgetFloorBdFt: number;
    budgetPanelBdFt: number;
    salesRoofBdFt: number;
    salesFloorBdFt: number;
    salesPanelBdFt: number;
}
