import React, { createContext } from 'react';
import eventEmitter from './EventManager';

class TEContextClass extends React.Component {
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

  setSeupdateason(season) {
    console.log('TEContext :: setSeason', season);
    eventEmitter.emit('update', season);
  }
}

const te = new TEContextClass();

export const TEContext = createContext(te);
