// Refer ScheduledDevice.h file in Viper 1.0.
// Eshop device types
export class DeviceTypes {
    private constructor() {}
    static readonly ES_DISPATCHER = 0;
    static readonly ES_CLARY_SAW = 1;
    static readonly ES_DEPAUW_SAW = 2;
    static readonly ES_AUTOWEB_SAW = 3;
    static readonly ES_AUTOMILL_SAW = 4;
    static readonly ES_TIMBERMILL_SAW = 5;
    static readonly ES_OTHER_SAW = 6;
    static readonly ES_SPEEDCUT_SAW = 7;
    static readonly ES_AUTOSET_TABLE = 8;
    static readonly ES_AUTOSETII_TABLE = 9;
    static readonly ES_CART = 10;
    static readonly ES_DESIGNER = 11;
    static readonly ES_AUTO_OMNI_SAW = 12;
    static readonly ES_OTHER_TRUCK = 13;
    static readonly ES_OMNI_JETSET_TABLE = 14;
    static readonly ES_AUTO8_TABLE = 15;
    static readonly ES_SPIDA_RADIAL_SAW = 16;
    static readonly ES_OTHER_TABLE = 17;
    static readonly ES_RESERVATIONS = 18;
    static readonly ES_SPEEDROLL_TABLE = 19;
    static readonly ES_LOGIN_QUEUE = 20;
    static readonly ES_NOSETUP_TABLE = 21;
    static readonly ES_FETCH_LUMBER = 22;
    static readonly ES_FETCH_PLATE = 23;
    static readonly ES_ALS_SAW = 24;
    static readonly ES_SPEEDCUT_EX_SAW = 25;
    static readonly ES_MANGO_SAW = 26;
    static readonly ES_TCT_SAW = 27;
    static readonly ES_STEEL_ROLLFORMER = 28;
    static readonly ES_MITEK_PLANX = 29;
    static readonly ES_BLADE_SAW = 30;
    static readonly ES_MITEK_ROOFTRACKER = 31;
    static readonly ES_MONET_SHORTCUTTER = 32;
    static readonly ES_HUNDEGGER_SAW = 33;
    static readonly ES_SPEEDSET_JACK_TABLE = 34;
    static readonly ES_EASYFRAME_SAW = 35;
}

export class SawStationActions {
    private constructor() {}
    static readonly DONE_SETUP = 'DONE_SETUP';
    static readonly DONE_CUTTING = 'DONE_CUTTING';
    static readonly PARTIAL_CUTTING = 'PARTIAL_CUTTING';
    static readonly MARK_ALL_PIECES_DONE_CUTTING = 'MARK_ALL_PIECES_DONE_CUTTING';
}
