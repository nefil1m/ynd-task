import { ReactElement } from 'react';
import { Accordion, AccordionContent, AccordionToggle } from '../../components/Accordion/Accordion';
import Repositories from '../repositories';
import { User } from './usersSlice';
import styles from './List.module.scss';

const UserAccordion = ({ login }: User) => (
  <Accordion>
    <AccordionToggle>
      {login}
    </AccordionToggle>
    <AccordionContent>
      <Repositories username={login} />
    </AccordionContent>
  </Accordion>
);

interface UsersListProps {
  users: User[];
}

const UsersList = ({ users }: UsersListProps): ReactElement => (
  <div data-testid="users-list">
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

export default UsersList;
