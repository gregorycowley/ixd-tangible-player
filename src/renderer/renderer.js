import { TangibleEngineBrowser } from '../services/tangible-engine/browser/browser.js';
import { Tangible } from '../services/tangible-engine/browser/tangible.js';
import { TangibleInfo } from '../services/tangible-engine/browser/tangible-info.js';

import React from 'react';
import ReactDOM from 'react-dom/client';
import '../ui/style.css';
import App from '../App.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

window.root = root;

const teBrowser = new TangibleEngineBrowser();
teBrowser.requestFunc = async (payload) => {
  // Designed to consolidate all requests to the Tangible Engine service
  document.getElementById('tangible-up').textContent = JSON.stringify(payload);
  const isDone = await window.electronAPI.sendRequestToTE(payload);
  // console.log('**** Request Function ****', payload);
  return isDone;
};
teBrowser.init();

const init = () => {
  const enableScaleFunction = true;
  const enableTangibleEngine = true;
  const listenForUpdates = true;

  window.electronAPI.receiveEcho((msg) => console.log('Echo from Main: ', msg));
  window.electronAPI.sendEcho('Message to echo back');

  if (enableScaleFunction) {
    window.electronAPI.getScreenDims();
    window.electronAPI.fromMain('screen-dimensions', (event, dims) => {
      const scaleValue = 1.45;
      // console.log('From Server: ', dims);
      const scaleFunction = (x, y) => {
        const xRatio = scaleValue;
        const yRatio = scaleValue;
        // const xRatio = window.innerWidth / dims.width;
        // const yRatio = window.innerHeight / dims.height;
        const newX = x * xRatio;
        const newY = y * yRatio;

        // console.log('Scale Function: ', dims, window.innerWidth, window.innerHeight);
        return { x: newX, y: newY };
      };

      const scaley = (window.innerWidth / dims.width).toFixed(2);
      const scalex = (window.innerHeight / dims.height).toFixed(2);
      document.getElementById('output').textContent =
        `${window.innerWidth}x${window.innerHeight} | ${dims.width} x ${dims.height} (${scaleValue * 100}%)`;
      teBrowser.scaleFunc = scaleFunction;
      console.log(`**** Screen dims: ${dims.width} x ${dims.height} ****`);
    });
  }

  if (enableTangibleEngine) {
    window.electronAPI.startTangibleEngine('Renderer says: startTangibleEngine!');
  }

  if (listenForUpdates) {
    // ^ Note: The React App has it's own listener for Tangible Engine updates
    // this.tangibleInfo = new TangibleInfo();
    // this.tangibleEntity = new Tangible();
    window.electronAPI.receiveReponseFromTE((tangibleData) => {
      // console.log('**** receiveReponseFromTE Callback ****', tangibleData);
      // tangibleInfo.update(tangibleData);
      // tangibleEntity.update(tangibleData);
    });
  }
  console.log('**** Renderer Init Complete ****');
};

init();

// document.addEventListener('DOMContentLoaded', () => {}
