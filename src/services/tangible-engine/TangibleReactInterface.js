module.exports = class TangibleReactInterface {
  constructor(webContents) {
    this.teNode = null;
    this.webContents = webContents;
  }

  // ~ What does React need to Know?
  // Send updates to the TEContext

  sendRequest() {}

  handleStart(event, msg) {
    try {
      teInit(teNode, mainWindow);
      teStart(teNode);
      // sendTestUpdate(mainWindow);
    } catch (e) {
      console.log('Error starting TE : ', e);
    }
  }

  async handleRequest(event, payload) {
    console.log(`:::: ${JSON.stringify(payload) || 'no payload'} ::::`);
    mainWindow.webContents.send('tangible-engine-response', payload);
    appendObjectToNewLine(payload, 'send.txt');
    function doSomeWork(arg) {
      return arg;
    }
    const result = await doSomeWork('done');
    teWrite(teNode, payload);
    return result;
  }

  handleResponse() {
    console.log('==== Node Connect ====');
    this.emit('connect', response);
  }

  handleCommandResponse(event, response) {
    console.log('Command request received:', response);
    // mainWindow.webContents.send('echo-response', echo);
    mainWindow.webContents.send('tangible-engine-response', response);
  }

  handleEchoResponse(event, echo) {
    // console.log('Echo request received:', echo);
    mainWindow.webContents.send('echo-response', echo);
  }

  // newPatterns() {
  //   console.log('==== Node Patterns ====');
  //   this.emit('patterns', response);
  // }

  handleStatus() {
    console.log('==== Node Status ====');
    this.emit('status', response);
    // Connected
    // Disconnected
    // Error
  }
};
//
