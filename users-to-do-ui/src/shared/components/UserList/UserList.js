import React, { useState, useEffect } from 'react';
import * as usersToDoAPI from '../../services/usersToDoAPI/usersToDoAPI';

import './UserList.scss';
import UserItem from './UserItem/UserItem';

const UserList = () => {
  const [usersState, setUsersState] = useState([]);
  const [expandedState, setExpandedState] = React.useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpandedState(isExpanded ? panel : false);
  };

  useEffect(() => {
    usersToDoAPI
      .listUsers()
      .then(({ data }) => {
        setUsersState(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div className="user-list">
      <h1 className="list-title">Users</h1>
      <div className="users-list-box">
        {usersState.map(item => (
          <UserItem
            onDisplayDetailsHandler={handleChange(`user_${item._id}`)}
            isExpanded={expandedState === `user_${item._id}`}
            userData={item}
            key={item._id}
          />
        ))}
      </div>
    </div>
  );
};

export default UserList;
