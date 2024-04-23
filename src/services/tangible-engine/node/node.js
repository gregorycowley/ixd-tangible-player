const events_1 = require('events');
const PAYLOAD_TYPES = require('./types.js');

/**
 * The Tangible Engine 2 binding for Node. The Tangible Engine class
 * communicates via TCP with the Tangible Engine Service. It is meant to be
 * used in conjuction with Ideum's Tangible Engine 2 service.
 *
 * @alpha
 */
class TangibleEngineNode extends events_1.EventEmitter {
  /**
   * Creates an instance of the TangibleEngineNode client.
   *
   * @param {object} socket - A net.Socket client to use for the connection.
   * @memberof TangibleEngineNode
   */
  constructor(socket) {
    super();
    if (!socket) {
      throw new Error('A socket is required to connect to the Tangible Engine service.');
    }
    this._client = socket;
    this._client.setKeepAlive(true);
    this.client.on('connect', () => {
      this._isConnected = true;
      this.emit('connect');
    });
    this._client.on('data', (data) => {
      const response = this.toObjectBufferPayload(data);
      // console.log('Client Data ', response)
      this.emit(PAYLOAD_TYPES[response.TYPE], response);
      // hydrate patterns
      if (response.TYPE === 2) {
        this._patterns = response.PATTERNS;
      }
    });
    this._client.on('end', () => {
      this._isConnected = false;
      this.emit('disconnect');
    });
    this.isWriting = false;
  }
  /**
   * The instance's socket client used to make TCP calls to the TE service.
   *
   * @public
   * @readonly
   * @memberof TangibleEngineNode
   */
  get client() {
    return this._client;
  }

  /**
   * Returns whether or not the client is connected to the server.
   *
   * @readonly
   * @type {boolean}
   * @memberof TangibleEngineNode
   */
  get isConnected() {
    return this._isConnected;
  }
  /**
   * This property is used to keep track of whether or not the socket is
   * actively writing to the server.
   *
   * @public
   * @memberof TangibleEngineNode
   */
  get isWriting() {
    return this._isWriting;
  }
  set isWriting(value) {
    this._isWriting = value;
  }
  /**
 * Takes a number and returns 4-byte ArrayBuffer.
 *
 * @private
 * @param {number} num - The number to transform.
 * @returns {ArrayBuffer} An ArrayBuffer representation of the number.
 * @memberof TEConnect
 */
 toBufferInt32(num) {
  const arr = new ArrayBuffer(4);
  const view = new DataView(arr);
  view.setUint32(0, num, true);
  return arr;
}
/**
 * Transforms an object payload to Buffer for writing to the server via TCP.
 *
 * @private
 * @param {IPayload} payload - The payload to transform.
 * @returns {Buffer} A Buffer holding the payload.
 * @memberof TEConnect
 */
 toBufferPayload(payload) {
  const dataString = JSON.stringify(payload);
  const length = Buffer.byteLength(dataString, 'utf8');
  const header = Buffer.from(this.toBufferInt32(length));
  const bufferData = Buffer.from(dataString);
  return Buffer.concat([header, bufferData]);
}
/**
 * Transforms a ByteArray representation into a number (int32).
 *
 * @private
 * @param {Buffer} byteArray - The ByteArray to transform.
 * @returns {number} The number.
 * @memberof TEConnect
 */
 toInt32ByteArray(byteArray) {
  let value = 0;
  for (let i = byteArray.length - 1; i >= 0; i--) {
    value = value * 256 + byteArray[i];
  }
  return value;
}
/**
 * Transforms a TCP Buffer response from the Tangible Engine server into a
 * standard object.
 *
 * @private
 * @param {Buffer} response - The Buffer response from the server.
 * @returns {IResponse} An object representation of the server response.
 * @memberof TEConnect
 */
 toObjectBufferPayload(response) {
  const length = this.toInt32ByteArray(response.slice(0, 4));
  const stringData = response.toString('utf8', 4, length + 4);
  if (stringData) {
    try {
      return JSON.parse(stringData);
    } catch (error) {
      console.error(error);
    }
  }
}

  /**
   * A list of patterns registered with the Tangible Engine service. Patterns
   * are returned from the service at initialization.
   *
   * @public
   * @readonly
   * @memberof TangibleEngineNode
   */
  get patterns() {
    return this._patterns;
  }

  /**
   * Shuts down the TangibleEngineNode client. Removes registered touch event
   * listeners and closes the socket.
   *
   * @public
   * @memberof TangibleEngineNode
   */
  deInit() {
    this.client.end();
  }
  /**
   * Initialize the TangibleEngineNode client. Gets registered patterns from the
   * service, registers touch event listeners, and starts the touch update loop.
   *
   * @public
   * @memberof TangibleEngineNode
   */
  init() {
    this.getPatterns();
  }
  /**
   * Retrieves registered patterns from the Tangible Engine service.
   *
   * @private
   * @memberof TangibleEngineNode
   */
  getPatterns() {
    const payload = { Type: 'Patterns' };
    this.write(payload);
  }

  /**
   * Sends available touch points to the Tangible Engine service for evaluation.
   *
   * @public
   * @memberof TangibleEngineNode
   */
  update(payload) {
    this.write(payload);
  }
  /**
   * Sends a formatted message to the Tangible Engine service via TCP.
   *
   * @private
   * @param {IPayload} payload - The message to send.
   * @memberof TangibleEngineNode
   */
  write(payload) {
    if (!this.isWriting) {
      this.isWriting = true;
      try {
        this.client.write(this.toBufferPayload(payload), 'utf8', () => (this.isWriting = false));
      } catch (error) {
        console.error(error);
      }
    }
  }
}
module.exports = TangibleEngineNode;
