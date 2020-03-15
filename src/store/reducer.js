import { combineReducers } from 'redux';
import imageCacheReducer from "./ImageCacheReducer";
import settingsReducer from "./SettingsReducer";
import canvasSettingsReducer from "./CanvasSettingsReducer";


const rootReducer = combineReducers({
    imagecache: imageCacheReducer,
    canvassettings: canvasSettingsReducer,
    settings: settingsReducer
});

export default rootReducer;