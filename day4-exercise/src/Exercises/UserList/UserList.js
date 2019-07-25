import React from 'react';
import { UserSelfCard } from '../UserCard';

const UserList = ({ users, navigateToUser }) => {
  return users.map(user => (
    <UserSelfCard onClick={() => navigateToUser(user)} user={user} />
  ));
};

export default UserList;
