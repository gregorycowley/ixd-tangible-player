if (typeof process === 'undefined' || process.type === 'renderer' || process.browser === true || process.__nwjs) {
	module.exports = require('./browser/browser.js');
} else {
	module.exports = require('./node/node.js');
}