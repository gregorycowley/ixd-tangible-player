// main.js
// https://www.electronforge.io/config/plugins/webpack

const { app, BrowserWindow, ipcMain, screen } = require('electron');
const { debug } = require('../util/debug.js');
const net = require('node:net');
const TangibleEngineNode = require('../services/tangible-engine/node/node.js');
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

  // Echos back the message sent from the renderer
  ipcMain.on('send-command', (event, response) => {
    console.log('Command request received:', response);
    // mainWindow.webContents.send('echo-response', echo);
    mainWindow.webContents.send('tangible-engine-response', response);
  });

  // Echos back the message sent from the renderer
  ipcMain.on('send-request-echo', (event, echo) => {
    // console.log('Echo request received:', echo);
    mainWindow.webContents.send('echo-response', echo);
  });

  // tangible engine
  ipcMain.on('start-tangible-engine', (event, msg) => {
    try {
      teInit(teNode, mainWindow);
      teStart(teNode);
      // sendTestUpdate(mainWindow);
    } catch (e) {
      console.log('Error starting TE : ', e);
    }
  });

  ipcMain.handle('tangible-engine-request', async (event, payload) => {
    console.log(`:::: ${JSON.stringify(payload) || 'no payload'} ::::`);
    mainWindow.webContents.send('tangible-engine-response', payload);
    appendObjectToNewLine(payload, 'send.txt');
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
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.on('get-screen-dimensions', (event) => {
  // console.log('getScreenDims request received');
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  // console.log('getScreenDims reply :: ', width, height, event);
  event.reply('screen-dimensions', { width, height });
});
// src/main/preload.js
