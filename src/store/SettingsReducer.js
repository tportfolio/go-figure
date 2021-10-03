// valid action types for settings reducer
const SettingsActionTypes = Object.freeze({
    LOAD_SETTINGS: "LOAD_SETTINGS",
    TOGGLE_SAVE_SESSION_DATA: "TOGGLE_SAVE_SESSION_DATA",
    TOGGLE_USE_MONOCHROME_THEME: "TOGGLE_USE_MONOCHROME_THEME"
});

// default values sent to Electron in case there is no settings file
export const initialStateForElectron = Object.freeze({
    saveSessionData: true,
    useMonochromeTheme: false
});

// state representation for app settings
const initialState = { ...initialStateForElectron };

/**
 * Update app settings based on incoming action.
 * @param {*} state - current state
 * @param {*} action - incoming action
 * @returns updated state
 */
export const handleSettings = (state = initialState, action) => {
    switch (action.type) {
        case SettingsActionTypes.LOAD_SETTINGS:
            return action.payload.value;
        case SettingsActionTypes.TOGGLE_SAVE_SESSION_DATA:
            return {
                ...state,
                saveSessionData: !state.saveSessionData
            };
        case SettingsActionTypes.TOGGLE_USE_MONOCHROME_THEME:
            return {
                ...state,
                useMonochromeTheme: !state.useMonochromeTheme
            };
        default:
            return state;
    }
}

/**
 * Load settings from disk.
 * @param {*} settings - app settings
 * @returns action object
 */
export const loadSettings = settings => {
    return {
        type: SettingsActionTypes.LOAD_SETTINGS,
        payload: {
            value: settings
        }
    }
}

/**
 * Toggle whether to save figure drawing session data.
 * @returns action object
 */
export const toggleSaveSessionData = () => {
    return {
        type: SettingsActionTypes.TOGGLE_SAVE_SESSION_DATA
    }
}

/**
 * Toggle whether to use monochrome theme for app.
 * @returns action object
 */
export const toggleUseMonochromeTheme = () => {
    return {
        type: SettingsActionTypes.TOGGLE_USE_MONOCHROME_THEME
    }
}

export default handleSettings;