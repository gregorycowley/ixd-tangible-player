// main.js
// https://www.electronforge.io/config/plugins/webpack
const { app, BrowserWindow, ipcMain } = require('electron');
const { debug } = require('../util/debug.js');
const net = require('node:net');
const TangibleEngineNode = require('../services/tangible-engine/node/node.js');
const isDev = require('electron-is-dev');
const config = require('../config.json');
const os = require('node:os');

process.env.MODE = 'development';

const {
  sendTestUpdate,
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
    fullscreen: true,
    kiosk: true,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      preload: webpackPreloadEntry,
    },
  });

  if (process.env.MODE == 'development') {
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.setResizable(false);
  }

  mainWindow.loadURL(webpackEntry);
  mainWindow.webContents.openDevTools();

  let teNode = null;
  const port = os.platform == 'darwin' ? 4948 : 4949;

  try {
    const socket = net.connect({ host: '127.0.0.1', port: port });
    socket.on('error', (err) => {
      if (err.code === 'ECONNREFUSED') {
        console.log('[Tangible Engine service not running]');
      }
    });
    teNode = new TangibleEngineNode(socket);
  } catch (e) {
    console.log('Error creating TE node : ', e);
  }

  // tangible engine
  ipcMain.on('start-tangible-engine', (event, msg) => {
    try {
      teInit(teNode, mainWindow);
      teStart(teNode);
      sendTestUpdate(mainWindow);
    } catch (e) {
      console.log('Error starting TE : ', e);
    }
  });

  ipcMain.handle('update-tangible-engine', async (event, payload) => {
    function doSomeWork(arg) {
      return arg;
    }
    const result = await doSomeWork('done');
    teWrite(teNode, payload);
    return result;
  });

  mainWindow.on('closed', function () {
    teDestroy(teNode);
  });
};

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
  session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
    details.requestHeaders['User-Agent'] = 'SuperDuperAgent';
    callback({ cancel: false, requestHeaders: details.requestHeaders });
  });
  debug('Sent from main');
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
