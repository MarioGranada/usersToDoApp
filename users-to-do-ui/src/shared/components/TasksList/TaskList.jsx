import React, { useState, useEffect } from 'react';
import {
  getTasksByUserId,
  updateTask,
  createTask
} from '../../services/usersToDoAPI/usersToDoAPI';
import TaskItem from './TaskItem/TaskItem';
import { FormControl, Button, TextField } from '@material-ui/core';

import './TaskList.scss';

const TaskList = ({ shouldLoadTasks, userId }) => {
  const [tasksState, setTasksState] = useState([]);
  const [newTaskState, setNewTaskState] = useState({});
  const [isCreatingTask, setIsCreatingTask] = useState(false);

  useEffect(() => {
    if (shouldLoadTasks) {
      getTasksByUserId(userId)
        .then(({ data }) => {
          setTasksState(data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [shouldLoadTasks, userId]);

  const onUpdateTaskHandler = taskData => {
    updateTask(taskData).then(response => {
      let remindingTasks = tasksState.filter(item => item._id !== taskData._id);
      setTasksState([...remindingTasks, taskData]);
    });
  };

  const onCreateTaskHandler = () => {
    createTask({ ...newTaskState, userId }).then(({ data }) => {
      setTasksState([...tasksState, data]);
    });
  };

  return (
    <div className="task-list-container">
      <div className="new-task-box">
        <FormControl>
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={() => {
              setIsCreatingTask(true);
              setNewTaskState({});
            }}
          >
            Add Task
          </Button>
        </FormControl>

        {isCreatingTask && (
          <div className="new-task-form">
            <FormControl>
              <TextField
                onChange={e => {
                  setNewTaskState({
                    ...newTaskState,
                    description: e.target.value
                  });
                }}
                value={newTaskState.description || ''}
              />
            </FormControl>
            <FormControl>
              <Button
                size="small"
                variant="contained"
                color="primary"
                onClick={onCreateTaskHandler}
              >
                Create Task
              </Button>
            </FormControl>
            <FormControl>
              <Button
                size="small"
                onClick={() => {
                  setIsCreatingTask(false);
                }}
                variant="outlined"
              >
                Cancel
              </Button>
            </FormControl>
          </div>
        )}
      </div>

      <div className="task-list-box">
        {tasksState.map(item => (
          <TaskItem
            key={item._id}
            taskData={item}
            onUpdateTaskHandler={onUpdateTaskHandler}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
