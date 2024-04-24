/**
 * The payload types used by the Tangible Engine 2 service.
 *
 * @enum {string}
 */
var PAYLOAD_TYPES;
(function (PAYLOAD_TYPES) {
  PAYLOAD_TYPES[(PAYLOAD_TYPES['none'] = 0)] = 'none';
  PAYLOAD_TYPES[(PAYLOAD_TYPES['init'] = 1)] = 'init';
  PAYLOAD_TYPES[(PAYLOAD_TYPES['patterns'] = 2)] = 'patterns';
  PAYLOAD_TYPES[(PAYLOAD_TYPES['update'] = 3)] = 'update';
  PAYLOAD_TYPES[(PAYLOAD_TYPES['reset'] = 4)] = 'reset';
  PAYLOAD_TYPES[(PAYLOAD_TYPES['error'] = 5)] = 'error';
})(PAYLOAD_TYPES || (PAYLOAD_TYPES = {}));

module.exports = PAYLOAD_TYPES;
