import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './EditTask.css'; 

const EditTask = () => {
  const { id } = useParams();
  const [task, setTask] = useState({ title: '', description: '', dueDate: '', priority: '' });
  const [notification, setNotification] = useState(null);

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

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formattedDueDate = task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '';
  
    try {
      const updatedTask = {
        ...task,
        dueDate: formattedDueDate
      };
  
      await axios.put(`http://localhost:5000/api/tasks/${id}`, updatedTask);
      
      setNotification('Task updated successfully!');
      
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <div className="edit-task-container">
      <h2>Edit Task</h2>
      {notification && <div className="notification">{notification}</div>}
      <form className="edit-task-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={task.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={task.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="dueDate">Due Date:</label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={task.dueDate}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="priority">Priority:</label>
          <select
            id="priority"
            name="priority"
            value={task.priority}
            onChange={handleChange}
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
        <button type="submit">Update Task</button>
      </form>
    </div>
  );
};

export default EditTask;
