import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DeleteTask from './DeleteTask';
import './TaskList.css';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleDelete = async (taskId) => {
    setTasks(tasks.filter(task => task._id !== taskId));
  };

  return (
    <div className="task-list">
      <h1>Task List</h1>
      <ul>
        {tasks.map(task => (
          <li key={task._id} className="task-item">
            <div className="task-title">{task.title}</div>
            <div className="task-description">{task.description}</div>
            <div className="task-details">
              <div className="task-date">Due Date: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'Not specified'}</div>
              <div className="task-priority">Priority: {task.priority}</div>
              <Link to={`/task/${task._id}/edit`} className=" button edit-btn">Edit</Link>
              <Link to={`/task/${task._id}`} className=" button view-btn">View</Link>
              <DeleteTask taskId={task._id} onDelete={handleDelete} className="button delete-btn" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
