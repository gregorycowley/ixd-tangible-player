import React from 'react';
import { render } from '@testing-library/react';
import AppContainer from './AppContainer';

describe('AppContainer', () => {
  it('renders without crashing', () => {
    render(<AppContainer />);
  });
});
