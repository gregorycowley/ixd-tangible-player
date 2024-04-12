const doDebug = false;

const debug = (msg, ...args) => {
  if ( doDebug ){
    console.log('DEBUG : ', msg, args);
  }
};

module.exports.debug = debug;