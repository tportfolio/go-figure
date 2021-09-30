export const initialStateForElectron = Object.freeze({
    saveSessionData: true,
    useMonochromeTheme: false
});

const initialState = { ...initialStateForElectron };

const LOAD_SETTINGS = "load-settings";
const TOGGLE_SAVE_SESSION_DATA = "toggle-save-session-data";
const TOGGLE_USE_DARKER_MODE = "toggle-use-monochrome-mode";

export const handleSettings = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SETTINGS:
            return action.payload.value;
        case TOGGLE_SAVE_SESSION_DATA:
            return {
                ...state,
                saveSessionData: !state.saveSessionData
            };
        case TOGGLE_USE_DARKER_MODE:
            return {
                ...state,
                useMonochromeTheme: !state.useMonochromeTheme
            };
        default:
            return state;
    }
}

export const loadSettings = settings => {
    return {
        type: LOAD_SETTINGS,
        payload: {
            value: settings
        }
    }
}

export const toggleSaveSessionData = () => {
    return {
        type: TOGGLE_SAVE_SESSION_DATA,
    }
}

export const toggleUseMonochromeTheme = () => {
    return {
        type: TOGGLE_USE_DARKER_MODE
    }
}

export default handleSettings;