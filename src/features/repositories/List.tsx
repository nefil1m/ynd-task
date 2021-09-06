import { ReactElement } from 'react';
import { Repository } from './repositoriesSlice';
import styles from './List.module.scss';

const StarIcon = () => (
  <svg viewBox="0 0 512 512">
    <polygon strokeWidth="37.6152" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" points="259.216,29.942 330.27,173.919 489.16,197.007 374.185,309.08 401.33,467.31 259.216,392.612 117.104,467.31 144.25,309.08   29.274,197.007 188.165,173.919" />
  </svg>
);

export const RepositoryCard = ({
  name,
  description,
  stargazersCount,
}: Repository): ReactElement => (
  <article className={styles.repositoryCard} data-testid="repository-card">
    <header className={styles.repositoryCardHeader}>
      <span className={styles.repositoryCardTitle}>{name}</span>
      <span className={styles.repositoryCardStars}>
        {stargazersCount}
        <StarIcon />
      </span>
    </header>
    <p>
      {description?.length > 75
        ? `${description.substring(0, 75)}...`
        : description}
    </p>
  </article>
);

interface RepositoryListProps {
  repositories: Repository[];
}

const RepositoryList = ({ repositories }: RepositoryListProps): ReactElement => (
  <ul className={styles.list}>
    {repositories.map(({
      name,
      id,
      stargazersCount,
      description,
    }) => (
      <li key={id}>
        <RepositoryCard
          id={id}
          name={name}
          description={description}
          stargazersCount={stargazersCount}
        />
      </li>
    ))}
  </ul>
);

export default RepositoryList;
