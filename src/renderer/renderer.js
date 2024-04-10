/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import '../ui/style.css';
import '../index.js';

// This doesn't work because the tangible element cannot be cloned and passed to the main process
const tangibleElement = document.querySelector('.tangible');

const parseTangibleData = ( response ) => {
  // callback(response);
  if (response.TANGIBLES.length > 0) {
    showTangible(tangibleElement);
    updateTangiblePos(
      tangible,
      response.TANGIBLES[0].X,
      response.TANGIBLES[0].Y
    );
    updateTangibleRot(tangibleElement, response.TANGIBLES[0].R);
  } else {
    hideTangible(tangibleElement);
  }
};

const hideTangible = (tangible) => {
  tangible.style.opacity = 0;
};

const showTangible = (tangible) => {
  tangible.style.opacity = 1;
};

const updateTangiblePos = (tangible, x, y) => {
  let newPoint = screen.screenToDipPoint({x:x,y:y});
  const bounds = tangible.getBoundingClientRect();
  tangible.style.left = `${(newPoint.x - bounds.x) * 0.5 +
    bounds.x -
    tangible.clientWidth / 4}px`;
  tangible.style.top = `${(newPoint.y - bounds.y) * 0.5 +
    bounds.y -
    tangible.clientHeight / 4}px`;
};

const updateTangibleRot = (tangible, radian) => {
  tangible.style.transform = `rotate(${radian * 57.29578}deg)`;
};

window.electronAPI.onUpdateRenderer((tangibleData) => {
  // Todo: do something with the data
  console.log('Renderer received from main :: ', tangibleData);
  parseTangibleData(tangibleData);
  // const oldValue = Number(counter.innerText)
  // const newValue = oldValue + value
  // counter.innerText = newValue.toString()
  // window.electronAPI.counterValue(newValue)
});

// window.electronAPI.startTangibleEngine('Hello from renderer.js!');
// console.log('👋 This message is being logged by "renderer.js", included via webpack', tangibleElement);
