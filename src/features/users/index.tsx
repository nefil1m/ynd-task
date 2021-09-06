import React, { ReactElement, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import UsersList from './List';
import UserSearch from './Search';
import { selectUsers } from './usersSlice';

const Users = (): ReactElement => {
  const [queryToDisplay, setQueryToDisplay] = useState('');
  const users = useAppSelector(selectUsers);

  return (
    <>
      <UserSearch setQueryToDisplay={setQueryToDisplay} />
      {queryToDisplay && !!users.length && (
        <p>
          Showing users for &quot;
          {queryToDisplay}
          &quot;
        </p>
      )}
      {users.length
        ? <UsersList users={users} />
        : (queryToDisplay && <p>No results.</p>)}
    </>
  );
};

export default Users;
