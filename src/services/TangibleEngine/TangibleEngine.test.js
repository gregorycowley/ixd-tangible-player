import { EventEmitter } from 'events';
import { TangibleEngine } from './TangibleEngine';

xdescribe('TangibleEngine', () => {
  let tangibleEngine;

  beforeEach(() => {
    tangibleEngine = new TangibleEngine(1234, '127.0.0.1');
  });

  afterEach(() => {
    tangibleEngine = null;
  });

  it('should inherit from EventEmitter', () => {
    expect(tangibleEngine instanceof EventEmitter).toBe(true);
  });

  it('should initialize with the provided port and IP', () => {
    expect(tangibleEngine.port).toBe(1234);
    expect(tangibleEngine.ip).toBe('127.0.0.1');
  });

  it('should emit a "status" event with "Initialized" message', (done) => {
    tangibleEngine.on('status', (status) => {
      expect(status).toBe('Initialized');
      done();
    });
  });

  it('should have a start method that calls the "run" method of the TangibleEngineMock instance', () => {
    tangibleEngine.te = {
      run: jest.fn(),
    };

    tangibleEngine.start();

    expect(tangibleEngine.te.run).toHaveBeenCalled();
  });

  it('should have a puckIdentity method that returns an array with puckId, patternId, and pointerIds', () => {
    const result = tangibleEngine.puckIdentity(1, 2, [3, 4]);

    expect(result).toEqual([{ Id: 1 }, { PatternId: 2 }, { PointerIds: [3, 4] }]);
  });

  it('should have a puckOffset method that returns an array with x and y offsets', () => {
    const result = tangibleEngine.puckOffset(10, 20);

    expect(result).toEqual([{ x: 10 }, { y: 20 }]);
  });

  it('should have a puckName method that returns an object with the provided name', () => {
    const result = tangibleEngine.puckName('Puck1');

    expect(result).toEqual({ Name: 'Puck1' });
  });

  it('should have a puckStatus method that returns an object with the provided status', () => {
    const result = tangibleEngine.puckStatus('active');

    expect(result).toEqual({ Status: 'active' });
  });

  it('should have a puckRMS method that returns an object with the provided RMS value', () => {
    const result = tangibleEngine.puckRMS(0.5);

    expect(result).toEqual({ RMSNormalized: 0.5 });
  });

  it('should have a puckPosition method that returns an array with x and y positions', () => {
    const result = tangibleEngine.puckPosition(100, 200);

    expect(result).toEqual([{ x: 100 }, { y: 200 }]);
  });

  it('should have a puckRotation method that returns an object with the provided rotation value', () => {
    const result = tangibleEngine.puckRotation(90);

    expect(result).toEqual({ R: 90 });
  });

  it('should have a run method that creates a TangibleEngineMock instance and calls its "run" method', () => {
    tangibleEngine.te = {
      run: jest.fn(),
      on: jest.fn(),
    };

    tangibleEngine.run();

    expect(tangibleEngine.te.run).toHaveBeenCalled();
    expect(tangibleEngine.te.on).toHaveBeenCalledWith('update', expect.any(Function));
  });

  it('should emit an "update" event when the TangibleEngineMock instance emits an "update" event', (done) => {
    tangibleEngine.on('update', (response) => {
      expect(response).toEqual({ test: 'data' });
      done();
    });

    tangibleEngine.update({ test: 'data' });
  });

  it('should have a scaleFunc method that returns an object with the provided x and y values', () => {
    const result = tangibleEngine.scaleFunc(0.5, 0.5);

    expect(result).toEqual({ x: 0.5, y: 0.5 });
  });

  it('should have a mapToObject method that converts receivedData into the expected format', () => {
    const receivedData = {
      pucks: [
        {
          puck1: [{ Id: 1 }, { PatternId: 2 }, { PointerIds: [3, 4] }],
        },
        {
          puck2: [{ Id: 5 }, { PatternId: 6 }, { PointerIds: [7, 8] }],
        },
      ],
      length: 2,
    };

    const result = tangibleEngine.mapToObject(receivedData);

    expect(result).toEqual({
      pucks: [
        { Id: 1, PatternId: 2, PointerIds: [3, 4] },
        { Id: 5, PatternId: 6, PointerIds: [7, 8] },
      ],
      length: 2,
      timestamp: expect.any(Date),
    });
  });
});
