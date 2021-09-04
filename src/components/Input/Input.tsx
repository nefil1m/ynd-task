import classNames from 'classnames';
import { ErrorMessage, Field } from 'formik';
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
  ...props
}: Props) => (
  <>
    <ErrorMessage name={name}>
      {(msg) => (
        <>
          {msg && (
            <p className={styles.error}>{msg}</p>
          )}
          <Field
            {...props}
            id={id}
            name={name}
            type={type}
            className={classNames(className, styles.input, {
              [styles.inputBlock]: block,
              [styles.inputError]: msg,
            })}
          />
        </>
      )}
    </ErrorMessage>
  </>
);

export default Input;