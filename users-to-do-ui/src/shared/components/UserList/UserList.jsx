import React, { useState, useEffect } from 'react';
import { FormControl, Button, TextField } from '@material-ui/core';
import './UserList.scss';
import UserItem from './UserItem/UserItem';
import {
  listUsers,
  updateUser,
  removeUser,
  createUser
} from '../../services/usersToDoAPI/usersToDoAPI';

const UserList = () => {
  const [usersState, setUsersState] = useState([]);
  const [expandedState, setExpandedState] = useState(false);

  const [newUserState, setNewUserState] = useState({});
  const [isCreatingUser, setIsCreatingUser] = useState(false);

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

  const onCreateUserHandler = () => {
    createUser(newUserState).then(({ data }) => {
      console.log('on create', data);
      setUsersState([...usersState, data]);
    });
  };

  return (
    <div className="user-list">
      <h1 className="list-title">Users</h1>
      <div className="new-user-box">
        <FormControl>
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={() => {
              setIsCreatingUser(true);
              setNewUserState({});
            }}
          >
            Add User
          </Button>
        </FormControl>

        {isCreatingUser && (
          <div className="new-user-form">
            <FormControl>
              <TextField
                onChange={e => {
                  setNewUserState({
                    ...newUserState,
                    name: e.target.value
                  });
                }}
                value={newUserState.name || ''}
                label="Username"
              />
            </FormControl>
            <FormControl>
              <Button
                size="small"
                variant="contained"
                color="primary"
                onClick={onCreateUserHandler}
              >
                Create User
              </Button>
            </FormControl>
            <FormControl>
              <Button
                size="small"
                onClick={() => {
                  setIsCreatingUser(false);
                }}
                variant="outlined"
              >
                Cancel
              </Button>
            </FormControl>
          </div>
        )}
      </div>
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
