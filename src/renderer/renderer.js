import { Tangible } from '../services/tangible-engine/browser/tangible.js';
import { TangibleEngineBrowser } from '../services/tangible-engine/browser/browser.js';
import { TangibleInfo } from '../services/tangible-engine/browser/tangible-info.js';
import '../ui/style.css';
import '../index.js';

import dataReceived from '../../data/received.json';

console.log('r: Renderer Starting..');

const teBrowser = new TangibleEngineBrowser();
const tangibleEntity = new Tangible();
teBrowser.init();
tangibleEntity.update(dataReceived);
const tangibleInfo = new TangibleInfo();
tangibleInfo.update(dataReceived);

window.electronAPI.onTangibleEngineUpdate((tangibleData) => {
  // tangibleEntity.update(tangibleData);
});

window.electronAPI.startTangibleEngine('Renderer says: startTangibleEngine!');
