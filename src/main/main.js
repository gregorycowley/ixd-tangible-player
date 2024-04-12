// main.js
// https://www.electronforge.io/config/plugins/webpack

const { app, BrowserWindow, ipcMain } = require('electron');
const { TangibleEngineConnect } = require('../tangible-engine/TangibleEngineConnect');
const { debug } = require('../util/debug.js');
const path = require('node:path');
const isDev = require('electron-is-dev');
const config = require('../config.json');

// console.log("MAIN_WINDOW_WEBPACK_ENTRY :: ", MAIN_WINDOW_WEBPACK_ENTRY );
// MAIN_WINDOW_WEBPACK_ENTRY ::  http://localhost:3000/main_window
const webpackEntry = MAIN_WINDOW_WEBPACK_ENTRY;

// console.log("MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY :: ", MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY);
// MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY ::  /Users/gregorycowley/Projects/cca-code-library/CCA-ClassKit/Projects/electron/ixd-tangible-player/.webpack/renderer/main_window/preload.js
const webpackPreloadEntry = MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY;


// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {

  const screenWidth = config.screenWidth;
  const screenHeight = config.screenHeight;
  const makeFullscreen = (isDev)? false : true;

  const mainWindow = new BrowserWindow({
    width: screenWidth,
    height: screenHeight,
    fullscreen: makeFullscreen,
    webPreferences: {
      nodeIntegration: true,
      preload: webpackPreloadEntry
    }
  });

  mainWindow.loadURL(webpackEntry);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.webContents.on('devtools-opened', () => {
      mainWindow.webContents.closeDevTools();
    });
  }

  const updateRenderer = (tangibleData) => {
    debug('updateRenderer', tangibleData);
    try {
      mainWindow.webContents.send('update-renderer', tangibleData);
    }
    catch (e) {
      console.log('Error at updateRenderer : ', e);
    }
  };

  ipcMain.on('start-tangible-engine', (event, msg) => {
    debug('ipcMain start-tangible-engine : ', msg);
    try {
      const te = TangibleEngineConnect(updateRenderer);
    }
    catch (e) {
      console.log('Error at TangibleEngineConnect : ', e);
    }
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

