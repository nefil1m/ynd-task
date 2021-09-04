import classNames from 'classnames';
import { ErrorMessage, Field } from 'formik';
import { ReactElement } from 'react';
import styles from './Input.module.scss';

interface Props {
  block?: boolean;
  className?: string;
  id?: string;
  name: string;
  placeholder?: string;
  type?: string;
}

const Input = ({
  name,
  id = name,
  className,
  type = 'text',
  block = false,
  placeholder,
}: Props): ReactElement => (
  <>
    <ErrorMessage name={name}>
      {(msg) => (msg && (
        <p className={styles.error}>{msg}</p>
      ))}
    </ErrorMessage>
    <Field
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      className={classNames(className, styles.input, {
        [styles.inputBlock]: block,
      })}
    />
  </>
);

export default Input;
