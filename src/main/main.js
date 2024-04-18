// main.js
// https://www.electronforge.io/config/plugins/webpack
const { app, BrowserWindow, ipcMain } = require('electron');
const { TangibleEngineMock } = require('../tangible-engine/TangibleEngineMock');
const { TangibleEngineAdapter } = require('../tangible-engine/TangibleEngineAdapter');
const { debug } = require('../util/debug.js');
const path = require('node:path');
const { TEContext } = require('../components/TEContext.js');

// MAIN_WINDOW_WEBPACK_ENTRY ::  http://localhost:3000/main_window
const webpackEntry = MAIN_WINDOW_WEBPACK_ENTRY;

// MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY ::  /Users/gregorycowley/Projects/cca-code-library/CCA-ClassKit/Projects/electron/ixd-tangible-player/.webpack/renderer/main_window/preload.js
const webpackPreloadEntry = MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 1000,
    webPreferences: {
      nodeIntegration: true,
      preload: webpackPreloadEntry
    }
  });
  

  mainWindow.loadURL(webpackEntry);
  mainWindow.webContents.openDevTools();
  const te = new TangibleEngineMock(0,0);
  const teAdapter = new TangibleEngineAdapter(0,0); 

  const onTEConnect = (event, mainWindow) => {
    debug('onTEConnect start-tangible-engine...', mainWindow);
    te.on ('status', response => {
      debug('TE status : ', response);
      mainWindow.webContents.send('tangible-engine-status', response);
    });
    te.on ('update', response => {
      debug('TE update : ', response);
      try {
        const newResponse = teAdapter.mapToObject(response);
      } catch (e) {
        debug('Error in createWindow', e);
      }
      mainWindow.webContents.send('update-renderer', response);
    });
      
    te.run();
  };

  try{
    // ipcMain.on('start-tangible-engine', onTEConnect, mainWindow );
    onTEConnect('start-tangible-engine', mainWindow);
  }catch (e) {
    debug('Error in onTEConnect', e);
  }
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

