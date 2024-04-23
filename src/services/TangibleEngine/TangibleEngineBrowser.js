const events_1 = require('events');
// const PAYLOAD_TYPES = require('./types.js');
const { toBufferPayload } = require('./helpers.js');

/**
 * The Tangible Engine 2 binding for Node. The Tangible Engine class
 * communicates via TCP with the Tangible Engine Service. It is meant to be
 * used in conjuction with Ideum's Tangible Engine 2 service.
 *
 * @alpha
 */
class TangibleEngineBrowser extends events_1.EventEmitter {
  /**
   * Creates an instance of the TEConnect client.
   *
   * @memberof TEConnect
   */
  constructor() {
    super();

    this.scaleFunction = (x, y) => {
      return { x: x, y: y };
    };

    this._hasWindow = typeof window !== 'undefined';
    if (selector) {
      this._target = document.querySelector(selector);
    } else {
      if (this._hasWindow) {
        this._target = window;
      }
    }
  }

  /**
   * Checks whether or not a browser window is available in the current context.
   * A browser window is required for registering touch event listeners.
   *
   * @readonly
   * @type {boolean}
   * @memberof TEConnect
   */
  get hasWindow() {
    return this._hasWindow;
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
   * Function for Scale
   *
   * @public
   * @memberof TEConnect
   */
  set scaleFunc(value) {
    this.scaleFunction = value;
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
   * The target used to attach touch event listeners.
   *
   * @defaultValue Window
   * @public
   * @readonly
   * @memberof TEConnect
   */
  get target() {
    return this._target;
  }
  /**
   * A list of touches created during TouchEvents.
   *
   * @public
   * @memberof TEConnect
   */
  get touches() {
    return this._touches;
  }
  set touches(value) {
    this._touches = value;
  }
  /**
   * Shuts down the TEConnect client. Removes registered touch event
   * listeners and closes the socket.
   *
   * @public
   * @memberof TEConnect
   */
  deInit() {
    this.unregisterTouchPoints();
    // this.client.end();
  }
  /**
   * Initialize the TEConnect client. Gets registered patterns from the
   * service, registers touch event listeners, and starts the touch update loop.
   *
   * @public
   * @memberof TEConnect
   */
  init() {
    // this.getPatterns();
    this.registerTouchPoints();
    if (this.hasWindow) {
      window.requestAnimationFrame(this.update.bind(this));
    }
  }
  /**
   * Sets the touches from registered touch events.
   *
   * @param {TouchEvent} touchEvent - The TouchEvent passed by the registered event listener.
   * @private
   * @memberof TEConnect
   */
  handleTouch(touchEvent) {
    this.touches = touchEvent.touches;
  }
  /**
   * Registers several touch event listeners on the specified DOM Element, or Window.
   *
   * @private
   * @memberof TEConnect
   */
  registerTouchPoints() {
    if (this.hasWindow) {
      this.target.addEventListener('touchend', this.handleTouch.bind(this));
      this.target.addEventListener('touchmove', this.handleTouch.bind(this));
      this.target.addEventListener('touchstart', this.handleTouch.bind(this));
    }
  }

  /**
   * Removes several touch event listeners frome the specified DOM Element, or Window.
   *
   * @private
   * @memberof TEConnect
   */
  unregisterTouchPoints() {
    if (this.hasWindow) {
      this.target.removeEventListener('touchend', this.handleTouch);
      this.target.removeEventListener('touchmove', this.handleTouch);
      this.target.removeEventListener('touchstart', this.handleTouch);
    }
  }
  /**
   * Sends available touch points to the Tangible Engine service for evaluation.
   *
   * @private
   * @memberof TEConnect
   */
  update() {
    const payload = {
      POINTERS: [],
      Type: 'Update',
    };
    if (this.touches) {
      if (this.touches.length > 0) {
        for (let i = 0; i < this.touches.length; i++) {
          const touch = this.touches.item(i);
          const scaledPoints = this.scaleFunction(touch.clientX, touch.clientY);
          payload.POINTERS.push({
            Id: touch.identifier,
            X: scaledPoints.x,
            Y: scaledPoints.y,
          });
        }
      }
    }
    // this.write(payload);
    window.requestAnimationFrame(this.update.bind(this));
  }
  /**
   * Sends a formatted message to the Tangible Engine service via TCP.
   *
   * @private
   * @param {IPayload} payload - The message to send.
   * @memberof TEConnect
   */
  write(payload) {
    // if (!this.isWriting) {
    //   this.isWriting = true;
    //   try {
    //     this.client.write(toBufferPayload(payload), 'utf8', () => (this.isWriting = false));
    //   } catch (error) {
    //     console.error(error);
    //   }
    // }
  }
}
module.exports = TEConnect;
