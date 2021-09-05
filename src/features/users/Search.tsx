import { Form, Formik } from 'formik';
import { ReactElement, SetStateAction, Dispatch } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import { isNetworkError } from '../../lib/api';
import styles from './Search.module.scss';
import { searchUsers, selectUsersError } from './usersSlice';

interface Props {
  setQueryToDisplay: Dispatch<SetStateAction<string>>;
}

const UserSearch = ({ setQueryToDisplay }: Props): ReactElement => {
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

        setQueryToDisplay(q);

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
