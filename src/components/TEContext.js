import React, { createContext } from 'react';
// import { EventEmitter } from 'events';
import eventEmitter from './EventManager';

// import TangibleEngineAdapter from '../tangible-engine/TangibleEngineAdapter.js';
// const te = new TangibleEngineAdapter(4949, '');
class TEContextClass extends React.Component {
  constructor(props) {
    super(props);
    // this.listeners = [];
    // this.emitter = new EventEmitter();
  }

  run() {
    console.log('TEContext :: run');
  }

  stop() {
    console.log('TEContext :: stop');
  }

  // addLisenter(listener) {
  //   listeners.push(listener);
  // }

  setSeason(season) {
    console.log('TEContext :: setSeason', season);
    eventEmitter.emit('seasonChange', season);
    // this.listeners.forEach((listener) => {
    //   listener.onSeasonChange(season);
    // });
  }
}

const te = new TEContextClass();

export const TEContext = createContext(te);
