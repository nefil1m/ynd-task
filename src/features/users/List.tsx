import { ReactElement } from 'react';
import { useAppSelector } from '../../app/hooks';
import { Accordion, AccordionContent, AccordionToggle } from '../../components/Accordion/Accordion';
import { selectUsers, User } from './usersSlice';
import styles from './List.module.scss';

const RepositoryList = () => (
  <div>repos</div>
);

const UserAccordion = ({ login }: User) => (
  <Accordion>
    <AccordionToggle>
      {login}
    </AccordionToggle>
    <AccordionContent>
      <RepositoryList />
    </AccordionContent>
  </Accordion>
);

const Users = (): ReactElement => {
  const users = useAppSelector(selectUsers);

  return (
    <div>
      <ul className={styles.list}>
        {users.map(({ id, login }) => (
          <li key={id}>
            <UserAccordion
              id={id}
              login={login}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
