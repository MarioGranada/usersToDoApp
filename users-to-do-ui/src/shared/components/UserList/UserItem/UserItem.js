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

import './UserItem.scss';

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
          <div className="actions-buttons-box">
            <Button
              size="small"
              variant="outlined"
              onClick={() => {
                setIsEditingUser(true);
              }}
            >
              Edit
            </Button>
            <Button
              size="small"
              variant="outlined"
              color="secondary"
              onClick={() => {
                onRemoveUserHandler(userData._id);
              }}
            >
              Remove
            </Button>
          </div>
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
                  size="small"
                  onClick={() => {
                    onUpdateUserHandler(userState);
                    setIsEditingUser(false);
                  }}
                  variant="contained"
                  color="primary"
                >
                  Update user
                </Button>
                <Button
                  size="small"
                  onClick={() => {
                    setIsEditingUser(false);
                  }}
                  variant="outlined"
                >
                  Cancel
                </Button>
              </FormControl>
            </div>
          ) : null}
        </div>
        <br />
        <TaskList userId={userData._id} shouldLoadTasks={isExpanded} />
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default UserItem;
