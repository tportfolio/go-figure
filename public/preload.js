const { contextBridge, ipcRenderer } = require("electron");
const { channels } = require('../src/channels');

// code to expose/abstract filesystem interactions
// template from: https://github.com/electron/electron/issues/9920#issuecomment-575839738
contextBridge.exposeInMainWorld(
    "api", {
    send: (channel, data) => {
        if ([channels.SENDER_CHANNEL, channels.FIGURE_DRAWING_FILE_SENDER_CHANNEL].includes(channel)) {
            ipcRenderer.send(channel, data);
        }
    },
    receive: (channel, func) => {
        if ([channels.RECEIVER_CHANNEL, channels.FIGURE_DRAWING_FILE_RECEIVER_CHANNEL].includes(channel)) {
            // Deliberately strip event as it includes `sender` 
            ipcRenderer.on(channel, (event, ...args) => func(...args));
        }
    }
}
);