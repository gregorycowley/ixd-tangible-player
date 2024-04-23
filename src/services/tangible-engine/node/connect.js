const { debug } = require('console');
const net = require('net')

const connectToServer = async ({host, port}) => {
  return new Promise((resolve, reject) => {
      const socket = new net.Socket();
      console.log('connectToServer :: ', host, port);
      socket.connect({host,port}, () => {
          console.log('Connected to server!');
          resolve(socket);
      });

      addListeners(socket);

      socket.on('error', (err) => {
          console.error('Failed to connect to server:', err);
          reject(err);
      });
  });
}

const addListeners = (socket) => {
  const debug = createDebug();
  socket.on('data', (data) => {
    debug.log('onData: Received data from the server: ' + data.toString());
  });
  socket.on('end', () => {
    debug.log('onEnd: Server ended the connection');
  });
  socket.on('close', (hadError) => {
    debug.log('onClose: Connection closed' + (hadError ? ' with error' : ''));
  });
  socket.on('timeout', () => {
    debug.log('onTimeout: Socket timeout');
    socket.end();
  });
  socket.on('drain', () => {
    debug.log('onDrain: Write buffer is empty now');
  });
  socket.on('lookup', (err, address, family, host) => {
    if (err) {
      debug.error('DNS lookup error: ' + err.message);
        return;
    }
    debug.log(`DNS lookup result - Address: ${address}, Family: ${family}, Host: ${host}`);
  });
  socket.on('ready', () => {
    debug.log('onReady: Socket is ready for communication');
  });
  return socket;
}


const createDebug = () => {
  const debug = {};
  debug.log = (msg) => {
    console.log('##! ', msg);
  };
  debug.error = (msg) => {
    console.error('##! ', msg);
  };
  return debug;
}


exports.connectToServer = connectToServer;