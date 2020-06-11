import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchCard from './SearchCard';
import * as mockResults from './mockResults.json';

const mockSearchResult = mockResults.hits[0];

test('search card renders based on props', () => {
    render(<SearchCard result={mockSearchResult} />);

    // tags
    expect(screen.getAllByText('blossom').length).toBe(1);
    expect(screen.getAllByText('bloom').length).toBe(1);
    expect(screen.getAllByText('flower').length).toBe(1);

    // likes
    expect(screen.getAllByText('590').length).toBe(1);

    // favorites
    expect(screen.getAllByText('135').length).toBe(1);

    // main image + likes 'thumbs_up' + favorite 'star'
    expect(screen.getAllByRole('img').length).toBe(3);
});