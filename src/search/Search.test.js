import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Search from './Search';
import * as mockResults from './mockResults.json';

const mockSearchResults = mockResults;

const server = setupServer(
    rest.get('https://pixabay.com/api', (req, res, ctx) => {
        return res(ctx.json(mockSearchResults));
    })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('renders input, dropdown, and search button', () => {
  render(<Search />);

  const inputEl = screen.getByRole('textbox');
  expect(inputEl).toBeInTheDocument();

  const buttonEl = screen.getAllByRole('button');
  expect(buttonEl[0]).toHaveTextContent('Category...');
  expect(buttonEl[1]).toHaveTextContent('Search');
});

test('renders 3 results when search is triggered', async() => {
    render(<Search />);

    fireEvent.click(screen.getByText('Search'));

    await waitFor(() => {
        const ResultImageEl = screen.getAllByTestId('result');

        //expect 3 search cards based on mock data
        expect(ResultImageEl.length).toBe(3);

        //looking for tags unique to each one
        expect(screen.getAllByText('flower').length).toBe(1);
        expect(screen.getAllByText('lein').length).toBe(1);
        expect(screen.getAllByText('cat').length).toBe(1);
    });
});

test('clicking result image adds to saved list', async() => {
    render(<Search />);

    fireEvent.click(screen.getByText('Search'));

    await waitFor(() => {
        screen.getAllByTestId('result');
    });

    // select image to save
    fireEvent.click(screen.getAllByTestId('result-image')[0]);

    // make sure saved image id and href matches up
    expect(screen.getAllByText('#195893').length).toBe(1);
    expect(screen.getAllByText('#195893')[0].getAttribute('href')).toBe('https://pixabay.com/get/ed6a99fd0a76647_1280.jpg');
});