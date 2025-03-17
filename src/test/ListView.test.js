import React from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {MemoryRouter} from 'react-router-dom';
import ListView from '../components/ListView';
import {fetchData} from '../store/features/blogs/blogsSlice';

jest.mock('../store/features/blogs/blogsSlice', () => ({
  fetchData: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

const mockStore = configureStore([]);

describe('ListView Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      data: {items: [{id: 1, title: 'Test Item'}], status: 'succeeded'},
    });
    store.dispatch = jest.fn();
  });

  test('renders ListView and dispatches fetchData', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ListView />
        </MemoryRouter>
      </Provider>
    );

    expect(store.dispatch).toHaveBeenCalledWith(fetchData());
    expect(await screen.findByText('Test Item')).toBeInTheDocument();
  });
  test('filters items based on search input', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ListView />
        </MemoryRouter>
      </Provider>
    );

    const input = screen.getByPlaceholderText('Search by title...');
    fireEvent.change(input, {target: {value: 'Nonexistent'}});

    await waitFor(() => {
      expect(screen.queryByText('Test Item')).not.toBeInTheDocument();
    });
  });
});
