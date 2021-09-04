import classNames from 'classnames';
import { ReactElement } from 'react';
import styles from './Button.module.scss';

enum ButtonVariant {
  PRIMARY = 'Primary',
}

interface Props {
  block?: boolean;
  children: string | ReactElement;
  className?: string;
  disabled?: boolean;
  type?: 'submit' | 'button' | 'reset';
  variant?: ButtonVariant;
}

const Button = ({
  block,
  children,
  className,
  disabled,
  type = 'button',
  variant = ButtonVariant.PRIMARY,
}: Props): ReactElement => (
  <button
    disabled={disabled}
    className={classNames(className, styles.button, styles[`button${variant}`], {
      [styles.buttonBlock]: block,
    })}
    // eslint-disable-next-line react/button-has-type
    type={type}
  >
    {children}
  </button>
);

export default Button;
