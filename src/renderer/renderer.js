import { Tangible } from '../services/tangible-engine/browser/tangible.js';
import { TangibleEngineBrowser } from '../services/tangible-engine/browser/browser.js';
import { TangibleInfo } from '../services/tangible-engine/browser/tangible-info.js';
import '../ui/style.css';
import '../index.js';

const teBrowser = new TangibleEngineBrowser();
// const tangibleEntity = new Tangible();
// const tangibleInfo = new TangibleInfo();

teBrowser.init();

// The react App has it's own listener for Tangible Engine updates
// window.electronAPI.onTangibleEngineUpdate((tangibleData) => {
//   console.log('onTangibleEngineUpdate', tangibleData);
//   tangibleInfo.update(tangibleData);
//   tangibleEntity.update(tangibleData);
// });

window.electronAPI.startTangibleEngine('Renderer says: startTangibleEngine!');
