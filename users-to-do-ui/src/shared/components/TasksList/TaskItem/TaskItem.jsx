import React, { useState } from 'react';

import {
  FormControl,
  Select,
  MenuItem,
  FormLabel,
  TextField,
  Button
} from '@material-ui/core';

import EditIcon from '@material-ui/icons/Edit';

import './TaskItem.scss';

const TaskItem = ({ taskData, onUpdateTaskHandler, onDeleteTaskHandler }) => {
  const [taskState, setTaskState] = useState(taskData);
  const [isEditing, setIsEditingState] = useState(false);

  const selectStateHandler = event => {
    setTaskState({ ...taskState, state: event.target.value });
  };

  return (
    taskData && (
      <div className="task-item">
        <div className="task-description">
          {!isEditing ? (
            <FormLabel>{taskState.description}</FormLabel>
          ) : (
            <TextField
              onChange={e => {
                setTaskState({ ...taskState, description: e.target.value });
              }}
              value={taskState.description}
              label="Task Description"
              multiline
              rows="5"
              variant="outlined"
            />
          )}
        </div>
        <FormControl variant="outlined">
          <FormLabel component="legend">Current state</FormLabel>
          <Select
            labelId="task-state-select"
            id="task-state-select"
            value={taskState.state}
            onChange={selectStateHandler}
            disabled={!isEditing}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={'to do'}>To Do</MenuItem>
            <MenuItem value={'done'}>Done</MenuItem>
          </Select>
        </FormControl>
        {isEditing ? (
          <>
            <FormControl>
              <Button
                size="small"
                onClick={() => {
                  onUpdateTaskHandler(taskState);
                  setIsEditingState(false);
                }}
                variant="contained"
                color="primary"
              >
                Update Task
              </Button>
            </FormControl>
            <FormControl>
              <Button
                size="small"
                onClick={() => {
                  setIsEditingState(false);
                }}
                variant="outlined"
              >
                Cancel
              </Button>
            </FormControl>
          </>
        ) : null}

        <div className="controls-row">
          <EditIcon
            onClick={() => {
              setIsEditingState(true);
            }}
          />
        </div>
      </div>
    )
  );
};

export default TaskItem;
