const { BrowserWindow, ipcMain, app, globalShortcut } = require('electron');
const path = require("path");
const fs = require("fs");
const isDev = require('electron-is-dev');

const { RECEIVER_CHANNEL, SENDER_CHANNEL } = require("./constants");

let mainWindow;
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    icon: path.join(__dirname, "favicon.ico"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js") // use a preload script
    }
  });

  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  mainWindow.setMenuBarVisibility(isDev);
  globalShortcut.unregister("Control+A"); // remove default behavior for select all in favor of app-specific shortcut
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

/**
 * Loader for image data from filesystem. 
 */
ipcMain.on(SENDER_CHANNEL, (event, args) => {
  console.log(args);

  args.forEach(f => {
    fs.readFile(f, "base64", (error, data) => {
      mainWindow.webContents.send(RECEIVER_CHANNEL, data);
    });
  })
});