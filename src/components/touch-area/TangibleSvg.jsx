import React from 'react';

const TangibleSvg = ({ props }) => {
  // console.log('TangibleSvg Props: ', Object.values(props));
  const { id: _id, x: _x, y: _y, r: _r } = props;
  const puckStyle = {
    fontFamily: 'Sans-Serif',
    position: 'absolute',
    top: `${_y}px`,
    left: `${_x}px`,
    textAnchor: 'middle',
  };
  const cls1 = {
    fill: '#fff',
    opacity: '1',
    fontSize: '83.73px',
  };
  const cls2 = {
    fontSize: '24px',
    fill: '#fff',
    opacity: '.8',
  };
  const cls3 = {
    fill: '#ffffff',
    strokeWidth: '0px',
    opacity: '.5',
  };
  const cls4 = {
    fill: '#fff',
    opacity: '.6',
    fontSize: '20px',
  };
  const cls5 = {
    fill: '#ffb900',
    strokeWidth: '0px',
  };

  return (
    <svg
      id="Layer_2"
      width="212"
      height="212"
      style={puckStyle}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 263.62 263.62">
      <g id="Layer_1-2">
        <circle style={cls5} cx="131.81" cy="131.81" r="131.81" />
        <text x="50%" style={cls1} transform="translate(0 165.72)">
          {_id}
        </text>
        <text x="50%" style={cls2} transform="translate(0 94.46)">
          {_r.toFixed(2)}
        </text>
        <text x="50%" style={cls4} transform="translate(0 210)">
          {_x.toFixed(2)},{_y.toFixed(2)}
        </text>
        <circle style={cls3} cx="131.81" cy="43.94" r="18.7" />
        <circle style={cls3} cx="55.71" cy="175.75" r="18.7" />
        <circle style={cls3} cx="207.91" cy="175.75" r="18.7" />
      </g>
    </svg>
  );
};

export default TangibleSvg;
