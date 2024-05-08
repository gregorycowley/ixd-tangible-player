// if (typeof process === 'undefined' || process.type === 'renderer' || process.browser === true || process.__nwjs) {
// 	module.exports = require('./browser/browser.js');
// } else {
// 	module.exports = require('./node/node.js');
// }

module.exports.browser = require('./browser/browser.js');
module.exports.node = require('./node/node.js');
