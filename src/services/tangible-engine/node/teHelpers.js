const { connectToServer } = require('./connect.js');
const TangibleEngineNode = require('./node.js');
const os = require('node:os');

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

const teConnect = async () => {
  let node = null;

  const host = '127.0.0.1';
  let port = 4949;
  if (os.platform() === 'win32') {
    port = 4949;
  } else if (os.platform() === 'darwin') {
    port = 4948;
  }

  try {
    const socket = await connectToServer({ host: host, port: port });
    node = new TangibleEngineNode(socket);

    socket.write('Hello from client!');
  } catch (error) {
    console.error('Error:', error);
  }
  return node;
};

const teInit = (teNode, mainWindow) => {
  if (teNode == null) throw new Error('Error: TE Node not initialized');
  teNode.on('patterns', (response) => {
    console.log('==== Node Patterns ====');
    mainWindow.webContents.send('tangible-engine-patterns', response);
  });

  teNode.on('connect', () => {
    console.log('==== Node Connect ====');
    mainWindow.webContents.send('tangible-engine-update', 'Connected to service');
  });
  teNode.on('disconnect', () => console.log('Disconnected from service'));

  teNode.on('update', (response) => {
    // console.log ('==== Node Update ====')
    mainWindow.webContents.send('tangible-engine-update', response);
  });
};

const teWrite = (teNode, payload) => {
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
};

module.exports.teConnect = teConnect;
module.exports.teInit = teInit;
module.exports.teStart = teStart;
module.exports.teDestroy = teDestroy;
module.exports.teWrite = teWrite;
