const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const child_process = require('child_process');

// const server = require('./server'); //TODO: split out code to frontend/backend
// console.log("found server");
// console.log(server);

const path = require('path');
const isDev = require('electron-is-dev');
const url = require('url');

let mainWindow;

function createWindow() {
	mainWindow = new BrowserWindow({width: 900, height: 680});
	mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
	mainWindow.setMenuBarVisibility(isDev);
	child_process.fork(isDev ? path.resolve(__dirname, "../public/server.js") : path.resolve(__dirname, "server.js"));

	mainWindow.on('closed', () => mainWindow = null);
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