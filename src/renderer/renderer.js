import { Tangible } from '../services/tangible-engine/browser/tangible.js';
import { TangibleEngineBrowser } from '../services/tangible-engine/browser/browser.js';
import '../ui/style.css';
import '../index.js';

console.log('r: Renderer Starting..');
const tangibleElement = document.querySelector('.tangible');
const teBrowser = new TangibleEngineBrowser();
const tangibleEntity = new Tangible();
teBrowser.init();

// const parseTangibleData = (response) => {
//   // callback(response);
//   if (response.TANGIBLES.length > 0) {
//     showTangible(tangibleElement);
//     updateTangiblePos(tangible, response.TANGIBLES[0].X, response.TANGIBLES[0].Y);
//     updateTangibleRot(tangibleElement, response.TANGIBLES[0].R);
//   } else {
//     hideTangible(tangibleElement);
//   }
// };

// const hideTangible = (tangible) => {
//   tangible.style.opacity = 0;
// };

// const showTangible = (tangible) => {
//   tangible.style.opacity = 1;
// };

// const updateTangiblePos = (tangible, x, y) => {
//   let newPoint = screen.screenToDipPoint({ x: x, y: y });
//   const bounds = tangible.getBoundingClientRect();
//   tangible.style.left = `${(newPoint.x - bounds.x) * 0.5 + bounds.x - tangible.clientWidth / 4}px`;
//   tangible.style.top = `${(newPoint.y - bounds.y) * 0.5 + bounds.y - tangible.clientHeight / 4}px`;
// };

// const update = (...args) => {
//   console.log('update', args);
// };

// const updateTangibleRot = (tangible, radian) => {
//   tangible.style.transform = `rotate(${radian * 57.29578}deg)`;
// };

// window.electronAPI.onTangibleEngineUpdate((tangibleData) => {
//   // Todo: do something with the data
//   console.log('Renderer received from main :: ', tangibleData);
//   // parseTangibleData(tangibleData);
//   // const oldValue = Number(counter.innerText)
//   // const newValue = oldValue + value
//   // counter.innerText = newValue.toString()
//   // window.electronAPI.counterValue(newValue)
// });

window.electronAPI.onTangibleEngineUpdate((tangibleData) => {
  console.log('onTangibleEngineUpdate received from main :: ', tangibleData);
  tangibleEntity.update(tangibleData);
});

window.electronAPI.startTangibleEngine('Renderer says: startTangibleEngine!');
