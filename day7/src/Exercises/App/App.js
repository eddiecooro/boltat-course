import React from 'react';
import styles from './App.module.scss';
import loadingIndicator from '../../assets/images/loading.svg';
import UserCard from '../UserCard';
import UserList from '../UserList';
import { ReactComponent as BackButton } from '../../assets/images/back.svg';
import { Route, BrowserRouter as Router, Link, Switch } from 'react-router-dom';
import GoBack from './GoBack';
import AddUser from '../AddUser';

const UsersContext = React.createContext();

export function useUsers() {
  const { users, updateUser, ...rest } = React.useContext(UsersContext);
  return {
    users,
    updateUser,
    getPersonById: pId => users.find(user => user.id === pId),
    ...rest
  };
}

const Homepage = () => {
  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Homepage</h1>
      <Link to={'/users'}>See users</Link>
    </div>
  );
};

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

  const addUser = newUser => {
    setUsers(prevUsers => prevUsers.concat(newUser));
  };

  return (
    <Router>
      <UsersContext.Provider value={{ users, updateUser, addUser }}>
        <Switch>
          <Route exact={true} path="/" component={Homepage} />
          <Route
            exact={true}
            path="/users"
            render={() => (
              <>
                <UserList users={users} />
                <div className={styles.container}>
                  <Link to="/users/add">
                    <div className={`${styles.card} ${styles.hoverable}`}>
                      + Add user
                    </div>
                  </Link>
                </div>
                {loading ? (
                  <div className={styles.container}>
                    <img src={loadingIndicator} />
                  </div>
                ) : null}
              </>
            )}
          />
          <Route path="/users/add" component={AddUser} />
          <Route
            path="/user/:userId"
            render={({ match }) => {
              const userId = Number(match.params.userId);
              return (
                <>
                  <GoBack>
                    <BackButton className={styles.back} />
                  </GoBack>
                  <UserCard userId={userId} />
                </>
              );
            }}
            condition={window.location.pathname.startsWith('/user/')}
          />
          <Route path="/" render={() => <div>404</div>} />
        </Switch>
      </UsersContext.Provider>
    </Router>
  );
};

export default App;
