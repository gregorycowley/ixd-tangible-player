import React, { createContext } from 'react';
import eventEmitter from './EventManager';

class TEContextAltClass extends React.Component {
  constructor(props) {
    super(props);
  }

  run() {
    console.log('TEContext :: run');
  }

  stop() {
    console.log('TEContext :: stop');
  }

  setSeason(season) {
    console.log('TEContext :: setSeason', season);
    eventEmitter.emit('seasonChange', season);
  }

  update(puckData) {
    console.log('TEContext :: update ', puckData);
    eventEmitter.emit('update', puckData);
  }
}

const te = new TEContextAltClass();

export const TEContextAlt = createContext(te);
