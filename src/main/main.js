// main.js
// https://www.electronforge.io/config/plugins/webpack

// Red (!)
// Blue (?)
// Green (*)
// Yellow (^)
// Pink (&)
// Purple (~)
// Mustard (todo)
// Grey (//)

const { app, BrowserWindow, ipcMain, screen } = require('electron');
const { debug } = require('../util/debug.js');
const net = require('node:net');
const TangibleEngineNode = require('../services/tangible-engine/node/node.js');

const TangibleClient = require('../services/tangible-engine/TangibleClient.js');
const TangibleReactInterface = require('../services/tangible-engine/TangibleReactInterface.js');

const isDev = require('electron-is-dev');
const config = require('../config.json');
const os = require('node:os');
const icon = require('./build/logo.png');
const { appendObjectToNewLine } = require('../util/logToFile.js');

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
    // kiosk: true,
    frame: false,
    title: 'Tangible Player',
    icon: icon,
    webPreferences: {
      nodeIntegration: true,
      preload: webpackPreloadEntry,
      contextIsolation: true,
      enableRemoteModule: false,
    },
  });
  const isDev = process.env.MODE == 'development';
  if (isDev) {
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.setResizable(false);
  }

  mainWindow.loadURL(webpackEntry);

  const teNodeClient = new TangibleClient();
  const teReactInterface = new TangibleReactInterface(mainWindow.webContents);

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

  // ! Requests From Renderer:
  // Echos back the message sent from the renderer

  ipcMain.on('send-command', teReactInterface.handleCommandResponse);

  // Echos back the message sent from the renderer
  ipcMain.on('send-request-echo', teReactInterface.handleEchoResponse);

  // tangible engine
  ipcMain.on('start-tangible-engine', teReactInterface.handleStart);

  ipcMain.handle('tangible-engine-request', teReactInterface.handleRequest);

  ipcMain.on('get-screen-dimensions', (event) => {
    // console.log('getScreenDims request received');
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    // console.log('getScreenDims reply :: ', width, height, event);
    event.reply('screen-dimensions', { width, height });
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
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// src/main/preload.js
