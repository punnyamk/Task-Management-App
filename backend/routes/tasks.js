import express from 'express';
import Task from '../models/Task.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Create a new task
router.post('/', protect, async (req, res) => {
  try {
    const task = new Task({
      ...req.body,
      userId: req.user._id,
    });
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get tasks for logged-in user ( filtered by date)
router.get('/', protect, async (req, res) => {
  try {
    const { date } = req.query;
    const query = { userId: req.user._id };

    if (date) {
      query.date = date;
    }

    const tasks = await Task.find(query).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
