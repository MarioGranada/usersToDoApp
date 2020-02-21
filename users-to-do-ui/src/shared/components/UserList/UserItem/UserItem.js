import React from 'react';
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TaskList from '../../TasksList/TaskList';

const UserItem = ({ onDisplayDetailsHandler, isExpanded, userData }) => {
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
          <span>Edit</span>
          <span>Remove</span>
        </div>
        <br />
        <TaskList userId={userData._id} shouldLoadTasks={isExpanded} />
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default UserItem;
