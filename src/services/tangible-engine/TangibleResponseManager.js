module.exports = class TangibleResponseManager {
  constructor() {
    this.teNode = null;
  }

  connect() {
    console.log('==== Node Connect ====');
    this.emit('connect', response);
  }

  disconnect() {
    console.log('==== Node Disconnect ====');
    this.emit('disconnect', response);
  }

  update() {
    console.log('==== Node Update ====');
    appendObjectToNewLine(response, 'receive.txt');
    this.emit('update', response);
  }

  patterns() {
    console.log('==== Node Patterns ====');
    this.emit('patterns', response);
  }
};
