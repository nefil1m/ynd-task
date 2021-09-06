import { render } from '@testing-library/react';
import { RepositoryCard } from './List';

describe('repository card', () => {
  it('should display empty state', async () => {
    const { asFragment } = render(
      <RepositoryCard
        id="repo1"
        name="Hello world"
        description="Description"
        stargazersCount="4"
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
