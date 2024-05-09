const { connectToServer } = require('./connect.js');
const TangibleEngineNode = require('./node.js');
const EventEmitter = require('node:events');
const puckData = require('../../../../data/received.json');
const { appendObjectToNewLine } = require('../../../util/logToFile.js');
const os = require('node:os');

module.exports = class TangibleClient extends EventEmitter {
  constructor(mainWindow) {
    this.teNode = null;
    this.mainWindow = mainWindow;
  }

  init(teNode, mainWindow) {
    if (teNode == null) throw new Error('Error: TE Node not initialized');

    teNode.on('connect', () => {
      console.log('==== Node Connect ====');
      mainWindow.webContents.send('tangible-engine-response', 'Connected to service');
    });
    teNode.on('disconnect', () => console.log('Disconnected from service'));

    teNode.on('patterns', (response) => {
      // console.log('==== Node Patterns ====');
      mainWindow.webContents.send('tangible-engine-patterns', response);
    });

    teNode.on('update', (response) => {
      // console.log('==== Node Update ====');
      appendObjectToNewLine(response, 'receive.txt');
      // mainWindow.webContents.send('tangible-engine-response', response);
      this.emit('update', response);
    });
    console.log('==== TE Node Init Complete ====');
  }

  start(teNode) {
    if (teNode == null) throw new Error('Error: TE Node not initialized');
    teNode.init();
    console.log('==== TE Node Started ====');
  }

  write(teNode, payload) {
    if (teNode == null) throw new Error('Error: TE Node not initialized');
    teNode.write(payload);
  }

  destroy(teNode) {
    if (teNode == null) throw new Error('Error: TE Node not initialized');
    teNode.deInit();
    teNode = null;
  }

  // ~ Input and Output
  handleResponse() {
    console.log('==== Node Connect ====');
    this.emit('connect', response);
  }

  handleRequest() {
    console.log('==== Node Request ====');
    this.emit('request', response);
  }

  sendCommand(event, response) {
    console.log('Command request received:', response);
    // mainWindow.webContents.send('echo-response', echo);
    mainWindow.webContents.send('tangible-engine-response', response);
  }

  // ~ Utility
  test(mainWindow) {
    setTimeout(() => {
      mainWindow.webContents.send('tangible-engine-response', puckData);
      console.log('==== TE Node Sending Test to Renderer ====');
    }, 2000);
  }

  // TANGIBLES
  // PATTERNS
  // STATUS
  // TYPE
  // POINTERS
  // DEBUG_TEXT
  // ID
};

// module.exports.teConnect = teConnect;
// module.exports.sendTestUpdate = sendTestUpdate;
// module.exports.teInit = teInit;
// module.exports.teStart = teStart;
// module.exports.teDestroy = teDestroy;
// module.exports.teWrite = teWrite;

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
