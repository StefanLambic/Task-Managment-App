import React from 'react';
import axios from 'axios';

const DeleteTask = ({ taskId, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`);
      onDelete(taskId); 
    } catch (error) {
      console.error('Error deleting task:', error);
      if (error.response) {
        console.error('Server response:', error.response.data);
      }
    }
  };
  

  return (
    <a className="button delete-btn" onClick={handleDelete}>Delete</a>
  );
};

export default DeleteTask;