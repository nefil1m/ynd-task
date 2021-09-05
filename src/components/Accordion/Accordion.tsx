import classNames from 'classnames';
import {
  createContext,
  ReactNode,
  ReactElement,
  useContext,
  useState,
} from 'react';
import styles from './Accordion.module.scss';

const CarretIcon = () => (
  <svg viewBox="0 0 1024 574" width="20" height="20px">
    <path d="M1015 10q-10-10-23-10t-23 10L512 492 55 10Q45 0 32 0T9 10Q0 20 0 34t9 24l480 506q10 10 23 10t23-10l480-506q9-10 9-24t-9-24z" />
  </svg>
);

interface AccordionContext {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

const noop = () => undefined;

const Context = createContext<AccordionContext>({
  isOpen: false,
  open: noop,
  close: noop,
  toggle: noop,
});

interface AccordionToggleProps {
  children: ReactNode;
}

const AccordionToggle = ({ children }: AccordionToggleProps): ReactElement => {
  const { toggle, isOpen } = useContext(Context);

  return (
    <header>
      <button
        onClick={toggle}
        type="button"
        className={styles.toggleButton}
      >
        {children}
        <span
          className={classNames(styles.carretIcon, {
            [styles.carretIconOpen]: isOpen,
          })}
        >
          <CarretIcon />
        </span>
      </button>
    </header>
  );
};

interface AccordionContentProps {
  children: ReactNode;
}

const AccordionContent = ({ children }: AccordionContentProps): ReactElement | null => {
  const { isOpen } = useContext(Context);

  return isOpen
    ? children as ReactElement
    : null;
};

interface AccordionProps {
  children: ReactNode;
}

const Accordion = ({ children }: AccordionProps): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => {
    setIsOpen(true);
  };
  const close = () => {
    setIsOpen(false);
  };
  const toggle = () => (isOpen ? close() : open());

  return (
    <Context.Provider
      value={{
        open,
        close,
        toggle,
        isOpen,
      }}
    >
      <article>
        {children}
      </article>
    </Context.Provider>
  );
};

export {
  Accordion,
  AccordionToggle,
  AccordionContent,
};
