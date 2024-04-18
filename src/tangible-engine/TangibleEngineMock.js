const EventEmitter = require('node:events');
const puckTestData = require('../../data/te_3_puck.json'); 

const TangibleEngineMock = class TangibleEngineMock extends EventEmitter {
  constructor(port, ip) {
    super();
    this.port = port;
    this.ip = ip;
    this.interval = null;
    this.emit('status', 'Initialized');
  }

  run () {
    this.puckTestData = puckTestData;
    this.emit('status', 'Connected to service');
    this.interval = setInterval(() => {
      console.log('TangibleEngineMock ticking...');
      this.onUpdate();
    }, 5000);
  }

  // send (data) {
  //   console.log('TangibleEngineMock sending data : ', data);
  // }

  onUpdate() {
    this.emit('update', this.puckTestData);
  }

  scaleFunc (x,y) {
    // return screen.dipToScreenPoint({x:x,y:y});
    return {x:x,y:y};
  }
};


module.exports.TangibleEngineMock = TangibleEngineMock;
