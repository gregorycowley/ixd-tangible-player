import React, { useState } from 'react';
import FlowerAnimation from '../student/TeaCeremony/FlowerAnimation.jsx';
import EventAudio from '../student/TeaCeremony/EventAudio.jsx';

const TouchMarker = () => {
  const [touches, setTouches] = useState([]);

  const markerStyle = {
    position: 'absolute',
    // left: '50%',
    // top: '50%',
    // width: '20px',
    // height: '20px',
    // backgroundColor: 'red',
    // borderRadius: '50%',
    // transform: 'translate(-50%, -50%)',
  };

  const handleTouch = (event) => {
    event.preventDefault();
    const newTouches = Array.from(event.touches).map((touch) => ({
      x: touch.clientX,
      y: touch.clientY,
      id: touch.identifier,
    }));

    // We only keep the two most recent touches
    const updatedTouches = [...touches, ...newTouches].slice(-2);
    setTouches(updatedTouches);
  };

  console.log('Touch Marker rerendering...');

  return (
    <div
      onTouchStart={handleTouch}
      onTouchMove={handleTouch}
      onTouchEnd={() => {}}
      style={{
        width: '100vw',
        height: '100vh',
        position: 'relative',
        backgroundColor: 'lightgray',
      }}>
      <EventAudio ui={false}></EventAudio>
      {touches.map((touch, index) => (
        <FlowerAnimation
          removeSelf={() => {}}
          pos={{ id: index, x: touch.x, y: touch.y }}
          duration="5000"
          season="spring"
          key={index}
          style={{
            position: 'absolute',
            left: `${touch.x}px`,
            top: `${touch.y}px`,
            width: '20px',
            height: '20px',
            backgroundColor: 'red',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
    </div>
  );
};

export default TouchMarker;
