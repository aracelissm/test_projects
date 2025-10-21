import { DeviceTypes } from 'src/app/common/constants/device';
import { Device } from '../device.model';
import { WorkOrder } from '../work-order.model';

export class ScheduledDevice {
    constructor(public device: Device) {}

    get parameters(): string | null {
        return this.device.parameters?.trim() ?? null;
    }

    private get type(): number {
        return this.device.esqDeviceType ?? -1; // Use -1 for unknown
    }

    isAlpineAutoSaw(): boolean {
        return [
            DeviceTypes.ES_AUTOMILL_SAW,
            DeviceTypes.ES_AUTOWEB_SAW,
            DeviceTypes.ES_ALS_SAW,
            DeviceTypes.ES_SPEEDCUT_EX_SAW,
            DeviceTypes.ES_MANGO_SAW
        ].includes(this.type);
    }

    isBladeSaw(): boolean {
        return this.type === DeviceTypes.ES_BLADE_SAW;
    }

    isHundeggerSaw(): boolean {
        return this.type === DeviceTypes.ES_HUNDEGGER_SAW;
    }

    isEasyFrameSaw(): boolean {
        return this.type === DeviceTypes.ES_EASYFRAME_SAW;
    }

    isFetchLumber(): boolean {
        return this.type === DeviceTypes.ES_FETCH_LUMBER;
    }

    isAutoSet(): boolean {
        return [DeviceTypes.ES_AUTOSET_TABLE, DeviceTypes.ES_AUTOSETII_TABLE].includes(
            this.type
        );
    }

    getSawInputFileName(workOrder: WorkOrder): string | null {
        if (
            [
                DeviceTypes.ES_AUTOMILL_SAW,
                DeviceTypes.ES_AUTOWEB_SAW,
                DeviceTypes.ES_ALS_SAW,
                DeviceTypes.ES_SPEEDCUT_EX_SAW
            ].includes(this.type)
        ) {
            return this.outputFileAsJob()
                ? `${workOrder.esdJobkey?.trim()}.trs`
                : 'active.trs';
        } else if (this.type === DeviceTypes.ES_HUNDEGGER_SAW) {
            return 'active.bvn';
        } else if (this.type === DeviceTypes.ES_EASYFRAME_SAW) {
            return 'active.ezx';
        }
        return null;
    }

    private allDeviceParameters(): string[] {
        if (!this.parameters) return [];
        return this.parameters.split(' ').filter((p) => p.trim().length > 0);
    }

    private findParameter(parameter: string): boolean {
        return this.allDeviceParameters().some((p) => p === parameter);
    }

    outputFileAsJob(): boolean {
        return this.findParameter('filenameasjobkey');
    }
}
