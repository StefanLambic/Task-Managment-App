import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';
import ViewTask from './components/ViewTask';
import EditTask from './components/EditTask';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/add" element={<AddTask />} />
        <Route path="/task/:id" element={<ViewTask />} />
        <Route path="/task/:id/edit" element={<EditTask />} />
      </Routes>
    </Router>
  );
};

export default App;
