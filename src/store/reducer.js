import { combineReducers } from 'redux';
import imageCacheReducer from "./ImageCacheReducer";
import settingsReducer from "./SettingsReducer";
import canvasSettingsReducer from "./CanvasSettingsReducer";
import figureDrawingReducer from "./FigureDrawingReducer";


const rootReducer = combineReducers({
    imagecache: imageCacheReducer,
    canvassettings: canvasSettingsReducer,
    settings: settingsReducer,
    figuredrawing: figureDrawingReducer
});

export default rootReducer;