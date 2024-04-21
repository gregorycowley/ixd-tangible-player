import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import Rotatable from '../../components/behaviors/Rotatable.jsx'; // Update this import path to your actual file path

xdescribe('Rotatable', () => {
  afterEach(cleanup);

  it('renders without crashing', () => {
    render(<Rotatable updateHandler={() => {}} />);
  });

  it('calls updateHandler with new angle when rotated', () => {
    const updateHandler = jest.fn();
    const { getByTestId } = render(<Rotatable updateHandler={updateHandler} />);
    const rotatable = getByTestId('rotatable-behavior');

    act(() => {
      fireEvent.mouseDown(rotatable, { clientX: 50, clientY: 50 });
      fireEvent.mouseMove(rotatable, { clientX: 100, clientY: 100 });
      fireEvent.mouseUp(rotatable);
    });

    expect(updateHandler).toHaveBeenCalled();
  });

  it('does not call updateHandler when not dragging', () => {
    const updateHandler = jest.fn();
    const { getByTestId } = render(<Rotatable updateHandler={updateHandler} />);
    const rotatable = getByTestId('rotatable-behavior');

    act(() => {
      fireEvent.mouseMove(rotatable, { clientX: 100, clientY: 100 });
    });

    expect(updateHandler).not.toHaveBeenCalled();
  });

  it('stops updating angle after mouse up', () => {
    const updateHandler = jest.fn();
    const { getByTestId } = render(<Rotatable updateHandler={updateHandler} />);
    const rotatable = getByTestId('rotatable-behavior');

    act(() => {
      fireEvent.mouseDown(rotatable, { clientX: 50, clientY: 50 });
      fireEvent.mouseMove(rotatable, { clientX: 100, clientY: 100 });
      fireEvent.mouseUp(rotatable);
      fireEvent.mouseMove(rotatable, { clientX: 150, clientY: 150 });
    });

    expect(updateHandler).toHaveBeenCalledTimes(1);
  });
});
