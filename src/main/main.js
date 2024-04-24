// main.js
// https://www.electronforge.io/config/plugins/webpack
const { app, BrowserWindow, ipcMain } = require('electron');
const { debug } = require('../util/debug.js');
// const path = require('node:path');
const isDev = require('electron-is-dev');
const config = require('../config.json');

const {
  teWrite,
  teInit,
  teStart,
  teDestroy,
} = require('../services/tangible-engine/node/teHelpers.js');

// MAIN_WINDOW_WEBPACK_ENTRY ::  http://localhost:3000/main_window
const webpackEntry = MAIN_WINDOW_WEBPACK_ENTRY;

// MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY ::  /Users/gregorycowley/Projects/cca-code-library/CCA-ClassKit/Projects/electron/ixd-tangible-player/.webpack/renderer/main_window/preload.js
const webpackPreloadEntry = MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  const screenWidth = config.screenWidth;
  const screenHeight = config.screenHeight;
  const makeFullscreen = isDev ? false : true;

  const mainWindow = new BrowserWindow({
    width: screenWidth,
    height: screenHeight,
    fullscreen: makeFullscreen,
    webPreferences: {
      nodeIntegration: true,
      preload: webpackPreloadEntry,
    },
  });

  mainWindow.loadURL(webpackEntry);
  mainWindow.webContents.openDevTools();

  // tangible engine
  ipcMain.on('start-tangible-engine', (event, msg) => {
    console.log('ipcMain start-tangible-engine : ', msg);
    try {
      teInit(mainWindow);
      teStart();
    } catch (e) {
      console.log('Error starting TE : ', e);
    }
  });

  ipcMain.handle('update-tangible-engine', async (event, payload) => {
    function doSomeWork(arg) {
      return arg;
    }
    const result = await doSomeWork('done');
    teWrite(payload);
    return result;
  });

  mainWindow.on('closed', function () {
    teDestroy();
    mainWindow = null;
  });
};

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
  debug('Sent from main');
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
