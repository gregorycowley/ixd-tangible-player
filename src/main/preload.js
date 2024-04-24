// preload.js

// All the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
// window.addEventListener('DOMContentLoaded', () => {
//   const replaceText = (selector, text) => {
//     const element = document.getElementById(selector)
//     if (element) element.innerText = text
//   }
//   for (const dependency of ['chrome', 'node', 'electron']) {
//     replaceText(`${dependency}-version`, process.versions[dependency])
//   }
// })
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
      console.log('REPLY!!', arg); // prints "pong" in the DevTools console
    }),
});
