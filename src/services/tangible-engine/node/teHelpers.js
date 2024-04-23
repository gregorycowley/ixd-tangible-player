
const {connectToServer} = require('./connect.js');
const TangibleEngineNode = require('./node.js');
const os = require('node:os');

let teNode = null;

(async () => {
  const host = '127.0.0.1';
  let port = 4949;
  if (os.platform() === 'win32') {
    port = 4949;
  } else if (os.platform() === 'darwin') {
    port = 4948;
  }

  try {
    const socket = await connectToServer({host:host, port:port});
    teNode = new TangibleEngineNode(socket);
    socket.write('Hello from client!')
    console.log('Socket user instance created successfully.');
  } catch (error) {
      console.error('Error:', error);
  }
})();

const teInit = (mainWindow) => {
  console.log('teInit', teNode)
  // if (!teNode) {
  //   console.log('Error: TE Node not initialized');
  //   return;
  // }
  // teNode.on('patterns', response => {
  //   mainWindow.webContents.send('tangible-engine-patterns', response);
  // });

  // teNode.on('connect', () => {
  //   mainWindow.webContents.send('tangible-engine-update', 'Connected to service');
  // }),

  // teNode.on('disconnect', () => console.log('Disconnected from service'));

  // teNode.on('update', response => {
  //   // Todo: !Important. The teNode instance needs to be destroyed when the browser is closed.
  //   mainWindow.webContents.send('tangible-engine-update', response);
  // })
}

const teDestroy = () => {
  // if (!teNode) {
  //   console.log('Error: TE Node not initialized');
  //   return;
  // }
  // teNode.deInit();
  // teNode = null;
}

const teStart = () => {
  // if (!teNode) {
  //   console.log('Error: TE Node not initialized');
  //   return;
  // }
  // teNode.init();
}


module.exports.teInit = teInit;
module.exports.teStart = teStart;
module.exports.teDestroy = teDestroy;
