import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import Ide from './component/ide/ide';


test('renders learn react link', () => {
  render(<Ide />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
