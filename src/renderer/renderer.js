import { TangibleEngineBrowser } from '../services/tangible-engine/browser/browser.js';
import { Tangible } from '../services/tangible-engine/browser/tangible.js';
import { TangibleInfo } from '../services/tangible-engine/browser/tangible-info.js';
import '../ui/style.css';
import '../index.js';

const teBrowser = new TangibleEngineBrowser();
teBrowser.init();

const init = () => {
  const enableScaleFunction = true;
  const enableTangibleEngine = true;
  const listenForUpdates = false;

  if (enableScaleFunction) {
    window.electronAPI.getScreenDims();
    window.electronAPI.fromMain('screen-dimensions', (event, dims) => {
      document.getElementById('output').textContent = `${dims.width} x ${dims.height}`;
      // console.log('From Server: ', dims);
      const scaleFunction = (x, y) => {
        const xRatio = dims.width / window.innerWidth;
        const yRatio = dims.height / window.innerHeight;
        const newX = x * xRatio;
        const newY = y * yRatio;
        // console.log('Scale Function: ', x, y, '=>', newX, newY, 'Ratios:', xRatio, yRatio);
        return { newX, newY };
      };
      teBrowser.scaleFunc = scaleFunction;
    });
  }

  if (enableTangibleEngine) {
    window.electronAPI.startTangibleEngine('Renderer says: startTangibleEngine!');
  }

  if (listenForUpdates) {
    // ^ Note: The React App has it's own listener for Tangible Engine updates
    this.tangibleInfo = new TangibleInfo();
    this.tangibleEntity = new Tangible();
    window.electronAPI.onTangibleEngineUpdate((tangibleData) => {
      console.log('onTangibleEngineUpdate', tangibleData);
      tangibleInfo.update(tangibleData);
      tangibleEntity.update(tangibleData);
    });
  }
};

init();

// document.addEventListener('DOMContentLoaded', () => {}
