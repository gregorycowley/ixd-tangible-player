const events_1 = require('events');
const PAYLOAD_TYPES = require('./types.js');
const {
  toBufferInt32,
  toBufferPayload,
  toInt32ByteArray,
  toObjectBufferPayload,
} = require('./helpers.js');

/**
 * The Tangible Engine 2 binding for Node. The Tangible Engine class
 * communicates via TCP with the Tangible Engine Service. It is meant to be
 * used in conjuction with Ideum's Tangible Engine 2 service.
 *
 * @alpha
 */
class TEConnect extends events_1.EventEmitter {
  /**
   * Creates an instance of the TEConnect client.
   *
   * @param {object} socket - A net.Socket client to use for the connection.
   * @memberof TEConnect
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
      console.log('TENOde Received data:', response);
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
   * @memberof TEConnect
   */
  get client() {
    return this._client;
  }

  /**
   * Returns whether or not the client is connected to the server.
   *
   * @readonly
   * @type {boolean}
   * @memberof TEConnect
   */
  get isConnected() {
    return this._isConnected;
  }
  /**
   * This property is used to keep track of whether or not the socket is
   * actively writing to the server.
   *
   * @public
   * @memberof TEConnect
   */
  get isWriting() {
    return this._isWriting;
  }
  set isWriting(value) {
    this._isWriting = value;
  }

  /**
   * A list of patterns registered with the Tangible Engine service. Patterns
   * are returned from the service at initialization.
   *
   * @public
   * @readonly
   * @memberof TEConnect
   */
  get patterns() {
    return this._patterns;
  }

  /**
   * Shuts down the TEConnect client. Removes registered touch event
   * listeners and closes the socket.
   *
   * @public
   * @memberof TEConnect
   */
  deInit() {
    this.client.end();
  }
  /**
   * Initialize the TEConnect client. Gets registered patterns from the
   * service, registers touch event listeners, and starts the touch update loop.
   *
   * @public
   * @memberof TEConnect
   */
  init() {
    this.getPatterns();
  }
  /**
   * Retrieves registered patterns from the Tangible Engine service.
   *
   * @private
   * @memberof TEConnect
   */
  getPatterns() {
    const payload = { Type: 'Patterns' };
    this.write(payload);
  }

  /**
   * Sends available touch points to the Tangible Engine service for evaluation.
   *
   * @public
   * @memberof TEConnect
   */
  update(payload) {
    this.write(payload);
  }
  /**
   * Sends a formatted message to the Tangible Engine service via TCP.
   *
   * @private
   * @param {IPayload} payload - The message to send.
   * @memberof TEConnect
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
module.exports = TEConnect;
