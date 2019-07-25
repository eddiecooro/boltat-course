import React from 'react';
import styles from './App.module.scss';
import families from '../../data.json';
import loadingIndicator from '../../assets/images/loading.svg';
import UserCard, { UserSelfCard } from '../UserCard';
import UserList from '../UserList';
import { ReactComponent as BackButton } from '../../assets/images/back.svg';
import { getPersonById } from '../../utils';
import Route from '../EddieRouter/Route';
import Router from '../EddieRouter/Router';
import Link from '../EddieRouter/Link';
import GoBack from '../EddieRouter/GoBack';

const UsersContext = React.createContext();

export function useUsers() {
  const { users, updateUser } = React.useContext(UsersContext);
  console.log(users);
  return {
    users,
    updateUser,
    getPersonById: pId => users.find(user => user.id === pId)
  };
}

const App = () => {
  const [users, setUsers] = React.useState([]);
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

  const updateUser = newUser => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id !== newUser.id ? user : { ...user, ...newUser }
      )
    );
  };

  return (
    <Router>
      <UsersContext.Provider value={{ users, updateUser }}>
        <Route exact={true} path="/">
          <div>
            <h1 style={{ marginTop: 0 }}>Homepage</h1>
            <Link to={'/users'}>See users</Link>
          </div>
        </Route>
        <Route exact={true} path={'/users'}>
          <UserList users={users} />
          {loading ? (
            <div className={styles.container}>
              <img src={loadingIndicator} />
            </div>
          ) : null}
        </Route>
        <Route
          path="/user/"
          render={() => {
            const userId = Number(window.location.pathname.split('/')[2]);
            return (
              <>
                <GoBack>
                  <BackButton
                    // onClick={() => history.goBack()}
                    className={styles.back}
                  />
                </GoBack>
                <UserCard userId={userId} />
              </>
            );
          }}
          condition={window.location.pathname.startsWith('/user/')}
        />
      </UsersContext.Provider>
    </Router>
  );
};

export default App;
