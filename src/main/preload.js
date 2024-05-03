// preload.js

const { contextBridge, ipcRenderer } = require('electron/renderer');

const startTangibleEngine = (msg) => ipcRenderer.send('start-tangible-engine', msg);
const getScreenDims = () => {
  // console.log('getScreenDims request');
  ipcRenderer.send('get-screen-dimensions');
};
const updateTangibileEngine = (payload) => ipcRenderer.invoke('update-tangible-engine', payload);

// ! Note: Handlers may not be working as expected do to when they being defined and called.
// ! think hardabout when the funcitons are called.
// ! The callback variable allows the function to be defined by the caller

const handleTangibleEngineUpdate = (callback) => {
  // console.log('#### handleTangibleEngineUpdate ####');
  ipcRenderer.on('tangible-engine-update', (_event, value) => callback(value));
};

const handleTangibleEnginePatterns = (callback) => {
  console.log('#### handleTangibleEnginePatterns ####');
  ipcRenderer.on('tangible-engine-patterns', (_event, value) => callback(value));
};

const handleReply = () => {
  console.log('#### handleReply ####');
  ipcRenderer.on('update-tangible-engine-reply', (_event, arg) => {
    console.log('REPLY!!', arg);
  });
};

const handleScreenDims = () => {
  console.log('#### handleScreenDims ####');
  ipcRenderer.on('screen-dimensions', (event, { width, height }) => {
    // console.log(`Screen dimensions are: ${width}x${height}`);
    document.getElementById('output').textContent = `Screen dimensions: ${width} x ${height}`;
  });
};

const testCallback = (value) => {
  console.log('Callback value:', value);
};

contextBridge.exposeInMainWorld('electronAPI', {
  startTangibleEngine: startTangibleEngine,
  updateTangibleEngine: updateTangibileEngine,
  onScreenDims: handleScreenDims,
  getScreenDims: getScreenDims,
  onTangibleEngineUpdate: handleTangibleEngineUpdate,
  onTangibleEnginePatterns: handleTangibleEnginePatterns,
  onReply: handleReply,
  fromMain: (channel, func) => {
    ipcRenderer.on(channel, func);
  },
});
