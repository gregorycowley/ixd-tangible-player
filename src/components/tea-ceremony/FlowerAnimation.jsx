import React, { useEffect, useRef } from 'react';
import springGIF from './assets/01_Spring.gif';
import summerGIF from './assets/02_Summer.gif';
import autumnGIF from './assets/03_Fall.gif';
import winterGIF from './assets/04_Winter.gif';

function FlowerAnimation({ removeSelf, pos, duration, style, season = 'spring' }) {
  const ref = useRef(null);

  // console.log('FlowerAnimation', pos, duration, style, season);
  switch (season.toUpperCase()) {
    case 'SPRING':
      var gifAnimation = springGIF;
      break;
    case 'SUMMER':
      var gifAnimation = summerGIF;
      break;
    case 'AUTUMN':
      var gifAnimation = autumnGIF;
      break;
    case 'FALL':
      var gifAnimation = autumnGIF;
      break;
    case 'WINTER':
      var gifAnimation = winterGIF;
      break;
    default:
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      removeSelf();
      ref.current.style.display = 'none';
    }, duration); // Remove after 5 seconds

    return () => clearTimeout(timer); // Cleanup the timer
  }, [removeSelf, duration]);

  console.log('FlowerAnimation', pos, season);

  return (
    <div ref={ref} id={pos.id} key={pos.id} style={style}>
      <img src={gifAnimation} />
    </div>
  );
}

export default FlowerAnimation;
