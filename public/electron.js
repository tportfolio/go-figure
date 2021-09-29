const { BrowserWindow, ipcMain, app, globalShortcut } = require('electron');
const path = require("path");
const fs = require("fs");
const os = require("os");
const isDev = require('electron-is-dev');
const { channels } = require('../src/channels');

// create local data folder if it doesn't exist
const appDataPath = path.join(os.homedir(), ".go-figure");
if (!fs.existsSync(appDataPath)) {
    fs.mkdirSync(appDataPath);
}

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
ipcMain.on(channels.SENDER_CHANNEL, retrieveImages(channels.RECEIVER_CHANNEL));

/**
 * Loader for image data from filesystem to figure drawing session.
 */
ipcMain.on(channels.FIGURE_DRAWING_FILE_SENDER_CHANNEL, retrieveImages(channels.FIGURE_DRAWING_FILE_RECEIVER_CHANNEL));

/**
 * Writer for completed figure drawing session stats to local folder.
 */
ipcMain.on(channels.STATS_SENDER_CHANNEL, (event, args) => {
    const statsFilePath = path.join(appDataPath, "stats.json");

    let statsObject;
    if (!fs.existsSync(statsFilePath)) {
        statsObject = { sessions: [args] };
    } else {
        statsObject = JSON.parse(fs.readFileSync(statsFilePath));
        statsObject.sessions.push(args);
    }

    // third arg in stringify allows for spacing specification when written out
    // w+ truncates file and starts from beginning
    fs.writeFile(statsFilePath, JSON.stringify(statsObject, null, '\t'), { flag: 'w+' }, err => {
        if (err) {
            throw err;
        }
        console.log(`Saved session: ${JSON.stringify(args)}`);
    });
});