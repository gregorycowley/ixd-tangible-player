import React from 'react';

const Scaleable = ({ scale }) => {
  return (
    <div style={{ transform: `scale(${scale})`, transition: 'transform 0.2s', border: '1px solid black', margin: '10px', padding: '20px' }}>
      Component 1
    </div>
  );
};

export default Scaleable;
