const { BrowserWindow, ipcMain, app, globalShortcut } = require('electron');
const path = require("path");
const fs = require("fs");
const isDev = require('electron-is-dev');

let mainWindow;
function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    icon: path.join(__dirname, "favicon.ico"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js") // use a preload script
    }
  });

  // Load app
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  mainWindow.setMenuBarVisibility(isDev);
  globalShortcut.unregister("Control+A");
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


ipcMain.on("toMain", (event, args) => {
  console.log(args);

  args.forEach(f => {
    fs.readFile(f, "base64", (error, data) => {
      mainWindow.webContents.send("fromMain", data);
    });
  })
});