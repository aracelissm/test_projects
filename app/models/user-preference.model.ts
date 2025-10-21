
export interface paramUserPreference {
    userId?: number;
    preferenceId?: number;
}

export interface Preferences {
    preferenceID: number;
    preferenceName: string;
    preferenceSubTypes: PreferenceSubTypes[];
    selectedPreference: SelectedPreference;
}

export interface PreferenceSubTypes {
    pageName: string,
    preferenceSubTypeId: number
}

export interface SelectedPreference {
    pageName: string;
    preferenceSubTypeId: number;
    preferenceId?: number;
}

export interface UserPreference {
    id?: number,
    parentId?: number,
    landingPageId?: number;
    userID?: number,
    link?: string
}

export class CurrentTheme {
    static SelectedThemeText = '';
}

export interface ThemePreference {
    id: number,
    themeName?: string,
    themeClass: string,
    img?: string,
    selectedThemeID?: number,
    selectedThemeText?: string    
}

export interface PreferredTheme {
    id: number,
    themeId?: number,
    userId?: number
}

export interface Fontpreference {
    id: number;
    FontName?: string;
    FontClass: string;
    selectedFontID?: number;
    selectedFontText?: string;
}

export interface ApplandingPage {
    id?: number;
    menuId?: number;
    landingMenuId?: number;
    link?: string;
    userId?: number;
}