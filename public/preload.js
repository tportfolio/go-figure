const { contextBridge, ipcRenderer } = require('electron');
const { channels } = require('./channels');

/**
 * Channels in the direction of React to Electron.
 */
const SEND_CHANNELS = [
    channels.CANVAS_REQUEST_FILES,
    channels.FIGURE_DRAWING_REQUEST_FILES,
    channels.STATS_SAVE_TO_FILE,
    channels.STATS_LOAD_FROM_FILE,
    channels.SETTINGS_LOAD_FROM_FILE,
    channels.SETTINGS_SAVE_TO_FILE
];

/**
 * Channels in the direction of Electron to React.
 */
const RECEIVE_CHANNELS = [
    channels.CANVAS_REQUEST_FILES_CALLBACK,
    channels.FIGURE_DRAWING_REQUEST_FILES_CALLBACK,
    channels.STATS_LOAD_CALLBACK,
    channels.SETTINGS_LOAD_CALLBACK
];

// code to expose/abstract filesystem interactions
// template from: https://github.com/electron/electron/issues/9920#issuecomment-575839738
contextBridge.exposeInMainWorld("api", {
    send: (channel, data) => {
        if (SEND_CHANNELS.includes(channel)) {
            ipcRenderer.send(channel, data);
        }
    },
    receive: (channel, func) => {
        if (RECEIVE_CHANNELS.includes(channel)) {
            // Deliberately strip event as it includes `sender` 
            ipcRenderer.on(channel, (event, ...args) => func(...args));
        }
    }
});