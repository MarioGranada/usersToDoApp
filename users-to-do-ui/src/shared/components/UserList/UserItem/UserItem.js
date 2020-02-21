import React, { useState } from 'react';
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography,
  FormControl,
  TextField,
  Button
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TaskList from '../../TasksList/TaskList';

const UserItem = ({
  onDisplayDetailsHandler,
  isExpanded,
  userData,
  onUpdateUserHandler,
  onRemoveUserHandler
}) => {
  const [userState, setUserState] = useState(userData);
  const [isEditingUser, setIsEditingUser] = useState(false);

  return (
    <ExpansionPanel
      className="user-row row"
      expanded={isExpanded}
      onChange={onDisplayDetailsHandler}
    >
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        id={`userPanel-header_${userData.id}`}
      >
        <Typography>{userData.name}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <div className="controls-row">
          <span
            onClick={() => {
              setIsEditingUser(true);
            }}
          >
            Edit
          </span>
          <span
            onClick={() => {
              onRemoveUserHandler(userData._id);
            }}
          >
            Remove
          </span>
        </div>
        <br />
        {isEditingUser ? (
          <div className="update-user-form">
            <FormControl>
              <TextField
                onChange={e => {
                  setUserState({ ...userState, name: e.target.value });
                }}
                value={userState.name}
              />
              <Button
                onClick={() => {
                  onUpdateUserHandler(userState);
                }}
                variant="contained"
                color="primary"
              >
                Update user
              </Button>
            </FormControl>
          </div>
        ) : null}
        <TaskList userId={userData._id} shouldLoadTasks={isExpanded} />
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default UserItem;
