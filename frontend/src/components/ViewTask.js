import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ViewTask.css'; 

const ViewTask = () => {
  const { id } = useParams();
  const [task, setTask] = useState({ title: '', description: '', createdAt: '', priority: '', dueDate: '' });

  useEffect(() => {
    fetchTask();
  }, []);

  const fetchTask = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/tasks/${id}`);
      setTask(response.data);
    } catch (error) {
      console.error('Error fetching task:', error);
    }
  };

  return (
    <div className="view-task-container">
      <h2>Task Details</h2>
      <div className="task-detail">
        <strong>Title:</strong> <span>{task.title}</span>
      </div>
      <div className="task-detail">
        <strong>Description:</strong> <span>{task.description}</span>
      </div>
      <div className="task-detail">
        <strong>Priority:</strong> <span>{task.priority}</span>
      </div>
      <div className="task-detail">
        <strong>Due Date:</strong> <span>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'Not specified'}</span>
      </div>
      <div className="task-detail">
        <strong>Created At:</strong> <span>{new Date(task.createdAt).toLocaleString()}</span>
      </div>
    </div>
  );
};

export default ViewTask;
