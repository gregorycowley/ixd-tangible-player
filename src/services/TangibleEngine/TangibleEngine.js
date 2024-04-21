const EventEmitter = require('node:events');
const TEConnect = require('./TEConnect.js');
const net = require('node:net');
const mockNetConnect = require('../../util/mockNetConnect.js');
// - Write code that will connect to an external service.
// - Listen to the service for updates.
// - Map the service response to a defined data structure.
// - Return the service response.

const TangibleEngine = class TangibleEngine extends EventEmitter {
  constructor(port, ip) {
    super();
    this.port = port;
    this.ip = ip;
    this.interval = null;
    // this.te = null;
    // const socket = net.connect({ ip, port });
    const mockSocket = mockNetConnect(this.port, this.ip, () => {
      console.log('Connected!');
    });
    this.client = new TEConnect(this.port, this.ip, null, mockSocket);
    this.emit('status', 'Initialized');
  }

  start() {
    this.te.run();
  }

  puckIdentity(id, pattern, pointers) {
    const puckId = { Id: id };
    const patternId = { PatternId: pattern };
    const pointerIds = { PointerIds: pointers };
    return [puckId, patternId, pointerIds];
  }

  puckOffset(xOffset, yOffset) {
    const x = { x: xOffset };
    const y = { y: yOffset };
    const offsetArray = [x, y];
    return offsetArray;
  }

  puckName(name) {
    return { Name: name };
  }

  puckStatus(status) {
    return { Status: status };
  }

  puckRMS(rms) {
    /* 
      RMS (Root Mean Square): Error differential between a recognized 
      tangible and the pattern it corresponds to. Must be smaller than 
      the Profile Property, Sensitivity in order to be recognized.
    */
    return { RMSNormalized: rms };
  }

  puckPosition(xPos, yPos) {
    const x = { x: xPos };
    const y = { y: yPos };
    const positionArray = [x, y];
    return positionArray;
  }

  puckRotation(r) {
    const rotation = { R: r };
    return rotation;
  }

  run() {
    console.log('te', typeof this.t);
    this.te = new TangibleEngineMock(this.port, this.ip);
    this.te.on('update', (response) => {
      this.update(response);
    });
    this.te.run();
  }

  update(response) {
    this.emit('update', response);
  }

  scaleFunc(x, y) {
    return { x: x, y: y };
  }

  mapToObject(receivedData) {
    let pucks = [];
    receivedData.pucks.forEach((puckObj) => {
      // Loop 1
      const puckPropArray = Object.values(puckObj)[0];
      let newPuck = {};
      puckPropArray.forEach((puckProp) => {
        // Loop 2
        newPuck[Object.keys(puckProp)[0]] = Object.values(puckProp)[0];
      });
      pucks.push(newPuck);
    });
    return {
      pucks: pucks,
      length: receivedData.length,
      timestamp: new Date(),
    };
  }
};

module.exports = TangibleEngine;

// // This file is required by the index.html file and will
// // be executed in the renderer process for that window.
// // All of the Node.js APIs are available in this process.

// const { screen } = require('electron');
// const { debug } = require('../util/debug.js');

// // const pulseInt = setInterval(() => {
// //   callback({TANGIBLES:[]});
// // }
// // , 1000);

// const TangibleEngineConnect = ( callback ) => {
//   debug('TangibleEngineConnect');
//   const TangibleEngine = require('./TangibleEngine').default;

//   try {
//     const te = new TangibleEngine( 4949, '10.211.55.5');
//     te.scaleFunc = (x,y)=>{
//       return screen.dipToScreenPoint({x:x,y:y});
//     };

//     te.on('patterns', response => {
//       console.log(response);
//     });

//     te.on('connect', () => console.log('Connected to service'));
//     te.on('disconnect', () => console.log('Disconnected from service'));
//     te.on('update', response => {
//       debug('TE update : ', response);
//       callback(response);
//     });

//     te.init();
//     return te;
//   }
//   catch (e) {
//     console.log('Error at TangibleEngine : ', e);
//   }
// };

// module.exports.TangibleEngineConnect = TangibleEngineConnect;

// const EventEmitter = require('node:events');
// const puckTestData = require('../../data/te_3_puck.json');

// const TangibleEngineMock = class TangibleEngineMock extends EventEmitter {
//   constructor(port, ip) {
//     super();
//     this.port = port;
//     this.ip = ip;
//     this.interval = null;
//     this.emit('status', 'Initialized');
//   }

//   run() {
//     this.puckTestData = puckTestData;
//     this.emit('status', 'Connected to service');
//     this.interval = setInterval(() => {
//       console.log('TangibleEngineMock ticking...');
//       this.onUpdate();
//     }, 5000);
//   }

//   // send (data) {
//   //   console.log('TangibleEngineMock sending data : ', data);
//   // }

//   onUpdate() {
//     this.emit('update', this.puckTestData);
//   }

//   scaleFunc(x, y) {
//     // return screen.dipToScreenPoint({x:x,y:y});
//     return { x: x, y: y };
//   }
// };

// module.exports.TangibleEngineMock = TangibleEngineMock;
