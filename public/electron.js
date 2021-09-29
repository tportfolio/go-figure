const { BrowserWindow, ipcMain, app, globalShortcut } = require('electron');
const path = require("path");
const fs = require("fs");
const os = require("os");
const isDev = require('electron-is-dev');
const { channels } = require('../src/channels');

// create local data folder if it doesn't exist
const APP_DATA_PATH = path.join(os.homedir(), ".go-figure");
if (!fs.existsSync(APP_DATA_PATH)) {
    fs.mkdirSync(APP_DATA_PATH);
}

const STATS_FILE_PATH = path.join(APP_DATA_PATH, "stats.json");

let mainWindow;
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1920,
        height: 1080,
        minWidth: 1920,
        minHeight: 1080,
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
 * Generic method for sending/receiving file data on a channel pair.
 * @param {*} receiverChannel - channel requesting data
 * @returns array of base64 image representations
 */
const retrieveImages = receiverChannel => {
    return (event, args) => {
        console.log(args);

        args.forEach(f => {
            fs.readFile(f, "base64", (error, data) => {
                const metadata = {
                    data,
                    filename: path.basename(f),
                    filesize: fs.statSync(f).size
                };
                mainWindow.webContents.send(receiverChannel, metadata);
            });
        })
    }
};

/**
 * Loader for image data from filesystem to reference canvas. 
 */
ipcMain.on(channels.CANVAS_REQUEST_FILES, retrieveImages(channels.CANVAS_REQUEST_FILES_CALLBACK));

/**
 * Loader for image data from filesystem to figure drawing session.
 */
ipcMain.on(channels.FIGURE_DRAWING_REQUEST_FILES, retrieveImages(channels.FIGURE_DRAWING_REQUEST_FILES_CALLBACK));

/**
 * Writer for completed figure drawing session stats to local folder.
 */
ipcMain.on(channels.STATS_SAVE_TO_FILE, (event, args) => {
    let statsObject;
    if (!fs.existsSync(STATS_FILE_PATH)) {
        statsObject = { sessions: [args] };
    } else {
        statsObject = JSON.parse(fs.readFileSync(STATS_FILE_PATH));
        statsObject.sessions.push(args);
    }

    // third arg in stringify allows for spacing specification when written out
    // w+ truncates file and starts from beginning
    fs.writeFile(STATS_FILE_PATH, JSON.stringify(statsObject, null, '\t'), { flag: 'w+' }, err => {
        if (err) {
            throw err;
        }
        console.log(`Saved session: ${JSON.stringify(args)}`);
    });
});

/**
 * Loader for previously saved figure drawing session stats in local folder.
 */
 ipcMain.on(channels.STATS_LOAD_FROM_FILE, (event, args) => {
    let statsObject;
    if (!fs.existsSync(STATS_FILE_PATH)) {
        statsObject = { sessions: [] };
    } else {
        statsObject = JSON.parse(fs.readFileSync(STATS_FILE_PATH));
    }
    mainWindow.webContents.send(channels.STATS_LOAD_CALLBACK, statsObject);
});