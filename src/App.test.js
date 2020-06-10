import React from 'react';
import { render, screen} from '@testing-library/react';
import App from './App';

test('renders search element', () => {
  render(<App />);
  const SearchEl = screen.getAllByTestId('search');
  expect(SearchEl[0]).toBeInTheDocument();
});
