import React, { useState, useEffect } from 'react';

import './UserList.scss';
import UserItem from './UserItem/UserItem';
import {
  listUsers,
  updateUser,
  removeUser
} from '../../services/usersToDoAPI/usersToDoAPI';

const UserList = () => {
  const [usersState, setUsersState] = useState([]);
  const [expandedState, setExpandedState] = React.useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpandedState(isExpanded ? panel : false);
  };

  useEffect(() => {
    listUsers()
      .then(({ data }) => {
        setUsersState(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const onUpdateUserHandler = userData => {
    updateUser(userData).then(response => {
      let remindingUsers = usersState.filter(item => item._id !== userData._id);
      setUsersState([...remindingUsers, userData]);
    });
  };

  const onRemoveUserHandler = userId => {
    removeUser(userId).then(response => {
      let remindingUsers = usersState.filter(item => item._id !== userId);
      setUsersState(remindingUsers);
    });
  };

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
            onUpdateUserHandler={onUpdateUserHandler}
            onRemoveUserHandler={onRemoveUserHandler}
          />
        ))}
      </div>
    </div>
  );
};

export default UserList;
