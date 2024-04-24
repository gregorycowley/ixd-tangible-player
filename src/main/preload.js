// preload.js

const { contextBridge, ipcRenderer } = require('electron/renderer');

contextBridge.exposeInMainWorld('electronAPI', {
  startTangibleEngine: (msg) => ipcRenderer.send('start-tangible-engine', msg),
  onTangibleEngineUpdate: (callback) =>
    ipcRenderer.on('tangible-engine-update', (_event, value) => callback(value)),
  onTangibleEnginePatterns: (callback) =>
    ipcRenderer.on('tangible-engine-patterns', (_event, value) => callback(value)),
  updateTangibleEngine: (payload) => ipcRenderer.invoke('update-tangible-engine', payload),
  onReply: () =>
    ipcRenderer.on('update-tangible-engine-reply', (_event, arg) => {
      console.log('REPLY!!', arg);
    }),
});
