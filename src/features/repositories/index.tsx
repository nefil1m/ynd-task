import { ReactElement, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import RepositoryList from './List';
import {
  fetchRepositories, isUserRepositoriesLoading,
  selectUserRepositories,
} from './repositoriesSlice';

interface Props {
  username: string;
}

const Repositories = ({ username }: Props): ReactElement | null => {
  const repositories = useAppSelector(selectUserRepositories(username));
  const isLoading = useAppSelector(isUserRepositoriesLoading(username));
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function get() {
      await dispatch(fetchRepositories(username));
    }

    get();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (repositories.length
    ? <RepositoryList repositories={repositories} />
    : <p>User has no public repositories</p>
  );
};

export default Repositories;
