// preload.js

// Red (!)
// Blue (?)
// Green (*)
// Yellow (^)
// Pink (&)
// Purple (~)
// Mustard (todo)
// Grey (//)

const { contextBridge, ipcRenderer } = require('electron/renderer');

// & Init
const startTangibleEngine = (msg) => ipcRenderer.send('start-tangible-engine', msg);

// & Screen
const getScreenDims = () => {
  ipcRenderer.send('get-screen-dimensions');
};
const handleScreenDims = () => {
  console.log('#### handleScreenDims ####');
  ipcRenderer.on('screen-dimensions', (event, { width, height }) => {
    document.getElementById('output').textContent = `Screen dimensions: ${width} x ${height}`;
  });
};

// & TE
// ? Note: Handlers may not be working as expected do to when they being defined and called.
// ? think hardabout when the funcitons are called.
// ? The callback variable allows the function to be defined by the caller
// * UP
const sendRequestToTE = (payload) => ipcRenderer.invoke('tangible-engine-request', payload);
const sendCommandToTE = (msg) => {
  console.log('Sending command:', msg);
  ipcRenderer.send('send-command', msg);
};
// * DOWN
const receiveReponseFromTE = (callback) => {
  ipcRenderer.on('tangible-engine-response', (_event, value) => callback(value));
};
const receivePatternsFromTE = (callback) => {
  console.log('#### handleTangibleEnginePatterns ####');
  ipcRenderer.on('tangible-engine-patterns', (_event, value) => callback(value));
};

// & Test Echo
const sendEcho = (msg) => {
  console.log('Sending echo request:', msg);
  ipcRenderer.send('send-request-echo', msg);
};
const receiveEcho = (callback) => {
  console.log('#### receiveEchoResponse ####');
  ipcRenderer.on('echo-response', (_event, value) => callback(value));
};

// & Connections
contextBridge.exposeInMainWorld('electronAPI', {
  startTangibleEngine: startTangibleEngine,
  sendRequestToTE: sendRequestToTE,
  sendEcho: sendEcho,
  sendCommandToTE: sendCommandToTE,
  receiveEcho: receiveEcho,
  receiveReponseFromTE: receiveReponseFromTE,
  receivePatternsFromTE: receivePatternsFromTE,
  getScreenDims: getScreenDims,
  onScreenDims: handleScreenDims,
  fromMain: (channel, func) => {
    ipcRenderer.on(channel, func);
  },
});

// ~ Unused
const handleReply = () => {
  console.log('#### handleReply ####');
  ipcRenderer.on('tangible-engine-request-reply', (_event, arg) => {
    console.log('REPLY!!', arg);
  });
};

const testCallback = (value) => {
  console.log('Callback value:', value);
};
