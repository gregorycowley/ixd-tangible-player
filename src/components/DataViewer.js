import React from 'react';

class DataViewer extends React.Component {
  render() {
    console.log('Rendering data viewer component');
    // Destructure the object passed as props
    const { dataObject } = this.props;

    return (
      <div>
        <h1>The data viewer</h1>
        {Object.entries(dataObject).map(([key, value], index) => (
          <div key={index}>
            <label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
            <input type="text" id={key} value={value} readOnly />
          </div>
        ))}
      </div>
    );
  }
}

export default DataViewer;
