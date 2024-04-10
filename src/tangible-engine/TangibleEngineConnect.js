// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const {screen} = require('electron');

const TangibleEngineConnect = ( callback ) => {

  console.log('TangibleEngineConnect');
  
  const TangibleEngine = require('./TangibleEngine').default;
  const te = new TangibleEngine( 4949, '10.211.55.5');

  // callback('Dummy Data');

  te.scaleFunc = (x,y)=>{
    return screen.dipToScreenPoint({x:x,y:y});
  };

  te.on('patterns', response => {
    console.log(response);
  });

  te.on('connect', () => console.log('Connected to service'));
  te.on('disconnect', () => console.log('Disconnected from service'));

  te.on('update', response => {
    console.log('TE update : ', response);
    callback(response);
  });

  te.init();

  // const pulseInt = setInterval(() => {
  //   callback({TANGIBLES:[]});
  // }
  // , 1000);

  return te;
};


module.exports.TangibleEngineConnect = TangibleEngineConnect;
