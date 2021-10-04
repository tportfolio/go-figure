const { BrowserWindow, ipcMain, app, globalShortcut } = require('electron');
const path = require('path');
const fs = require('fs');
const os = require('os');
const isDev = require('electron-is-dev');

const { channels } = require('./channels');

// create local data folder if it doesn't exist
const APP_DATA_PATH = path.join(os.homedir(), ".go-figure");
if (!fs.existsSync(APP_DATA_PATH)) {
    fs.mkdirSync(APP_DATA_PATH);
}

// full paths of files managed by the application
const STATS_FILE_PATH = path.join(APP_DATA_PATH, "stats.json");
const SETTINGS_FILE_PATH = path.join(APP_DATA_PATH, "settings.json");

// create main window at global level so it can be used for sending data back to React side
let mainWindow;

/**
 * Create Electron window with default params. 
 */
const createWindow = () => {
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
 * Wrapper for writing content to a specified file.
 * @param {*} path - full file path
 * @param {*} data - JSON object to write to file
 */
const writeToFile = (path, data) => {
    // third arg in stringify allows for spacing specification when written out
    // w+ truncates file and starts from beginning
    fs.writeFileSync(path, JSON.stringify(data, null, '\t'), { flag: 'w+' });
}

/**
 * Generic method for sending/receiving file data on a channel pair.
 * @param {*} receiverChannel - channel requesting data
 * @returns array of base64 image representations
 */
const retrieveImages = receiverChannel => {
    return (event, args) => {
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
ipcMain.on(channels.STATS_SAVE_TO_FILE, (e, args) => {
    let statsObject;
    if (!fs.existsSync(STATS_FILE_PATH)) {
        statsObject = { sessions: [args] };
    } else {
        statsObject = JSON.parse(fs.readFileSync(STATS_FILE_PATH));
        statsObject.sessions.push(args);
    }

    writeToFile(STATS_FILE_PATH, statsObject);
});

/**
 * Loader for previously saved figure drawing session stats in local folder.
 */
ipcMain.on(channels.STATS_LOAD_FROM_FILE, (e, args) => {
    let statsObject;
    if (!fs.existsSync(STATS_FILE_PATH)) {
        statsObject = { sessions: [] };
    } else {
        statsObject = JSON.parse(fs.readFileSync(STATS_FILE_PATH));
    }
    mainWindow.webContents.send(channels.STATS_LOAD_CALLBACK, statsObject);
});

/**
 * Writer for new app settings to local folder.
 */
ipcMain.on(channels.SETTINGS_SAVE_TO_FILE, (e, args) => {
    const existingSettings = JSON.parse(fs.readFileSync(SETTINGS_FILE_PATH));
    const newSettings = { ...existingSettings, ...args };

    writeToFile(SETTINGS_FILE_PATH, newSettings);
    console.debug(`Saved settings: ${JSON.stringify(newSettings)}`);
});

/**
 * Loader for previously saved app settings in local folder.
 */
ipcMain.on(channels.SETTINGS_LOAD_FROM_FILE, (e, defaultSettings) => {
    if (!fs.existsSync(SETTINGS_FILE_PATH)) {
        console.trace(`Settings file does not exist, writing default settings to file`);
        writeToFile(SETTINGS_FILE_PATH, defaultSettings);
    }

    const settings = JSON.parse(fs.readFileSync(SETTINGS_FILE_PATH));
    mainWindow.webContents.send(channels.SETTINGS_LOAD_CALLBACK, settings);
});