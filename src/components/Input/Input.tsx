import classNames from 'classnames';
import { Field } from 'formik';
import styles from './Input.module.scss';

interface Props extends Partial<HTMLInputElement> {
  name: string;
  block?: boolean;
}

const Input = ({
  name,
  id = name,
  className,
  type = 'text',
  block = false,
  ...props
}: Props) => (
  <Field
    {...props}
    id={id}
    name={name}
    type={type}
    className={classNames(className, styles.input, {
      [styles.inputBlock]: block,
    })}
  />
);

export default Input;