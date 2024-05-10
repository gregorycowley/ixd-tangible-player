import React, { useEffect, useRef } from 'react';
import springGIF from './assets/01_Spring.gif';
import summerGIF from './assets/02_Summer.gif';
import autumnGIF from './assets/03_Fall.gif';
import winterGIF from './assets/04_Winter.gif';

import PersistentGif from '../../PersistentGif.jsx';

function FlowerAnimation({ removeSelf, pos, duration, style, season = 'spring' }) {
  const ref = useRef(null);
  let gifAnimation = null;

  const animationStyle = {
    position: 'absolute',
    left: `${pos.x}px`,
    top: `${pos.y}px`,
    width: '20px',
    height: '20px',
    backgroundColor: 'red',
    borderRadius: '50%',
    transform: 'translate(-50%, -50%) scale(.05)',
  };

  useEffect(() => {
    // console.log('FlowerAnimation', pos, duration, style, season);
    switch (season.toUpperCase()) {
      case 'SPRING':
        gifAnimation = springGIF;
        break;
      case 'SUMMER':
        gifAnimation = summerGIF;
        break;
      case 'AUTUMN':
        gifAnimation = autumnGIF;
        break;
      case 'FALL':
        gifAnimation = autumnGIF;
        break;
      case 'WINTER':
        gifAnimation = winterGIF;
        break;
      case 'IDLE':
        gifAnimation = springGIF;
        break;
      default:
    }
    // console.log('PersistentGif : ', season, gifAnimation);
    // const timer = setTimeout(() => {
    //   removeSelf();
    //   ref.current.style.display = 'none';
    // }, duration); // Remove after 5 seconds
    // return () => clearTimeout(timer); // Cleanup the timerq
  }, [season]);
  // console.log('PersistentGif : ', season, gifAnimation);
  return (
    <div className="flower-animation" ref={ref} id={pos.id} key={pos.id} style={animationStyle}>
      {gifAnimation === null ? null : <PersistentGif src={gifAnimation} />}
    </div>
  );
}

export default FlowerAnimation;
