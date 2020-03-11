import { combineReducers } from 'redux';
import imageCacheReducer from "./ImageCacheReducer";
import settingsReducer from "./SettingsReducer";

const rootReducer = combineReducers({
    imagecache: imageCacheReducer,
    settings: settingsReducer
});

export default rootReducer;