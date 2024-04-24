// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const { screen } = require('electron');
const { debug } = require('../util/debug.js');

// const pulseInt = setInterval(() => {
//   callback({TANGIBLES:[]});
// }
// , 1000);

const TangibleEngineConnect = ( callback ) => {
  debug('TangibleEngineConnect');
  const TangibleEngine = require('./TangibleEngine').default;

  try {
    const te = new TangibleEngine( 4949, '10.211.55.5');
    te.scaleFunc = (x,y)=>{
      return screen.dipToScreenPoint({x:x,y:y});
    };
  
    te.on('patterns', response => {
      console.log(response);
    });
  
    te.on('connect', () => console.log('Connected to service'));
    te.on('disconnect', () => console.log('Disconnected from service'));
    te.on('update', response => {
      debug('TE update : ', response);
      callback(response);
    });
  
    te.init();
    return te;
  }
  catch (e) {
    console.log('Error at TangibleEngine : ', e);
  }
};


module.exports.TangibleEngineConnect = TangibleEngineConnect;
