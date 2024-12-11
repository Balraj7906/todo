import express from 'express';
import { body, validationResult } from 'express-validator';
import auth from '../middleware/auth.js';
import Todo from '../models/Todo.js';

const router = express.Router();

// Get all todos for a user
router.get('/', auth, async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a todo
router.post('/',
  auth,
  [
    body('title').trim().notEmpty(),
    body('description').optional().trim(),
    body('dueDate').optional().isISO8601().toDate()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { title, description, dueDate } = req.body;
      const todo = new Todo({
        title,
        description,
        dueDate,
        user: req.userId
      });

      await todo.save();
      res.status(201).json(todo);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Update a todo
router.put('/:id',
  auth,
  [
    body('title').optional().trim().notEmpty(),
    body('description').optional().trim(),
    body('completed').optional().isBoolean(),
    body('dueDate').optional().isISO8601().toDate()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const todo = await Todo.findOne({ _id: req.params.id, user: req.userId });
      if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
      }

      const updates = req.body;
      Object.keys(updates).forEach(key => {
        todo[key] = updates[key];
      });

      await todo.save();
      res.json(todo);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Toggle todo status
router.patch('/:id/toggle', auth, async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, user: req.userId });
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    todo.completed = !todo.completed;
    await todo.save();
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a todo
router.delete('/:id', auth, async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json({ message: 'Todo deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
