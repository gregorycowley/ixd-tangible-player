const EventEmitter = require('node:events');
const TangibleEngineMock = require('./TangibleEngineMock');
// - Write code that will connect to an external service.
// - Listen to the service for updates.
// - Map the service response to a defined data structure.
// - Return the service response.

const TangibleEngineAdapter = class TangibleEngineAdapter extends EventEmitter {
  constructor(port, ip) {
    super();
    this.port = port;
    this.ip = ip;
    this.interval = null;
    this.te = null;
    this.emit('status', 'Initialized');
  }

  puckIdentity (id, pattern, pointers) {
    const puckId = { Id: id };
    const patternId = { PatternId: pattern };
    const pointerIds = { PointerIds: pointers };
    return [puckId, patternId, pointerIds];
  }

  puckOffset (xOffset, yOffset) {
    const x = {x: xOffset};
    const y = {y: yOffset};
    const offsetArray = [x,y];
    return offsetArray;
  }

  puckName (name) {
    return { Name: name };
  }

  puckStatus (status) {
    return { Status: status };
  }

  puckRMS ( rms ) {
    /* 
      RMS (Root Mean Square): Error differential between a recognized 
      tangible and the pattern it corresponds to. Must be smaller than 
      the Profile Property, Sensitivity in order to be recognized.
    */
    return { RMSNormalized: rms };
  }

  puckPosition (xPos, yPos) {
    const x = {x: xPos};
    const y = {y: yPos};
    const positionArray = [x,y];
    return positionArray;
  }

  puckRotation ( r ) {
    const rotation = { R: r };
    return rotation;
  }

  run () {
    this.te = new TangibleEngineMock(this.port, this.ip);
    this.te.on('update', response => {
      this.update();
    });
    this.te.run();
  }

  update() {
    this.emit('update', response);
  }

  scaleFunc (x,y) {
    return {x:x,y:y};
  }

  mapToObject(receivedData) {
    let pucks = [];
    receivedData.pucks.forEach( puckObj => {
      // Loop 1
      const puckPropArray = Object.values(puckObj)[0];
      let newPuck = {};
      puckPropArray.forEach( puckProp => {
        // Loop 2
        newPuck[Object.keys(puckProp)[0]] = Object.values(puckProp)[0];
      });
      pucks.push(newPuck);
    });
    return {
      pucks: pucks,
      length: receivedData.length,
      timestamp: new Date()
    };
  }
};

module.exports.TangibleEngineAdapter = TangibleEngineAdapter;
