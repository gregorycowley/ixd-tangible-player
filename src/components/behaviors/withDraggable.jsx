import React, { useState, useCallback, useRef } from 'react';

function withDraggable(WrappedComponent) {
  return ({ src, ...props }) => {

    console.log('withDraggable', WrappedComponent);

    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const ref = useRef();

    // This callback initializes the dragging process
    const onMouseDown = useCallback((event) => {
      setIsDragging(true);
      ref.current = {
        offsetX: event.clientX - position.x,
        offsetY: event.clientY - position.y,
      };
    }, [position]);

    // This callback calculates the new position of the component as it's being dragged
    const onMouseMove = useCallback((event) => {
      console.log('onMouseMove');
      if (isDragging) {
        const x = event.clientX - ref.current.offsetX;
        const y = event.clientY - ref.current.offsetY;
        setPosition({ x, y });
      }
    }, [isDragging]);

    // This callback ends the dragging process
    const onMouseUp = useCallback(() => {
      console.log('onMouseUp');
      setIsDragging(false);
    }, []);

    // Inline styles for the draggable component
    const styles = {
      position: 'absolute',
      left: `${position.x}px`,
      top: `${position.y}px`,
      cursor: isDragging ? 'grabbing' : 'grab',
      userSelect: 'none', // Prevents the browser from performing text selection during drag
      width: '100px',
      height: '100px',
      backgroundColor: '#4CAF50', // Just a placeholder color
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      borderRadius: '5px'
    };

    return (
      <WrappedComponent
        style={styles}
        {...props}
        onMouseDown={onMouseDown}
        onMouseMove={isDragging ? onMouseMove : null}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp} // Ends drag when the mouse leaves the element area
      >
            Drag Me!
      </WrappedComponent>
    );
  };
}

export default withDraggable;


// // This HOC takes a component and returns a new component with draggable functionality
// const withDraggable = (Component) => {

//   // Return a new component
//   return class extends React.Component {
//     constructor(props) {
//       super(props);
//       this.dragRef = React.createRef(); // Create a ref for the draggable element
//     }

//     componentDidMount() {
//       const node = this.dragRef.current;
//       node.setAttribute('draggable', true); // Set the draggable attribute

//       // Define drag start event
//       node.addEventListener('dragstart', (event) => {
//         event.dataTransfer.setData('text/plain', 'This text could be the ID or any data');
//         // Set some data to be dragged - can be ID or any other identifier
//       });

//       // Optionally, you can handle the drag end to do some cleanup or actions
//       node.addEventListener('dragend', (event) => {
//         // You can handle what happens on drag end
//       });
//     }

//     render() {
//       // Use spread operator to pass all props to the wrapped component
//       return <div ref={this.dragRef}><Component {...this.props} /></div>;
//     }
//   };
// };

