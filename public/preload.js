const { contextBridge, ipcRenderer } = require("electron");
const { RECEIVER_CHANNEL, SENDER_CHANNEL } = require("./constants");

// code to expose/abstract filesystem interactions
// template from: https://github.com/electron/electron/issues/9920#issuecomment-575839738
contextBridge.exposeInMainWorld(
    "api", {
        send: (channel, data) => {
            if (channel === SENDER_CHANNEL) {
                ipcRenderer.send(channel, data);
            }
        },
        receive: (channel, func) => {
            if (channel === RECEIVER_CHANNEL) {
                // Deliberately strip event as it includes `sender` 
                ipcRenderer.on(channel, (event, ...args) => func(...args));
            }
        }
    }
);