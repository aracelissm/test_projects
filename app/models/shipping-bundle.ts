export interface AssignShippingBundle {
    bundleData: ShippingBundleItem[];
    quantityData: ShippingBundleItem[];
}

export interface ShippingBundleItem {
    data: {bundle: string | null; jiQuant: number | null};
    key: number;
    type: string;
}