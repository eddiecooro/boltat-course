import React from 'react';
import { UserSelfCard } from '../UserCard';

const UserList = ({ users, history, navigateToUser }) => {
  return users.map(user => <UserSelfCard history={history} userId={user.id} />);
};

export default UserList;
