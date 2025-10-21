export class ShopLog {
    private constructor() {}
    static EventType = class {
        static readonly Break = 'Break';
        static readonly Lunch = 'Lunch';
        static readonly Maintenance = 'Maintenance';
        private constructor() {}
    };
}

export class LocationTypes {
    static readonly TrussPlant = 1;
}
