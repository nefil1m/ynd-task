import { ReactElement } from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectUsers } from './usersSlice';

const Users = (): ReactElement => {
  const users = useAppSelector(selectUsers);

  return (
    <div>
      users:
      {JSON.stringify(users)}
    </div>
  );
};

export default Users;
