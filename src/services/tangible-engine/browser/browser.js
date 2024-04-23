/**
 * The Tangible Engine client for the browser.
 *
 * @alpha
 */
class TangibleEngineBrowser {
  /**
   * Creates an instance of the TangibleEngineBrowser client.
   *
   * @memberof TangibleEngineBrowser
   */
  constructor() {
    this.scaleFunction = (x, y) => {
      return { x: x, y: y };
    };
    this._hasWindow = typeof window !== 'undefined';
    if (this._hasWindow) {
      this._target = window;
    } else {
      console.error('Window not Available! A target is required to register touch events.');
      this._target = null;
    }
  }

  /**
   * Checks whether or not a browser window is available in the current context.
   * A browser window is required for registering touch event listeners.
   *
   * @readonly
   * @type {boolean}
   * @memberof TangibleEngineBrowser
   */
  get hasWindow() {
    return this._hasWindow;
  }
  /**
   * Returns whether or not the client is connected to the server.
   *
   * @readonly
   * @type {boolean}
   * @memberof TangibleEngineBrowser
   */
  get isConnected() {
    return this._isConnected;
  }
  /**
   * Function for Scale
   *
   * @public
   * @memberof TangibleEngineBrowser
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
   * @memberof TangibleEngineBrowser
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
   * @memberof TangibleEngineBrowser
   */
  get target() {
    return this._target;
  }
  /**
   * A list of touches created during TouchEvents.
   *
   * @public
   * @memberof TangibleEngineBrowser
   */
  get touches() {
    return this._touches;
  }
  set touches(value) {
    this._touches = value;
  }
  /**
   * Shuts down the TangibleEngineBrowser client. Removes registered touch event
   * listeners and closes the socket.
   *
   * @public
   * @memberof TangibleEngineBrowser
   */
  deInit() {
    this.unregisterTouchPoints();
    // this.client.end();
  }
  /**
   * Initialize the TangibleEngineBrowser client. Gets registered patterns from the
   * service, registers touch event listeners, and starts the touch update loop.
   *
   * @public
   * @memberof TangibleEngineBrowser
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
   * @memberof TangibleEngineBrowser
   */
  handleTouch(touchEvent) {
    this.touches = touchEvent.touches;
  }
  /**
   * Registers several touch event listeners on the specified DOM Element, or Window.
   *
   * @private
   * @memberof TangibleEngineBrowser
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
   * @memberof TangibleEngineBrowser
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
   * @memberof TangibleEngineBrowser
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
    this.write(payload);
   
    // Connect to the window to listen for events
    window.requestAnimationFrame(this.update.bind(this));
  }
  complete() {
    console.log ('The TEB has done it\'s job')
  }

  /**
   * Sends a formatted message to the Tangible Engine service via TCP.
   *
   * @private
   * @param {IPayload} payload - The message to send.
   * @memberof TangibleEngineBrowser
   */
  async write(payload) {
    if (!this.isWriting) {
      this.isWriting = true;
      try {
        // this.client.write(toBufferPayload(payload), 'utf8', () => (this.isWriting = false));
        const result = await window.electronAPI.updateTangibleEngine(payload);
        if ( result === 'done') this.isWriting = false;
        // console.log('write result ', result)
      } catch (error) {
        console.error(error);
      }
    }
  }
}

export { TangibleEngineBrowser };
