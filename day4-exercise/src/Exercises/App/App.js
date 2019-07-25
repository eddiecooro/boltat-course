import React from 'react';
import styles from './App.module.scss';
import loadingIndicator from '../../assets/images/loading.svg';
import UserCard, { UserSelfCard } from '../UserCard';
import UserList from '../UserList';
import { ReactComponent as BackButton } from '../../assets/images/back.svg';
import { getPersonById } from '../../utils';

const App = () => {
  const [users, setUsers] = React.useState([]);
  const [currentlySelectedUser, setCurrentlySelectedUser] = React.useState(
    null
  );
  const [link, setLink] = React.useState(
    'http://localhost:3001/persons?_page=1&_limit=2'
  );
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (link) {
      setLoading(true);
      fetch(link)
        .then(res => res.json())
        .then(res => {
          setUsers(users => [...users, ...res.data]);
          setLoading(false);
          setLink(res.pagination.next);
        });
    }
  }, [link]);

  const navigateToUser = user => setCurrentlySelectedUser(user);
  const goBack = () => setCurrentlySelectedUser(null);

  return currentlySelectedUser ? (
    <>
      <BackButton onClick={goBack} className={styles.back} />
      <UserCard
        getPersonById={pId => getPersonById(users, pId)}
        navigateToUser={navigateToUser}
        user={currentlySelectedUser}
      />
    </>
  ) : (
    <>
      <UserList navigateToUser={navigateToUser} users={users} />
      {loading ? (
        <div className={styles.container}>
          <img src={loadingIndicator} />
        </div>
      ) : null}
    </>
  );
};

export default App;
