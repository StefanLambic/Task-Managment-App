import React, { useState } from 'react';
import axios from 'axios';
import './AddTask.css'; 

const AddTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('low'); 
  const [notification, setNotification] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const formattedDueDate = dueDate ? new Date(dueDate).toISOString() : null;
  
      await axios.post('http://localhost:5000/api/tasks', { 
        title, 
        description, 
        dueDate: formattedDueDate, 
        priority 
      });
      
      setTitle('');
      setDescription('');
      setDueDate('');
      setPriority('medium');
  
      setNotification('Task added successfully!');
      
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };
  

  return (
    <div className="add-task-container">
      <h2>Add Task</h2>
      {notification && <div className="notification">{notification}</div>}
      <form className="add-task-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="dueDate">Due Date:</label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="priority">Priority:</label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            required
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default AddTask;
