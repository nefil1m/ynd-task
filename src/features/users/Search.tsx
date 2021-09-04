import { Form, Formik } from 'formik';
import { ReactElement } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import { isNetworkError } from '../../lib/api';
import styles from './Search.module.css';
import { searchUsers, selectUsersError } from './usersSlice';

const UserSearch = (): ReactElement => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectUsersError);

  return (
    <Formik
      initialValues={{ q: '' }}
      onSubmit={async ({ q }, actions) => {
        await dispatch(searchUsers({
          queryString: q,
          setErrors: actions.setErrors,
        }));

        actions.setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Input name="q" placeholder="Enter username" block />
          <Button className={styles.button} block type="submit" disabled={isSubmitting}>
            Search
          </Button>
          {isNetworkError(error) && (
            <p className={styles.error}>There was an error when trying to fetch users.</p>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default UserSearch;
