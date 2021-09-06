import {
  fireEvent,
  render,
  act,
  waitForElement,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import Users from '.';

describe('user search form', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('should search users', async () => {
    fetch.mockResponseOnce(JSON.stringify({
      items: [{ id: 'user-1', login: 'nickname1' }],
    }));
    const { getByPlaceholderText, getByText, getByTestId } = render(
      <Provider store={store}>
        <Users />
      </Provider>,
    );

    act(() => {
      fireEvent.change(
        getByPlaceholderText('Enter username'),
        { target: { value: 'nickname' } },
      );
    });

    act(() => {
      fireEvent.click(getByText('Search'));
    });

    await waitForElement(() => getByTestId('users-list'));

    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual(
      'https://api.github.com/search/users?q=nickname&per_page=5',
    );
  });

  it('should display users', async () => {
    fetch.mockResponseOnce(JSON.stringify({
      items: [{
        id: 'user-1',
        login: 'nickname1',
      }, {
        id: 'user-2',
        login: 'nickname2',
      }],
    }));
    const { getByPlaceholderText, getByText, getByTestId } = render(
      <Provider store={store}>
        <Users />
      </Provider>,
    );

    act(() => {
      fireEvent.change(
        getByPlaceholderText('Enter username'),
        { target: { value: 'nickname' } },
      );
    });

    act(() => {
      fireEvent.click(getByText('Search'));
    });

    await waitForElement(() => getByTestId('users-list'));

    expect(getByText('nickname1')).toBeInTheDocument();
    expect(getByText('nickname2')).toBeInTheDocument();
  });

  it('should display network error', async () => {
    fetch.mockResponseOnce('{}', {
      status: 500,
    });
    const { getByPlaceholderText, getByText, getByTestId } = render(
      <Provider store={store}>
        <Users />
      </Provider>,
    );

    act(() => {
      fireEvent.change(
        getByPlaceholderText('Enter username'),
        { target: { value: 'nickname' } },
      );
    });

    act(() => {
      fireEvent.click(getByText('Search'));
    });

    await waitForElement(() => getByTestId('users-list'));

    expect(getByText('There was an error when trying to fetch users.')).toBeInTheDocument();
  });

  it('should display empty state', async () => {
    fetch.mockResponseOnce(JSON.stringify({ items: [] }));
    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <Users />
      </Provider>,
    );

    act(() => {
      fireEvent.change(
        getByPlaceholderText('Enter username'),
        { target: { value: 'nickname' } },
      );
    });

    act(() => {
      fireEvent.click(getByText('Search'));
    });

    await waitForElement(() => getByText('No results.'));
  });

  it('should validation error', async () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        errors: [{
          field: 'q',
          message: 'Invalid q value',
        }],
      }),
      { status: 422 },
    );
    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <Users />
      </Provider>,
    );

    act(() => {
      fireEvent.change(
        getByPlaceholderText('Enter username'),
        { target: { value: 'nickname' } },
      );
    });

    act(() => {
      fireEvent.click(getByText('Search'));
    });

    await waitForElement(() => getByText('Invalid q value'));
  });

  it('should display current query', async () => {
    fetch.mockResponseOnce(JSON.stringify({
      items: [{ id: 'user-1', login: 'my-search123' }],
    }));
    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <Users />
      </Provider>,
    );

    act(() => {
      fireEvent.change(
        getByPlaceholderText('Enter username'),
        { target: { value: 'my-search' } },
      );
    });

    act(() => {
      fireEvent.click(getByText('Search'));
    });

    await waitForElement(() => getByText('Showing users for "my-search"'));
  });
});
