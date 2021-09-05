import { ReactElement } from 'react';
import { Repository } from './repositoriesSlice';

interface Props {
  repositories: Repository[];
}

const RepositoryList = ({ repositories }: Props): ReactElement => (
  <ul>
    {repositories.map(({ name, title, id }) => (
      <li key={id}>
        {name}
        {title}
      </li>
    ))}
  </ul>
);

export default RepositoryList;
