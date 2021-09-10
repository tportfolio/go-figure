const {BrowserWindow, ipcMain, app, globalShortcut} = require('electron');
const path = require("path");
const fs = require("fs");
const isDev = require('electron-is-dev');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

async function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    icon: path.join(__dirname, "favicon.ico"),
    webPreferences: {
      nodeIntegration: false, // is default value after Electron v5
      contextIsolation: true, // protect against prototype pollution
      enableRemoteModule: false, // turn off remote
      preload: path.join(__dirname, "preload.js") // use a preload script
    }
  });

  // Load app
	mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
	mainWindow.setMenuBarVisibility(isDev);

  mainWindow.on('closed', () => mainWindow = null);
  globalShortcut.unregister("Control+A");
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
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