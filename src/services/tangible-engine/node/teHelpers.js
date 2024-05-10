const { connectToServer } = require('./connect.js');
const TangibleEngineNode = require('./node.js');
const puckData = require('../../../../data/received.json');
const { appendObjectToNewLine } = require('../../../util/logToFile.js');
const os = require('node:os');

const sendTestUpdate = (mainWindow) => {
  setTimeout(() => {
    mainWindow.webContents.send('tangible-engine-response', puckData);
    console.log('==== TE Node Sending Test to Renderer ====');
  }, 2000);
};

const teInit = (teNode, mainWindow, responseFunction) => {
  if (teNode == null) throw new Error('Error: TE Node not initialized');

  teNode.on('connect', () => {
    console.log('==== Node Connect ====');
    mainWindow.webContents.send('tangible-engine-response', 'Connected to service');
  });
  teNode.on('disconnect', () => console.log('Disconnected from service'));

  teNode.on('patterns', (response) => {
    responseFunction(response);
  });

  teNode.on('update', (response) => {
    responseFunction(response);
  });
  console.log('==== TE Node Init Complete ====');
};

const teWrite = (teNode, payload) => {
  // console.log('==== Writing to TE ====', payload);
  if (teNode == null) throw new Error('Error: TE Node not initialized');
  teNode.write(payload);
};

const teDestroy = (teNode) => {
  if (teNode == null) throw new Error('Error: TE Node not initialized');
  teNode.deInit();
  teNode = null;
};

const teStart = (teNode) => {
  if (teNode == null) throw new Error('Error: TE Node not initialized');
  teNode.init();
  console.log('==== TE Node Started ====');
};

// module.exports.teConnect = teConnect;
module.exports.sendTestUpdate = sendTestUpdate;
module.exports.teInit = teInit;
module.exports.teStart = teStart;
module.exports.teDestroy = teDestroy;
module.exports.teWrite = teWrite;

// let teNode = null;

// (async () => {
//   const host = '127.0.0.1';
//   let port = 4949;
//   if (os.platform() === 'win32') {
//     port = 4949;
//   } else if (os.platform() === 'darwin') {
//     port = 4948;
//   }

//   try {
//     const socket = await connectToServer({ host: host, port: port });
//     teNode = new TangibleEngineNode(socket);
//     socket.write('Hello from client!');
//   } catch (error) {
//     console.error('Error:', error);
//   }
// })();

// const teConnect = async () => {
//   let node = null;

//   const host = '127.0.0.1';
//   let port = 4949;
//   if (os.platform() === 'win32') {
//     port = 4949;
//   } else if (os.platform() === 'darwin') {
//     port = 4948;
//   }

//   try {
//     const socket = await connectToServer({ host: host, port: port });
//     node = new TangibleEngineNode(socket);

//     socket.write('Hello from client!');
//   } catch (error) {
//     console.error('Error:', error);
//   }
//   return node;
// };
