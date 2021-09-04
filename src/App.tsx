import React from 'react';
import styles from './App.module.css';
import Users from './features/users/List';
import UserSearch from './features/users/Search';

function App(): React.ReactElement {
  return (
    <div className={styles.app}>
      <UserSearch />
      <Users />
    </div>
  );
}

export default App;
