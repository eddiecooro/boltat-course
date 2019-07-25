import React from 'react';
import families from '../../data.json';
import styles from './UserCard.module.scss';
import UserSelfCard from './UserSelfCard';

const UserCard = ({ user, navigateToUser, getPersonById }) => {
  return (
    <div className={styles.container}>
      <UserSelfCard user={user} />
      <div className={styles.card}>
        <p className={styles.title}>Married to</p>
        {user.marriedTo.map(pId => {
          const person = getPersonById(pId);
          return (
            <UserSelfCard
              onClick={() => navigateToUser(person)}
              secondary={true}
              user={person}
            />
          );
        })}
      </div>
      <div className={styles.card}>
        <p className={styles.title}>Children</p>
        {user.children.map(pId => {
          const person = getPersonById(pId);
          return (
            <UserSelfCard
              onClick={() => navigateToUser(person)}
              secondary={true}
              user={person}
            />
          );
        })}
      </div>
    </div>
  );
};

export default UserCard;
