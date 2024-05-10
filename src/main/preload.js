// preload.js

const { contextBridge, ipcRenderer } = require('electron/renderer');

const startTangibleEngine = (msg) => ipcRenderer.send('start-tangible-engine', msg);

const getScreenDims = () => {
  ipcRenderer.send('get-screen-dimensions');
};
const sendRequestToTE = (payload) => ipcRenderer.invoke('tangible-engine-request', payload);

// ! Note: Handlers may not be working as expected do to when they being defined and called.
// ! think hardabout when the funcitons are called.
// ! The callback variable allows the function to be defined by the caller
const sendCommandToTE = (msg) => {
  console.log('Sending command:', msg);
  ipcRenderer.send('send-command', msg);
};
const sendEcho = (msg) => {
  console.log('Sending echo request:', msg);
  ipcRenderer.send('send-request-echo', msg);
};
const receiveEcho = (callback) => {
  console.log('#### receiveEchoResponse ####');
  ipcRenderer.on('echo-response', (_event, value) => callback(value));
};

const receiveReponseFromTE = (callback) => {
  ipcRenderer.on('tangible-engine-response', (_event, value) => callback(value));
};

const receivePatternsFromTE = (callback) => {
  console.log('#### handleTangibleEnginePatterns ####');
  ipcRenderer.on('tangible-engine-patterns', (_event, value) => callback(value));
};

const receiveStats = () => {
  ipcRenderer.on( 'stat-update', (event, msg) => {
    console.log('Stat Update: ', msg)
    document.getElementById('stats').textContent = `Stats:: ${msg}`;
  })
  
}

const handleReply = () => {
  console.log('#### handleReply ####');
  ipcRenderer.on('tangible-engine-request-reply', (_event, arg) => {
    console.log('REPLY!!', arg);
  });
};

const handleScreenDims = () => {
  console.log('#### handleScreenDims ####');
  ipcRenderer.on('screen-dimensions', (event, { width, height }) => {
    document.getElementById('output').textContent = `Screen dimensions: ${width} x ${height}`;
  });
};

const testCallback = (value) => {
  console.log('Callback value:', value);
};

contextBridge.exposeInMainWorld('electronAPI', {
  startTangibleEngine: startTangibleEngine,
  sendRequestToTE: sendRequestToTE,
  sendEcho: sendEcho,
  sendCommandToTE: sendCommandToTE,
  receiveEcho: receiveEcho,
  receiveReponseFromTE: receiveReponseFromTE,
  receivePatternsFromTE: receivePatternsFromTE,
  receiveStats: receiveStats,
  getScreenDims: getScreenDims,
  onScreenDims: handleScreenDims,
  onReply: handleReply,
  fromMain: (channel, func) => {
    ipcRenderer.on(channel, func);
  },
});
