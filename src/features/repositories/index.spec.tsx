import { render, waitForElement } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import Repositories from '.';

describe('repositories list', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('should display empty state', async () => {
    fetch.mockResponseOnce(JSON.stringify([]));
    const { getByText } = render(
      <Provider store={store}>
        <Repositories username="user1" />
      </Provider>,
    );

    await waitForElement(() => getByText('User has no public repositories'));
  });

  it('should display repositories list', async () => {
    fetch.mockResponseOnce(JSON.stringify([{
      id: 'repo-1',
      name: 'Bootcamp app',
      description: 'desc',
      stargazers_count: 3,
    }, {
      id: 'repo-2',
      name: 'Hello world',
      description: null,
      stargazers_count: 15,
    }]));
    const { queryAllByTestId } = render(
      <Provider store={store}>
        <Repositories username="user1" />
      </Provider>,
    );

    await waitForElement(() => queryAllByTestId('repository-card'));

    expect(queryAllByTestId('repository-card')).toHaveLength(2);
  });
});
