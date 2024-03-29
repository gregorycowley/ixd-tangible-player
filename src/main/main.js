// main.js
// https://www.electronforge.io/config/plugins/webpack

const { app, BrowserWindow } = require('electron')
const path = require('node:path')

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

// const env = process.env.NODE_ENV || 'development';
// if (env === 'development') { 
//   require('electron-reload')(__dirname, { 
//       electron: path.join(__dirname, '..', '..', 'node_modules', '.bin', 'electron'), 
//       hardResetMethod: 'exit'
//   }); 
// } 

const createWindow = () => {
  // console.log("MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY :: ", MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY);
  // MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY ::  /Users/gregorycowley/Projects/cca-code-library/CCA-ClassKit/Projects/electron/ixd-tangible-player/.webpack/renderer/main_window/preload.js
  
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // nodeIntegration: true,
      // preload: path.join(__dirname, 'preload.js')
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
    }
  });

  // mainWindow.loadFile('./src/ui/index.html')
  
  // console.log("MAIN_WINDOW_WEBPACK_ENTRY :: ", MAIN_WINDOW_WEBPACK_ENTRY );
  // MAIN_WINDOW_WEBPACK_ENTRY ::  http://localhost:3000/main_window
  
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  mainWindow.webContents.openDevTools();
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

