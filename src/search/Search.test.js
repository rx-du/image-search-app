import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import Search from './Search';

const mockSearchResults = {
    "total": 4692,
    "totalHits": 500,
    "hits": [
        {
            "id": 195893,
            "pageURL": "https://pixabay.com/en/blossom-bloom-flower-195893/",
            "type": "photo",
            "tags": "blossom, bloom, flower",
            "previewURL": "https://cdn.pixabay.com/photo/2013/10/15/09/12/flower-195893_150.jpg",
            "previewWidth": 150,
            "previewHeight": 84,
            "webformatURL": "https://pixabay.com/get/35bbf209e13e39d2_640.jpg",
            "webformatWidth": 640,
            "webformatHeight": 360,
            "largeImageURL": "https://pixabay.com/get/ed6a99fd0a76647_1280.jpg",
            "fullHDURL": "https://pixabay.com/get/ed6a9369fd0a76647_1920.jpg",
            "imageURL": "https://pixabay.com/get/ed6a9364a9fd0a76647.jpg",
            "imageWidth": 4000,
            "imageHeight": 2250,
            "imageSize": 4731420,
            "views": 7671,
            "downloads": 6439,
            "favorites": 1,
            "likes": 5,
            "comments": 2,
            "user_id": 48777,
            "user": "Josch13",
            "userImageURL": "https://cdn.pixabay.com/user/2013/11/05/02-10-23-764_250x250.jpg",
        },
        {
            "id": 5265194,
            "pageURL": "https://pixabay.com/photos/lein-staudenlein-blue-flax-flower-5265194/",
            "type": "photo",
            "tags": "lein, staudenlein, blue flax,",
            "previewURL": "https://cdn.pixabay.com/photo/2020/06/06/04/20/lein-5265194_150.jpg",
            "previewWidth": 150,
            "previewHeight": 100,
            "webformatURL": "https://pixabay.com/get/53e2d3464b5ba814f1dc84609629347f1639dae7524c704c7c2e73d49544c55f_640.jpg",
            "webformatWidth": 640,
            "webformatHeight": 427,
            "largeImageURL": "https://pixabay.com/get/53e2d3464b5ba814f6da8c7dda79367d143cd8e151506c4870267adc974fcc58bf_1280.jpg",
            "fullHDURL": "https://pixabay.com/get/768dsf8dv8ew_1920.jpg",
            "imageURL": "https://pixabay.com/get/768dsf8dv8ew.jpg",
            "imageWidth": 6240,
            "imageHeight": 4160,
            "imageSize": 5132057,
            "views": 8681,
            "downloads": 7776,
            "favorites": 25,
            "likes": 75,
            "comments": 68,
            "user_id": 10327513,
            "user": "NickyPe",
            "userImageURL": "https://cdn.pixabay.com/user/2020/06/08/09-39-40-606_250x250.jpg",
        },
        {
            "id": 2083492,
            "pageURL": "https://pixabay.com/photos/cat-young-animal-curious-wildcat-2083492/",
            "type": "photo",
            "tags": "cat, young animal, curious",
            "previewURL": "https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492_150.jpg",
            "previewWidth": 150,
            "previewHeight": 91,
            "webformatURL": "https://pixabay.com/get/54e0dd404e5bae14f1dc84609629347f1639dae7524c704c7c2e73d4964ac05a_640.jpg",
            "webformatWidth": 640,
            "webformatHeight": 390,
            "largeImageURL": "https://pixabay.com/get/54e0dd404e5bae14f6da8c7dda79367d143cd8e151506c4870267adc974cc25dba_1280.jpg",
            "fullHDURL": "https://pixabay.com/get/ed6a9369fd0a76647_1920.jpg",
            "imageURL": "https://pixabay.com/get/ed6a9364a9fd0a76647.jpg",
            "imageWidth": 4928,
            "imageHeight": 3008,
            "imageSize": 4130948,
            "views": 485377,
            "downloads": 244038,
            "favorites": 1314,
            "likes": 1470,
            "comments": 178,
            "user_id": 1777190,
            "user": "susannp4",
            "userImageURL": "https://cdn.pixabay.com/user/2015/12/16/17-56-55-832_250x250.jpg",
        }
    ]
};

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