import { Tangible } from '../services/tangible-engine/browser/tangible.js';
import { TangibleEngineBrowser } from '../services/tangible-engine/browser/browser.js';
import '../ui/style.css';
import '../index.js';

console.log('r: Renderer Starting..');

const teBrowser = new TangibleEngineBrowser();
const tangibleEntity = new Tangible();
teBrowser.init();

window.electronAPI.onTangibleEngineUpdate((tangibleData) => {
  tangibleEntity.update(tangibleData);
});

window.electronAPI.startTangibleEngine('Renderer says: startTangibleEngine!');
