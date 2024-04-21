const EventEmitter = require('events');

class MockNetInstance extends EventEmitter {
  setKeepAlive() {
    console.log('Keep-alive set');
  }

  connect(port, host, callback) {
    console.log(`Mock connection attempt to ${host}:${port}`);
    process.nextTick(() => {
      this.emit('connect');
      if (callback) {
        callback();
      }
    });
  }

  write(data, encoding, callback) {
    console.log(`Writing data: ${data}`);
    process.nextTick(() => {
      this.emit('data', data); // Echo back the data as if received from the other end
      if (callback) {
        callback();
      }
    });
  }

  end(data, encoding, callback) {
    if (data) {
      this.write(data, encoding, () => {
        this.close(callback);
      });
    } else {
      this.close(callback);
    }
  }

  close(callback) {
    console.log('Connection closed');
    process.nextTick(() => {
      this.emit('end');
      if (callback) {
        callback();
      }
    });
  }

  disconnect(callback) {
    console.log('Connection forcefully disconnected');
    process.nextTick(() => {
      this.emit('disconnect');
      if (callback) {
        callback();
      }
    });
  }
}

class MockNetConnection extends EventEmitter {
  constructor(port, host, callback) {
    super();
    console.log(`Mock connection attempt to ${host}:${port}`);
    process.nextTick(() => {
      this.emit('connect');
      if (callback) {
        callback();
      }
    });
  }

  connect(port, host, callback) {
    console.log(`Mock connection attempt to ${host}:${port}`);
    process.nextTick(() => {
      this.emit('connect');
      if (callback) {
        callback();
      }
    });
    return new MockNetInstance();
  }
}

// Singleton instance
let instance;

const mockNetConnect = (port, host, callback) => {
  if (!instance) {
    instance = new MockNetConnection(port, host, callback);
  }
  return instance;
};

module.exports = mockNetConnect;
