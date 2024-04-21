import { render, fireEvent, cleanup } from '@testing-library/react';
// import { act } from 'react-dom/test-utils';
import net from 'net';
import TEConnect from './TEConnect.js';

// jest.mock(net);

xdescribe('TEConnect', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('initializes the TEConnect client', () => {
    const client = new TEConnect();
    client.getPatterns = jest.fn();
    client.registerTouchPoints = jest.fn();
    window.requestAnimationFrame = jest.fn();

    client.init();

    expect(client.getPatterns).toHaveBeenCalled();
    expect(client.registerTouchPoints).toHaveBeenCalled();
    expect(window.requestAnimationFrame).toHaveBeenCalledWith(expect.any(Function));
  });

  it('shuts down the TEConnect client', () => {
    const client = new TEConnect();
    client.unregisterTouchPoints = jest.fn();
    client.client.end = jest.fn();

    client.deInit();

    expect(client.unregisterTouchPoints).toHaveBeenCalled();
    expect(client.client.end).toHaveBeenCalled();
  });

  it('registers touch event listeners', () => {
    const client = new TEConnect();
    client.target = document.createElement('div');
    client.handleTouch = jest.fn();

    client.registerTouchPoints();

    fireEvent.touchend(client.target);
    fireEvent.touchmove(client.target);
    fireEvent.touchstart(client.target);

    expect(client.handleTouch).toHaveBeenCalledTimes(3);
  });

  it('unregisters touch event listeners', () => {
    const client = new TEConnect();
    client.target = document.createElement('div');
    client.handleTouch = jest.fn();

    client.unregisterTouchPoints();

    fireEvent.touchend(client.target);
    fireEvent.touchmove(client.target);
    fireEvent.touchstart(client.target);

    expect(client.handleTouch).not.toHaveBeenCalled();
  });

  it('sends touch points to the server for evaluation', () => {
    const client = new TEConnect();
    client.touches = [
      { identifier: 1, clientX: 100, clientY: 100 },
      { identifier: 2, clientX: 200, clientY: 200 },
    ];
    client.scaleFunction = jest
      .fn()
      .mockReturnValueOnce({ x: 0.5, y: 0.5 })
      .mockReturnValueOnce({ x: 1, y: 1 });
    client.write = jest.fn();
    window.requestAnimationFrame = jest.fn();

    client.update();

    expect(client.write).toHaveBeenCalledWith({
      POINTERS: [
        { Id: 1, X: 0.5, Y: 0.5 },
        { Id: 2, X: 1, Y: 1 },
      ],
      Type: 'Update',
    });
    expect(window.requestAnimationFrame).toHaveBeenCalledWith(expect.any(Function));
  });

  // Add more tests for other methods and properties of the TEConnect class
});
