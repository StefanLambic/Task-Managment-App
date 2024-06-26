const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Get all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a specific task
router.get('/:id', getTask, (req, res) => {
    res.json(res.task);
});

// Create a task
router.post('/', async (req, res) => {
    const { title, description, dueDate, priority } = req.body;

    const task = new Task({
        title,
        description,
        dueDate,
        priority
    });

    try {
        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a task
router.put('/:id', getTask, async (req, res) => {
    try {
        const { title, description, dueDate, priority, completed } = req.body;
    
        res.task.title = title;
        res.task.description = description;
        res.task.dueDate = dueDate;
        res.task.priority = priority;
        res.task.completed = completed;
    
        const updatedTask = await res.task.save();

        res.json(updatedTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


// Delete a task
router.delete('/:id', getTask, async (req, res) => {
    try {
        await res.task.deleteOne(); 
        res.json({ message: 'Task deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


async function getTask(req, res, next) {
    let task;
    try {
        task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.task = task;
    next();
}

module.exports = router;
