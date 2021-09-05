import React from 'react';
import styles from './App.module.css';
import Users from './features/users';

function App(): React.ReactElement {
  return (
    <div className={styles.app}>
      <Users />
    </div>
  );
}

export default App;
